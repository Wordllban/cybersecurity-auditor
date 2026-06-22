import { describe, it, expect, beforeEach, afterEach } from "vitest";
import request from "supertest";
import { openDatabase, type Db } from "../src/db/connection";
import { createRepositories } from "../src/repositories";
import { createApp } from "../src/app";
import { unusedLlm } from "./fakes";

describe("GET /health", () => {
  let db: Db;
  let app: ReturnType<typeof createApp>;

  beforeEach(() => {
    db = openDatabase(":memory:");
    app = createApp({ repositories: createRepositories(db), llm: unusedLlm });
  });

  afterEach(() => {
    db.close();
  });

  it("reports ok with a connected database", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.db.connected).toBe(true);
    expect(res.body.db.evidenceCount).toBe(0);
  });
});
