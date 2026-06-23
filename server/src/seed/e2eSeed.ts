/**
 * Deterministic fixture for the Playwright E2E (ADR-0007). Clears findings +
 * observations, seeds evidence, and inserts one observation + one finding
 * directly via the repositories — deliberately NOT via /analyze, so the E2E
 * needs no OpenRouter key. Idempotent and safe to re-run against a live DB
 * (the spec calls it before each test to reset shared state).
 */
import { randomUUID } from "node:crypto";
import { loadConfig } from "../config";
import { openDatabase } from "../db/connection";
import { createRepositories } from "../repositories";
import { seedEvidence } from "./seed";
import { DEFAULT_CUSTOMER_ID } from "../config";

export const E2E_FINDING_TITLE = "E2E Seeded Finding";

async function main() {
  const { databasePath } = loadConfig();

  const db = openDatabase(databasePath);
  const repositories = createRepositories(db);
  await seedEvidence(repositories.evidence);

  // Reset the mutable entities so every test starts from the same state.
  db.exec(
    "DELETE FROM finding_observations; DELETE FROM findings; DELETE FROM observations;"
  );

  const evidence =
    await repositories.evidence.listByCustomer(DEFAULT_CUSTOMER_ID);
  const first = evidence[0];
  if (!first) throw new Error("[e2e-seed] no evidence seeded");

  const observationId = randomUUID();
  await repositories.observations.createMany([
    {
      id: observationId,
      customerId: DEFAULT_CUSTOMER_ID,
      evidenceId: first.id,
      text: "E2E seeded observation",
      observationType: "gap",
      confidence: 0.8,
    },
  ]);

  const now = new Date().toISOString();
  await repositories.findings.create({
    id: randomUUID(),
    customerId: DEFAULT_CUSTOMER_ID,
    title: E2E_FINDING_TITLE,
    severity: "medium",
    status: "reviewed",
    summary: "Seeded for the Playwright edit → refresh test.",
    relatedObservationIds: [observationId],
    relatedEvidenceIds: [first.id],
    suggestedRemediation: "Assign an owner.",
    confidence: 0.8,
    createdAt: now,
    updatedAt: now,
  });

  db.close();
  console.log(`[e2e-seed] ready at ${databasePath}`);
}

main().catch((err) => {
  console.error("[e2e-seed] failed:", err);
  process.exit(1);
});
