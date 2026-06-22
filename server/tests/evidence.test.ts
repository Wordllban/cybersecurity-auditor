import { describe, it, expect, beforeEach, afterEach } from "vitest";
import request from "supertest";
import { openDatabase, type Db } from "../src/db/connection";
import { createRepositories } from "../src/repositories";
import { createApp } from "../src/app";
import { seedEvidence } from "../src/seed/seed";
import { unusedLlm } from "./fakes";

describe("evidence endpoints", () => {
  let db: Db;
  let app: ReturnType<typeof createApp>;

  beforeEach(async () => {
    db = openDatabase(":memory:");
    const repositories = createRepositories(db);
    await seedEvidence(repositories.evidence);
    app = createApp({ repositories, llm: unusedLlm });
  });

  afterEach(() => {
    db.close();
  });

  it("GET /evidence returns all 7 seeded items with the expected shape", async () => {
    const res = await request(app).get("/evidence");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(7);
    const item = res.body[0];
    expect(item).toMatchObject({
      id: expect.any(String),
      customerId: "hibit",
      sourceFileName: expect.any(String),
      sourceType: expect.any(String),
      contentPreview: expect.any(String),
    });
  });

  it("GET /evidence/:id returns a single item including its full text", async () => {
    const list = await request(app).get("/evidence");
    const first = list.body[0];
    const res = await request(app).get(`/evidence/${first.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(first.id);
    expect(typeof res.body.fullText).toBe("string");
    expect(res.body.fullText.length).toBeGreaterThan(0);
  });

  it("GET /evidence/:id returns 404 for an unknown id", async () => {
    const res = await request(app).get("/evidence/does-not-exist");
    expect(res.status).toBe(404);
  });

  it("seeding is idempotent — re-running does not duplicate", async () => {
    const repositories = createRepositories(db);
    await seedEvidence(repositories.evidence);
    await seedEvidence(repositories.evidence);
    const res = await request(app).get("/evidence");
    expect(res.body).toHaveLength(7);
  });
});
