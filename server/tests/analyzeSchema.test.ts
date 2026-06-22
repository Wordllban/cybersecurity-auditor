import { describe, it, expect } from "vitest";
import { buildAnalyzeOutputSchema } from "../src/llm/analyzeSchema";

const schema = buildAnalyzeOutputSchema(["E1", "E2"]);

const validPayload = {
  observations: [
    { key: "o1", evidenceRef: "E1", text: "Approval required", observationType: "requirement", confidence: 0.9 },
    { key: "o2", evidenceRef: "E2", text: "Approval skipped", observationType: "practice", confidence: 0.6 },
  ],
  suggestedFindings: [
    {
      title: "Approval not enforced",
      severity: "medium",
      summary: "Policy requires approval but practice skips it.",
      suggestedRemediation: "Add an approval workflow.",
      relatedObservationKeys: ["o1", "o2"],
    },
  ],
};

describe("analyze output schema (the graded validation boundary)", () => {
  it("accepts a well-formed payload", () => {
    expect(schema.safeParse(validPayload).success).toBe(true);
  });

  it("rejects a missing required field", () => {
    const bad = structuredClone(validPayload);
    // @ts-expect-error intentionally remove a required field
    delete bad.observations[0].text;
    expect(schema.safeParse(bad).success).toBe(false);
  });

  it("rejects an invalid observationType (incl. `contradiction`)", () => {
    const bad = structuredClone(validPayload);
    bad.observations[0].observationType = "contradiction";
    expect(schema.safeParse(bad).success).toBe(false);
  });

  it("rejects confidence outside 0..1", () => {
    const bad = structuredClone(validPayload);
    bad.observations[0].confidence = 1.5;
    expect(schema.safeParse(bad).success).toBe(false);
  });

  it("rejects an unknown evidenceRef", () => {
    const bad = structuredClone(validPayload);
    bad.observations[0].evidenceRef = "E99";
    expect(schema.safeParse(bad).success).toBe(false);
  });

  it("rejects duplicate observation keys", () => {
    const bad = structuredClone(validPayload);
    bad.observations[1].key = "o1";
    expect(schema.safeParse(bad).success).toBe(false);
  });

  it("rejects a finding referencing an unknown observation key", () => {
    const bad = structuredClone(validPayload);
    bad.suggestedFindings[0].relatedObservationKeys = ["o1", "ghost"];
    expect(schema.safeParse(bad).success).toBe(false);
  });

  it("rejects non-object input", () => {
    expect(schema.safeParse("not json").success).toBe(false);
    expect(schema.safeParse(null).success).toBe(false);
  });
});
