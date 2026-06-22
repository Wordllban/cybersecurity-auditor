export interface LabeledEvidence {
  ref: string;
  sourceFileName: string;
  sourceType: string;
  text: string;
}

export interface ChatMessage {
  role: "system" | "user";
  content: string;
}

const SYSTEM_PROMPT = `You are a cybersecurity assessment assistant. You extract structured
observations from customer evidence and propose draft findings.

Definitions:
- An OBSERVATION is a single structured fact extracted from exactly ONE evidence item.
  Its observationType is one of:
    requirement      — a rule/policy the org states it must follow
    practice         — how the org actually behaves in reality
    gap              — something missing or not done
    risk             — a risk indicator
    control          — a compensating control (logging, approval, masking, etc.)
    missing_evidence — an absence of expected evidence/record
  NOTE: "contradiction" is NOT an observation type. Contradictions surface only at the
  finding level by grouping observations from different sources.
- A DRAFT FINDING is an assessment-level conclusion grouping one or more observations
  (often across different evidence items) into something a reviewer would put in a report.

Return ONLY a JSON object (no prose, no markdown fences) of this exact shape:
{
  "observations": [
    {
      "key": "o1",                         // unique within this response
      "evidenceRef": "E1",                 // MUST be one of the provided evidence refs
      "text": "…",
      "observationType": "requirement|practice|gap|risk|control|missing_evidence",
      "confidence": 0.0,                   // number between 0 and 1
      "relatedFrameworkArea": "…"          // optional
    }
  ],
  "suggestedFindings": [
    {
      "title": "…",
      "severity": "low|medium|high",
      "summary": "…",
      "suggestedRemediation": "…",
      "relatedObservationKeys": ["o1"]     // keys from observations above
    }
  ]
}

Prefer findings that combine observations from different evidence items where a policy
requirement and an actual practice conflict.`;

export function buildAnalyzePrompt(evidence: LabeledEvidence[]): ChatMessage[] {
  const body = evidence
    .map(
      (e) =>
        `[${e.ref}] ${e.sourceFileName} (sourceType: ${e.sourceType})\n"""\n${e.text}\n"""`,
    )
    .join("\n\n");

  return [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: `Extract observations and propose draft findings from the following evidence items.\n\n${body}`,
    },
  ];
}
