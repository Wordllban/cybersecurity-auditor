import { describe, it, expect, beforeEach, afterEach } from "vitest";
import request from "supertest";
import { openDatabase, type Db } from "../src/db/connection";
import { createRepositories } from "../src/repositories";
import { createApp } from "../src/app";
import { seedEvidence } from "../src/seed/seed";
import { fakeLlm } from "./fakes";
import {
  AnalyzeConfigError,
  AnalyzeUpstreamError,
} from "../src/llm/errors";

/** A valid model payload referencing the single analyzed evidence item (E1). */
function validModelOutput(): string {
  return JSON.stringify({
    observations: [
      { key: "o1", evidenceRef: "E1", text: "Approval required for external AI tools", observationType: "requirement", confidence: 0.9 },
      { key: "o2", evidenceRef: "E1", text: "No named owner for the process", observationType: "gap", confidence: 0.6 },
    ],
    suggestedFindings: [
      {
        title: "AI tool approval is not owned",
        severity: "medium",
        summary: "Policy requires approval but no owner is named.",
        suggestedRemediation: "Assign an owner and document the workflow.",
        relatedObservationKeys: ["o1", "o2"],
      },
    ],
  });
}

describe("POST /analyze", () => {
  let db: Db;

  async function setup(llmResponse: Parameters<typeof fakeLlm>[0]) {
    db = openDatabase(":memory:");
    const repositories = createRepositories(db);
    await seedEvidence(repositories.evidence);
    const app = createApp({ repositories, llm: fakeLlm(llmResponse) });
    const evidence = (await request(app).get("/evidence")).body;
    return { app, evidenceId: evidence[0].id as string };
  }

  afterEach(() => db.close());

  it("persists observations, returns non-persisted draft findings with real IDs", async () => {
    const { app, evidenceId } = await setup(validModelOutput());

    const res = await request(app).post("/analyze").send({ evidenceIds: [evidenceId] });
    expect(res.status).toBe(200);

    // Observations are persisted, server-stamped, and free of model-only fields.
    expect(res.body.observations).toHaveLength(2);
    const obs = res.body.observations[0];
    expect(obs.id).toEqual(expect.any(String));
    expect(obs.evidenceId).toBe(evidenceId);
    expect(obs.customerId).toBe("hibit");
    expect(obs).not.toHaveProperty("key");
    expect(obs).not.toHaveProperty("evidenceRef");

    // Draft finding references the real, persisted observation IDs.
    expect(res.body.suggestedFindings).toHaveLength(1);
    const draft = res.body.suggestedFindings[0];
    expect(draft.status).toBe("draft");
    const persistedIds = res.body.observations.map((o: { id: string }) => o.id).sort();
    expect([...draft.relatedObservationIds].sort()).toEqual(persistedIds);
    expect(draft.relatedEvidenceIds).toEqual([evidenceId]);
    expect(draft.confidence).toBeCloseTo(0.75);

    // Observations queryable; NO finding was persisted by /analyze.
    expect((await request(app).get("/observations")).body).toHaveLength(2);
    const findingCount = db.prepare("SELECT COUNT(*) AS c FROM findings").get() as { c: number };
    expect(findingCount.c).toBe(0);
  });

  it("re-analyze refreshes observations instead of duplicating", async () => {
    const { app, evidenceId } = await setup(validModelOutput());
    await request(app).post("/analyze").send({ evidenceIds: [evidenceId] });
    await request(app).post("/analyze").send({ evidenceIds: [evidenceId] });
    expect((await request(app).get("/observations")).body).toHaveLength(2);
  });

  it("returns 422 on unparseable model output and persists nothing", async () => {
    const { app, evidenceId } = await setup("this is not json");
    const res = await request(app).post("/analyze").send({ evidenceIds: [evidenceId] });
    expect(res.status).toBe(422);
    expect(res.body.code).toBe("invalid_output");
    expect((await request(app).get("/observations")).body).toHaveLength(0);
  });

  it("returns 422 on schema-invalid model output", async () => {
    const bad = JSON.stringify({
      observations: [{ key: "o1", evidenceRef: "E1", text: "x", observationType: "contradiction", confidence: 0.5 }],
      suggestedFindings: [],
    });
    const { app, evidenceId } = await setup(bad);
    const res = await request(app).post("/analyze").send({ evidenceIds: [evidenceId] });
    expect(res.status).toBe(422);
  });

  it("returns 503 (distinct) when the API key is not configured", async () => {
    const { app, evidenceId } = await setup(() => {
      throw new AnalyzeConfigError("OpenRouter API key not configured");
    });
    const res = await request(app).post("/analyze").send({ evidenceIds: [evidenceId] });
    expect(res.status).toBe(503);
    expect(res.body.code).toBe("config");
  });

  it("returns 502 when the upstream is unavailable", async () => {
    const { app, evidenceId } = await setup(() => {
      throw new AnalyzeUpstreamError("upstream down");
    });
    const res = await request(app).post("/analyze").send({ evidenceIds: [evidenceId] });
    expect(res.status).toBe(502);
  });

  it("returns 400 for an unknown evidence id", async () => {
    const { app } = await setup(validModelOutput());
    const res = await request(app).post("/analyze").send({ evidenceIds: ["nope"] });
    expect(res.status).toBe(400);
  });
});
