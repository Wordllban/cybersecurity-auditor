import type { Db } from "../db/connection";
import type { Repositories } from "./types";
import { SqliteEvidenceRepository } from "./sqlite/evidenceRepository";
import { SqliteObservationRepository } from "./sqlite/observationRepository";
import { SqliteFindingRepository } from "./sqlite/findingRepository";

/** Wire the SQLite-backed repositories. Swap this factory to migrate to Firestore. */
export function createRepositories(db: Db): Repositories {
  return {
    evidence: new SqliteEvidenceRepository(db),
    observations: new SqliteObservationRepository(db),
    findings: new SqliteFindingRepository(db),
  };
}
