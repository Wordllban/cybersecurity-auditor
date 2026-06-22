import type { Observation } from "@hibit/shared";
import type { Db } from "../../db/connection";
import type { ObservationRepository } from "../types";

interface ObservationRow {
  id: string;
  customerId: string;
  evidenceId: string;
  text: string;
  observationType: string;
  confidence: number;
  relatedFrameworkArea: string | null;
}

function rowToObservation(row: ObservationRow): Observation {
  return {
    id: row.id,
    customerId: row.customerId,
    evidenceId: row.evidenceId,
    text: row.text,
    observationType: row.observationType as Observation["observationType"],
    confidence: row.confidence,
    ...(row.relatedFrameworkArea !== null
      ? { relatedFrameworkArea: row.relatedFrameworkArea }
      : {}),
  };
}

export class SqliteObservationRepository implements ObservationRepository {
  constructor(private readonly db: Db) {}

  async createMany(observations: Observation[]): Promise<void> {
    if (observations.length === 0) return;
    const stmt = this.db.prepare(
      `INSERT INTO observations
         (id, customerId, evidenceId, text, observationType, confidence, relatedFrameworkArea)
       VALUES
         (@id, @customerId, @evidenceId, @text, @observationType, @confidence, @relatedFrameworkArea)`
    );
    const insertAll = this.db.transaction((rows: Observation[]) => {
      for (const o of rows) {
        stmt.run({
          id: o.id,
          customerId: o.customerId,
          evidenceId: o.evidenceId,
          text: o.text,
          observationType: o.observationType,
          confidence: o.confidence,
          relatedFrameworkArea: o.relatedFrameworkArea ?? null,
        });
      }
    });
    insertAll(observations);
  }

  async listByCustomer(customerId: string): Promise<Observation[]> {
    const rows = this.db
      .prepare("SELECT * FROM observations WHERE customerId = ?")
      .all(customerId) as ObservationRow[];
    return rows.map(rowToObservation);
  }

  async listByEvidence(evidenceId: string): Promise<Observation[]> {
    const rows = this.db
      .prepare("SELECT * FROM observations WHERE evidenceId = ?")
      .all(evidenceId) as ObservationRow[];
    return rows.map(rowToObservation);
  }

  async getByIds(ids: string[]): Promise<Observation[]> {
    if (ids.length === 0) return [];
    const placeholders = ids.map(() => "?").join(", ");
    const rows = this.db
      .prepare(`SELECT * FROM observations WHERE id IN (${placeholders})`)
      .all(...ids) as ObservationRow[];
    return rows.map(rowToObservation);
  }

  async deleteUnreferencedByEvidence(evidenceId: string): Promise<void> {
    this.db
      .prepare(
        `DELETE FROM observations
         WHERE evidenceId = ?
           AND id NOT IN (SELECT observationId FROM finding_observations)`
      )
      .run(evidenceId);
  }
}
