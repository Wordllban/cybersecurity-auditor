import { describe, it, expect } from "vitest";
import { confidenceSchema, observationTypeSchema } from "./common";
import { findingSchema } from "./finding";

describe("shared schemas", () => {
  it("rejects confidence outside 0..1", () => {
    expect(confidenceSchema.safeParse(0.5).success).toBe(true);
    expect(confidenceSchema.safeParse(1).success).toBe(true);
    expect(confidenceSchema.safeParse(1.2).success).toBe(false);
    expect(confidenceSchema.safeParse(-0.1).success).toBe(false);
  });

  it("does not allow `contradiction` as an observation type", () => {
    expect(observationTypeSchema.safeParse("gap").success).toBe(true);
    expect(observationTypeSchema.safeParse("contradiction").success).toBe(false);
  });

  it("validates a well-formed finding", () => {
    const now = new Date().toISOString();
    const result = findingSchema.safeParse({
      id: "f1",
      customerId: "hibit",
      title: "AI tool approval policy is not enforced",
      severity: "medium",
      status: "draft",
      summary: "Policy requires approval but staff skip it.",
      relatedObservationIds: ["o1", "o2"],
      relatedEvidenceIds: ["e1"],
      suggestedRemediation: "Document an approval workflow.",
      confidence: 0.7,
      createdAt: now,
      updatedAt: now,
    });
    expect(result.success).toBe(true);
  });
});
