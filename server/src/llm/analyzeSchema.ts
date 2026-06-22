import { z } from "zod";
import { observationTypeSchema, severitySchema } from "@hibit/shared";

/**
 * The LLM-output schema — the untrusted boundary (ADR-0003). It is intentionally
 * DISTINCT from the storage schema: the model produces content only, never identity
 * or tenancy. Observations carry a throwaway local `key` and a `evidenceRef` naming
 * which provided evidence item they came from; draft findings group observations by
 * those keys. The server remaps keys -> real IDs and refs -> real evidenceIds after
 * validation.
 *
 * `buildAnalyzeOutputSchema(validRefs)` closes over the evidence refs presented to
 * the model so the schema can reject hallucinated references at the boundary.
 */
export function buildAnalyzeOutputSchema(validRefs: readonly string[]) {
  const observation = z.object({
    key: z.string().min(1),
    evidenceRef: z.string().min(1),
    text: z.string().min(1),
    observationType: observationTypeSchema,
    confidence: z.number().min(0).max(1),
    relatedFrameworkArea: z.string().optional(),
  });

  const draftFinding = z.object({
    title: z.string().min(1),
    severity: severitySchema,
    summary: z.string().min(1),
    suggestedRemediation: z.string().min(1),
    relatedObservationKeys: z.array(z.string().min(1)).min(1),
  });

  return z
    .object({
      observations: z.array(observation),
      suggestedFindings: z.array(draftFinding),
    })
    .superRefine((data, ctx) => {
      const refs = new Set(validRefs);
      const keys = new Set<string>();

      data.observations.forEach((obs, i) => {
        if (keys.has(obs.key)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["observations", i, "key"],
            message: `Duplicate observation key "${obs.key}"`,
          });
        }
        keys.add(obs.key);

        if (!refs.has(obs.evidenceRef)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["observations", i, "evidenceRef"],
            message: `Unknown evidenceRef "${obs.evidenceRef}"`,
          });
        }
      });

      data.suggestedFindings.forEach((finding, i) => {
        finding.relatedObservationKeys.forEach((key, j) => {
          if (!keys.has(key)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["suggestedFindings", i, "relatedObservationKeys", j],
              message: `Finding references unknown observation key "${key}"`,
            });
          }
        });
      });
    });
}

export type AnalyzeOutput = z.infer<ReturnType<typeof buildAnalyzeOutputSchema>>;
