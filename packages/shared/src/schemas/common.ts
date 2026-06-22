import { z } from "zod";

/** Confidence is a number between 0 and 1, where 1 is highest confidence. */
export const confidenceSchema = z.number().min(0).max(1);

/** ISO-8601 timestamp string (server-generated). */
export const isoTimestampSchema = z.string().datetime();

export const sourceTypeSchema = z.enum([
  "policy",
  "interview",
  "spreadsheet",
  "audit_note",
  "other",
]);
export type SourceType = z.infer<typeof sourceTypeSchema>;

/**
 * `contradiction` is intentionally NOT an observation type — contradictions are
 * relational and surface at the finding level (see CONTEXT.md / ADR-0001).
 */
export const observationTypeSchema = z.enum([
  "requirement",
  "practice",
  "gap",
  "risk",
  "control",
  "missing_evidence",
]);
export type ObservationType = z.infer<typeof observationTypeSchema>;

export const severitySchema = z.enum(["low", "medium", "high"]);
export type Severity = z.infer<typeof severitySchema>;

export const findingStatusSchema = z.enum([
  "draft",
  "reviewed",
  "accepted",
  "rejected",
]);
export type FindingStatus = z.infer<typeof findingStatusSchema>;
