import { describe, it, expect, afterEach } from "vitest";
import { rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import request from "supertest";
import { openDatabase, type Db } from "../src/db/connection";
import { createRepositories } from "../src/repositories";
import { createApp } from "../src/app";
import { seedEvidence } from "../src/seed/seed";
import { fakeLlm } from "./fakes";

/** Two observations on E1 so findings have real observation ids to cite. */
function modelOutput(): string {
  return JSON.stringify({
    observations: [
      {
        key: "o1",
        evidenceRef: "E1",
        text: "Approval required for external AI tools",
        observationType: "requirement",
        confidence: 0.9,
      },
      {
        key: "o2",
        evidenceRef: "E1",
        text: "No named owner for the process",
        observationType: "gap",
        confidence: 0.6,
      },
    ],
    suggestedFindings: [],
  });
}

const draftInput = (relatedObservationIds: string[]) => ({
  title: "AI tool approval is unowned",
  severity: "medium" as const,
  status: "accepted" as const,
  summary: "Policy requires approval but no owner is named.",
  relatedObservationIds,
  suggestedRemediation: "Assign an owner and document the workflow.",
  confidence: 0.75,
});

describe("findings CRUD", () => {
  let db: Db;

  /** Seed, analyze to create observations, return app + the persisted observation ids. */
  async function setup() {
    db = openDatabase(":memory:");
    const repositories = createRepositories(db);
    await seedEvidence(repositories.evidence);
    const app = createApp({ repositories, llm: fakeLlm(modelOutput()) });
    const evidence = (await request(app).get("/evidence")).body;
    await request(app)
      .post("/analyze")
      .send({ evidenceIds: [evidence[0].id] });
    const observations = (await request(app).get("/observations")).body as {
      id: string;
    }[];
    return {
      app,
      evidenceId: evidence[0].id as string,
      observationIds: observations.map((o) => o.id),
    };
  }

  afterEach(() => db?.close());

  it("POST /findings derives relatedEvidenceIds and persists; GET reads it back", async () => {
    const { app, evidenceId, observationIds } = await setup();

    const created = await request(app)
      .post("/findings")
      .send(draftInput(observationIds));
    expect(created.status).toBe(201);
    expect(created.body.id).toEqual(expect.any(String));
    expect(created.body.customerId).toBe("hibit");
    expect([...created.body.relatedObservationIds].sort()).toEqual(
      [...observationIds].sort()
    );
    expect(created.body.relatedEvidenceIds).toEqual([evidenceId]);
    expect(created.body.createdAt).toEqual(expect.any(String));

    const list = await request(app).get("/findings");
    expect(list.body).toHaveLength(1);

    const one = await request(app).get(`/findings/${created.body.id}`);
    expect(one.status).toBe(200);
    expect(one.body.id).toBe(created.body.id);
  });

  it("GET /findings?evidenceId returns findings citing that evidence (traceability)", async () => {
    const { app, evidenceId, observationIds } = await setup();
    const created = (
      await request(app).post("/findings").send(draftInput(observationIds))
    ).body;

    const linked = await request(app).get(`/findings?evidenceId=${evidenceId}`);
    expect(linked.status).toBe(200);
    expect(linked.body).toHaveLength(1);
    expect(linked.body[0].id).toBe(created.id);

    const other = await request(app).get(
      "/findings?evidenceId=some-other-evidence"
    );
    expect(other.body).toHaveLength(0);
  });

  it("POST /findings rejects unknown observation ids with a clear 400", async () => {
    const { app, observationIds } = await setup();
    const res = await request(app)
      .post("/findings")
      .send(draftInput([observationIds[0], "ghost-observation"]));
    expect(res.status).toBe(400);
    expect(res.body.code).toBe("invalid_observations");
    expect(res.body.missingObservationIds).toEqual(["ghost-observation"]);
    expect((await request(app).get("/findings")).body).toHaveLength(0);
  });

  it("GET /findings/:id returns 404 for an unknown id", async () => {
    const { app } = await setup();
    expect((await request(app).get("/findings/nope")).status).toBe(404);
  });

  it("PATCH partial-updates editable fields, bumps updatedAt, leaves read-only fields", async () => {
    const { app, observationIds } = await setup();
    const created = (
      await request(app).post("/findings").send(draftInput(observationIds))
    ).body;

    await new Promise((r) => setTimeout(r, 2)); // make the timestamp bump observable
    const patched = await request(app)
      .patch(`/findings/${created.id}`)
      .send({ title: "Renamed", status: "reviewed" });

    expect(patched.status).toBe(200);
    expect(patched.body.title).toBe("Renamed");
    expect(patched.body.status).toBe("reviewed");
    // Untouched + read-only fields are preserved.
    expect(patched.body.summary).toBe(created.summary);
    expect(patched.body.confidence).toBe(created.confidence);
    expect(patched.body.createdAt).toBe(created.createdAt);
    expect(patched.body.relatedEvidenceIds).toEqual(created.relatedEvidenceIds);
    expect(patched.body.updatedAt).not.toBe(created.updatedAt);
  });

  it("PATCH returns 404 for an unknown id", async () => {
    const { app } = await setup();
    expect(
      (await request(app).patch("/findings/nope").send({ title: "x" })).status
    ).toBe(404);
  });

  it("DELETE removes the finding and its now-orphaned observations", async () => {
    const { app, observationIds } = await setup();
    const created = (
      await request(app).post("/findings").send(draftInput(observationIds))
    ).body;

    const del = await request(app).delete(`/findings/${created.id}`);
    expect(del.status).toBe(204);
    expect((await request(app).get("/findings")).body).toHaveLength(0);
    // Both cited observations were referenced by no other finding → deleted.
    expect((await request(app).get("/observations")).body).toHaveLength(0);
  });

  it("DELETE keeps observations another finding still references (reference-counted)", async () => {
    const { app, observationIds } = await setup();
    const [o1, o2] = observationIds;
    const findingA = (
      await request(app)
        .post("/findings")
        .send(draftInput([o1, o2]))
    ).body;
    await request(app)
      .post("/findings")
      .send(draftInput([o2])); // finding B shares o2

    await request(app).delete(`/findings/${findingA.id}`);

    const remaining = (await request(app).get("/observations")).body as {
      id: string;
    }[];
    const ids = remaining.map((o) => o.id);
    expect(ids).toContain(o2); // still cited by finding B
    expect(ids).not.toContain(o1); // orphaned by deleting finding A
  });

  it("DELETE returns 404 for an unknown id", async () => {
    const { app } = await setup();
    expect((await request(app).delete("/findings/nope")).status).toBe(404);
  });

  it("persists findings across a repository reopen (survives refresh)", async () => {
    const path = join(tmpdir(), `findings-${randomUUID()}.db`);
    try {
      const db1 = openDatabase(path);
      const repos1 = createRepositories(db1);
      await seedEvidence(repos1.evidence);
      const app1 = createApp({
        repositories: repos1,
        llm: fakeLlm(modelOutput()),
      });
      const evidence = (await request(app1).get("/evidence")).body;
      await request(app1)
        .post("/analyze")
        .send({ evidenceIds: [evidence[0].id] });
      const observationIds = (
        (await request(app1).get("/observations")).body as { id: string }[]
      ).map((o) => o.id);
      const created = (
        await request(app1).post("/findings").send(draftInput(observationIds))
      ).body;
      db1.close();

      // Reopen as a fresh server process would — data must still be there.
      const db2 = openDatabase(path);
      const app2 = createApp({
        repositories: createRepositories(db2),
        llm: fakeLlm(modelOutput()),
      });
      const reread = await request(app2).get(`/findings/${created.id}`);
      expect(reread.status).toBe(200);
      expect(reread.body.title).toBe(created.title);
      expect(reread.body.relatedObservationIds.sort()).toEqual(
        [...observationIds].sort()
      );
      db2.close();
    } finally {
      rmSync(path, { force: true });
      rmSync(`${path}-wal`, { force: true });
      rmSync(`${path}-shm`, { force: true });
    }
  });
});
