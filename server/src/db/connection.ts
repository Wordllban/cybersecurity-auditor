import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

export type Db = Database.Database;

/**
 * The schema for all three entities. `relatedObservationIds` is modelled as a
 * `finding_observations` join table so that "which findings reference this
 * observation?" is a cheap query — the access pattern the reference-counted
 * deletes need (ADR-0002), and the one that maps to a Firestore `array-contains`
 * index after migration (ADR-0005). `relatedEvidenceIds` is NOT stored; it is
 * derived from the related observations' `evidenceId` at read time.
 */
const SCHEMA = `
CREATE TABLE IF NOT EXISTS evidence (
  id             TEXT PRIMARY KEY,
  customerId     TEXT NOT NULL,
  sourceFileName TEXT NOT NULL,
  sourceType     TEXT NOT NULL,
  contentPreview TEXT NOT NULL,
  fullText       TEXT,
  uploadedAt     TEXT,
  UNIQUE (customerId, sourceFileName)
);

CREATE TABLE IF NOT EXISTS observations (
  id                   TEXT PRIMARY KEY,
  customerId           TEXT NOT NULL,
  evidenceId           TEXT NOT NULL REFERENCES evidence(id) ON DELETE CASCADE,
  text                 TEXT NOT NULL,
  observationType      TEXT NOT NULL,
  confidence           REAL NOT NULL,
  relatedFrameworkArea TEXT
);
CREATE INDEX IF NOT EXISTS idx_observations_evidenceId ON observations(evidenceId);
CREATE INDEX IF NOT EXISTS idx_observations_customerId ON observations(customerId);

CREATE TABLE IF NOT EXISTS findings (
  id                  TEXT PRIMARY KEY,
  customerId          TEXT NOT NULL,
  title               TEXT NOT NULL,
  severity            TEXT NOT NULL,
  status              TEXT NOT NULL,
  summary             TEXT NOT NULL,
  suggestedRemediation TEXT NOT NULL,
  confidence          REAL NOT NULL,
  createdAt           TEXT NOT NULL,
  updatedAt           TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_findings_customerId ON findings(customerId);

CREATE TABLE IF NOT EXISTS finding_observations (
  findingId     TEXT NOT NULL REFERENCES findings(id) ON DELETE CASCADE,
  observationId TEXT NOT NULL REFERENCES observations(id) ON DELETE CASCADE,
  PRIMARY KEY (findingId, observationId)
);
CREATE INDEX IF NOT EXISTS idx_finding_observations_observationId
  ON finding_observations(observationId);
`;

/** Open a SQLite database, enable FKs, and ensure the schema exists. */
export function openDatabase(databasePath: string): Db {
  if (databasePath !== ":memory:") {
    mkdirSync(dirname(databasePath), { recursive: true });
  }
  const db = new Database(databasePath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.exec(SCHEMA);
  return db;
}
