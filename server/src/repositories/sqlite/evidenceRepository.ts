import type { Db } from "../../db/connection";
import type { EvidenceRepository } from "../types";

export class SqliteEvidenceRepository implements EvidenceRepository {
  constructor(private readonly db: Db) {}

  async count(): Promise<number> {
    const row = this.db
      .prepare("SELECT COUNT(*) AS c FROM evidence")
      .get() as { c: number };
    return row.c;
  }
}
