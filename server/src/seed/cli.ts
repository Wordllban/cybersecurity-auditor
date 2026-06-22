/** Standalone seed runner for `pnpm seed`. Idempotent — safe to run repeatedly. */
import { loadConfig } from "../config";
import { openDatabase } from "../db/connection";
import { createRepositories } from "../repositories";
import { seedEvidence } from "./seed";

const config = loadConfig();
const db = openDatabase(config.databasePath);
const repositories = createRepositories(db);

seedEvidence(repositories.evidence)
  .then(({ total }) => {
    console.log(`[seed] done — ${total} evidence items present`);
    db.close();
  })
  .catch((err) => {
    console.error("[seed] failed:", err);
    db.close();
    process.exit(1);
  });
