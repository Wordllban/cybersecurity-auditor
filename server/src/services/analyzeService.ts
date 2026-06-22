import { randomUUID } from "node:crypto";
import type { AnalyzeResponse, DraftFinding, EvidenceItem, Observation } from "@hibit/shared";
import type { Repositories } from "../repositories/types";
import type { AnalyzeLlm } from "../llm/openRouterClient";
import { buildAnalyzePrompt, type LabeledEvidence } from "../llm/prompt";
import { buildAnalyzeOutputSchema } from "../llm/analyzeSchema";
import { AnalyzeBadRequestError, AnalyzeInvalidOutputError } from "../llm/errors";

const EVIDENCE_CHAR_CAP = 6000;

/** Strip an optional ```json … ``` fence before parsing. */
function stripFences(raw: string): string {
  const trimmed = raw.trim();
  const fenced = /^```(?:json)?\s*([\s\S]*?)\s*```$/.exec(trimmed);
  return fenced ? fenced[1]! : trimmed;
}

function averageConfidence(observations: Observation[]): number {
  if (observations.length === 0) return 0;
  const sum = observations.reduce((acc, o) => acc + o.confidence, 0);
  return Math.round((sum / observations.length) * 100) / 100;
}

export class AnalyzeService {
  constructor(
    private readonly repositories: Repositories,
    private readonly llm: AnalyzeLlm,
  ) {}

  async analyze(customerId: string, evidenceIds: string[]): Promise<AnalyzeResponse> {
    // 1. Load the requested evidence (customer-scoped). Reject unknown ids up front.
    const loaded: EvidenceItem[] = [];
    for (const id of evidenceIds) {
      const item = await this.repositories.evidence.getById(id);
      if (item && item.customerId === customerId) loaded.push(item);
    }
    if (loaded.length === 0) {
      throw new AnalyzeBadRequestError("No matching evidence items to analyze.");
    }

    // 2. Label evidence E1..En and remember the ref -> real id mapping.
    const refToEvidenceId = new Map<string, string>();
    const labeled: LabeledEvidence[] = loaded.map((item, i) => {
      const ref = `E${i + 1}`;
      refToEvidenceId.set(ref, item.id);
      return {
        ref,
        sourceFileName: item.sourceFileName,
        sourceType: item.sourceType,
        text: (item.fullText ?? item.contentPreview).slice(0, EVIDENCE_CHAR_CAP),
      };
    });

    // 3. Call the model (may throw AnalyzeConfig/Upstream errors).
    const raw = await this.llm.complete(buildAnalyzePrompt(labeled));

    // 4. Parse + validate BEFORE touching stored data (ADR-0002/0003).
    let parsed: unknown;
    try {
      parsed = JSON.parse(stripFences(raw));
    } catch {
      throw new AnalyzeInvalidOutputError("Model output was not valid JSON.");
    }
    const schema = buildAnalyzeOutputSchema([...refToEvidenceId.keys()]);
    const result = schema.safeParse(parsed);
    if (!result.success) {
      throw new AnalyzeInvalidOutputError(
        `Model output failed validation: ${result.error.issues[0]?.message ?? "unknown"}`,
      );
    }
    const output = result.data;

    // 5. Re-analyze refresh: drop each evidence item's observations not referenced
    //    by any persisted finding, then insert the fresh batch (ADR-0002).
    for (const id of refToEvidenceId.values()) {
      await this.repositories.observations.deleteUnreferencedByEvidence(id);
    }

    // 6. Mint real IDs, stamp tenancy/source, persist observations.
    const keyToId = new Map<string, string>();
    const observations: Observation[] = output.observations.map((o) => {
      const id = randomUUID();
      keyToId.set(o.key, id);
      return {
        id,
        customerId,
        evidenceId: refToEvidenceId.get(o.evidenceRef)!,
        text: o.text,
        observationType: o.observationType,
        confidence: o.confidence,
        ...(o.relatedFrameworkArea ? { relatedFrameworkArea: o.relatedFrameworkArea } : {}),
      };
    });
    await this.repositories.observations.createMany(observations);

    const observationById = new Map(observations.map((o) => [o.id, o]));

    // 7. Build draft findings — NOT persisted. Remap keys -> real observation IDs,
    //    derive relatedEvidenceIds and confidence from the related observations.
    const suggestedFindings: DraftFinding[] = output.suggestedFindings.map((f) => {
      const relatedObservationIds = f.relatedObservationKeys.map((k) => keyToId.get(k)!);
      const related = relatedObservationIds
        .map((id) => observationById.get(id))
        .filter((o): o is Observation => o !== undefined);
      const relatedEvidenceIds = [...new Set(related.map((o) => o.evidenceId))];
      return {
        id: randomUUID(),
        customerId,
        title: f.title,
        severity: f.severity,
        status: "draft",
        summary: f.summary,
        relatedObservationIds,
        relatedEvidenceIds,
        suggestedRemediation: f.suggestedRemediation,
        confidence: averageConfidence(related),
      };
    });

    return { observations, suggestedFindings };
  }
}
