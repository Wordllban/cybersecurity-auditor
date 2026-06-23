import type { Finding, FindingUpdate } from "@hibit/shared";
import type { Db } from "../../db/connection";
import type { FindingRepository } from "../types";

interface FindingRow {
  id: string;
  customerId: string;
  title: string;
  severity: string;
  status: string;
  summary: string;
  suggestedRemediation: string;
  confidence: number;
  createdAt: string;
  updatedAt: string;
}

/** Editable columns a PATCH may touch — keeps the dynamic UPDATE allow-listed. */
const EDITABLE_COLUMNS = [
  "title",
  "severity",
  "status",
  "summary",
  "suggestedRemediation",
] as const;

export class SqliteFindingRepository implements FindingRepository {
  constructor(private readonly db: Db) {}

  /** Hydrate a row into a Finding, deriving the relation arrays from the join table. */
  private hydrate(row: FindingRow): Finding {
    const relatedObservationIds = (
      this.db
        .prepare(
          "SELECT observationId FROM finding_observations WHERE findingId = ?"
        )
        .all(row.id) as { observationId: string }[]
    ).map((r) => r.observationId);

    const relatedEvidenceIds = (
      this.db
        .prepare(
          `SELECT DISTINCT o.evidenceId AS evidenceId
             FROM finding_observations fo
             JOIN observations o ON o.id = fo.observationId
            WHERE fo.findingId = ?`
        )
        .all(row.id) as { evidenceId: string }[]
    ).map((r) => r.evidenceId);

    return {
      id: row.id,
      customerId: row.customerId,
      title: row.title,
      severity: row.severity as Finding["severity"],
      status: row.status as Finding["status"],
      summary: row.summary,
      relatedObservationIds,
      relatedEvidenceIds,
      suggestedRemediation: row.suggestedRemediation,
      confidence: row.confidence,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  private getRow(id: string): FindingRow | undefined {
    return this.db.prepare("SELECT * FROM findings WHERE id = ?").get(id) as
      | FindingRow
      | undefined;
  }

  async create(finding: Finding): Promise<void> {
    const insertFinding = this.db.prepare(
      `INSERT INTO findings
         (id, customerId, title, severity, status, summary, suggestedRemediation, confidence, createdAt, updatedAt)
       VALUES
         (@id, @customerId, @title, @severity, @status, @summary, @suggestedRemediation, @confidence, @createdAt, @updatedAt)`
    );
    const insertLink = this.db.prepare(
      "INSERT INTO finding_observations (findingId, observationId) VALUES (?, ?)"
    );
    const tx = this.db.transaction((f: Finding) => {
      insertFinding.run({
        id: f.id,
        customerId: f.customerId,
        title: f.title,
        severity: f.severity,
        status: f.status,
        summary: f.summary,
        suggestedRemediation: f.suggestedRemediation,
        confidence: f.confidence,
        createdAt: f.createdAt,
        updatedAt: f.updatedAt,
      });
      for (const observationId of f.relatedObservationIds) {
        insertLink.run(f.id, observationId);
      }
    });
    tx(finding);
  }

  async listByCustomer(customerId: string): Promise<Finding[]> {
    const rows = this.db
      .prepare(
        "SELECT * FROM findings WHERE customerId = ? ORDER BY createdAt DESC"
      )
      .all(customerId) as FindingRow[];
    return rows.map((row) => this.hydrate(row));
  }

  async listByEvidence(evidenceId: string): Promise<Finding[]> {
    const rows = this.db
      .prepare(
        `SELECT DISTINCT f.*
           FROM findings f
           JOIN finding_observations fo ON fo.findingId = f.id
           JOIN observations o ON o.id = fo.observationId
          WHERE o.evidenceId = ?
          ORDER BY f.createdAt DESC`
      )
      .all(evidenceId) as FindingRow[];
    return rows.map((row) => this.hydrate(row));
  }

  async getById(id: string): Promise<Finding | null> {
    const row = this.getRow(id);
    return row ? this.hydrate(row) : null;
  }

  async update(id: string, fields: FindingUpdate): Promise<Finding | null> {
    if (!this.getRow(id)) return null;

    const assignments: string[] = [];
    const params: Record<string, unknown> = {
      id,
      updatedAt: new Date().toISOString(),
    };
    for (const col of EDITABLE_COLUMNS) {
      if (fields[col] !== undefined) {
        assignments.push(`${col} = @${col}`);
        params[col] = fields[col];
      }
    }
    assignments.push("updatedAt = @updatedAt");

    this.db
      .prepare(`UPDATE findings SET ${assignments.join(", ")} WHERE id = @id`)
      .run(params);

    return this.hydrate(this.getRow(id)!);
  }

  async delete(id: string): Promise<boolean> {
    if (!this.getRow(id)) return false;

    // Capture the cited observations before the cascade clears this finding's links.
    const citedIds = (
      this.db
        .prepare(
          "SELECT observationId FROM finding_observations WHERE findingId = ?"
        )
        .all(id) as { observationId: string }[]
    ).map((r) => r.observationId);

    const deleteFinding = this.db.prepare("DELETE FROM findings WHERE id = ?");
    // After the finding's links are gone, an observation is orphaned iff no row remains.
    const deleteOrphan = this.db.prepare(
      `DELETE FROM observations
         WHERE id = ?
           AND id NOT IN (SELECT observationId FROM finding_observations)`
    );
    const tx = this.db.transaction(() => {
      deleteFinding.run(id); // ON DELETE CASCADE removes this finding's join rows
      for (const observationId of citedIds) {
        deleteOrphan.run(observationId);
      }
    });
    tx();
    return true;
  }
}
