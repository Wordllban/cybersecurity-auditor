import { z } from "zod";
import { confidenceSchema, observationTypeSchema } from "./common";

/** A single structured fact extracted from exactly one evidence item. */
export const observationSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  /** Cites exactly one evidence item (cardinality rule). */
  evidenceId: z.string(),
  text: z.string(),
  observationType: observationTypeSchema,
  confidence: confidenceSchema,
  relatedFrameworkArea: z.string().optional(),
});

export type Observation = z.infer<typeof observationSchema>;
