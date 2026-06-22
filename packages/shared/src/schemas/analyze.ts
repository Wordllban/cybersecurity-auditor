import { z } from "zod";
import { observationSchema } from "./observation";
import { draftFindingSchema } from "./finding";

/**
 * The `POST /analyze` API response: persisted observations plus draft (suggested)
 * findings that are NOT persisted server-side. This is the API contract — distinct
 * from the LLM-output schema, which lives server-side and is the untrusted boundary
 * (ADR-0003).
 */
export const analyzeRequestSchema = z.object({
  evidenceIds: z.array(z.string()).min(1),
});
export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>;

export const analyzeResponseSchema = z.object({
  observations: z.array(observationSchema),
  suggestedFindings: z.array(draftFindingSchema),
});
export type AnalyzeResponse = z.infer<typeof analyzeResponseSchema>;
