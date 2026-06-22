import { z } from "zod";
import {
  confidenceSchema,
  findingStatusSchema,
  isoTimestampSchema,
  severitySchema,
} from "./common";

/** An assessment-level conclusion grouping one or more observations. */
export const findingSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  title: z.string(),
  severity: severitySchema,
  status: findingStatusSchema,
  summary: z.string(),
  relatedObservationIds: z.array(z.string()),
  relatedEvidenceIds: z.array(z.string()),
  suggestedRemediation: z.string(),
  confidence: confidenceSchema,
  createdAt: isoTimestampSchema,
  updatedAt: isoTimestampSchema,
});

export type Finding = z.infer<typeof findingSchema>;

/**
 * Fields a reviewer may edit on a persisted finding (see docs/DECISIONS.md).
 * Read-only: id, customerId, timestamps, confidence, relation arrays.
 */
export const findingUpdateSchema = findingSchema
  .pick({
    title: true,
    severity: true,
    summary: true,
    suggestedRemediation: true,
    status: true,
  })
  .partial();

export type FindingUpdate = z.infer<typeof findingUpdateSchema>;

/**
 * Input accepted by `POST /findings` when a reviewer accepts a draft.
 * The server owns id/customerId/timestamps and derives relatedEvidenceIds
 * from the related observations, so they are not part of the input.
 */
export const createFindingInputSchema = findingSchema.pick({
  title: true,
  severity: true,
  status: true,
  summary: true,
  relatedObservationIds: true,
  suggestedRemediation: true,
  confidence: true,
});

export type CreateFindingInput = z.infer<typeof createFindingInputSchema>;
