import type { Db } from "../db/connection";
import type { Repositories } from "./types";
import { SqliteEvidenceRepository } from "./sqlite/evidenceRepository";

/** Wire the SQLite-backed repositories. Swap this factory to migrate to Firestore. */
export function createRepositories(db: Db): Repositories {
  return {
    evidence: new SqliteEvidenceRepository(db),
  };
}
