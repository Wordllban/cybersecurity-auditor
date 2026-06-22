import { z } from "zod";
import { sourceTypeSchema, isoTimestampSchema } from "./common";

/** A raw source artifact captured from a customer file. One item = one whole file (ADR-0001). */
export const evidenceItemSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  sourceFileName: z.string(),
  sourceType: sourceTypeSchema,
  contentPreview: z.string(),
  fullText: z.string().optional(),
  uploadedAt: isoTimestampSchema.optional(),
});

export type EvidenceItem = z.infer<typeof evidenceItemSchema>;
