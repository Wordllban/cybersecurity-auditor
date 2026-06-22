import type { EvidenceItem } from "@hibit/shared";
import type { Db } from "../../db/connection";
import type { EvidenceRepository } from "../types";

interface EvidenceRow {
  id: string;
  customerId: string;
  sourceFileName: string;
  sourceType: string;
  contentPreview: string;
  fullText: string | null;
  uploadedAt: string | null;
}

function rowToEvidence(row: EvidenceRow): EvidenceItem {
  return {
    id: row.id,
    customerId: row.customerId,
    sourceFileName: row.sourceFileName,
    sourceType: row.sourceType as EvidenceItem["sourceType"],
    contentPreview: row.contentPreview,
    ...(row.fullText !== null ? { fullText: row.fullText } : {}),
    ...(row.uploadedAt !== null ? { uploadedAt: row.uploadedAt } : {}),
  };
}

export class SqliteEvidenceRepository implements EvidenceRepository {
  constructor(private readonly db: Db) {}

  async count(): Promise<number> {
    const row = this.db
      .prepare("SELECT COUNT(*) AS c FROM evidence")
      .get() as { c: number };
    return row.c;
  }

  async listByCustomer(customerId: string): Promise<EvidenceItem[]> {
    const rows = this.db
      .prepare(
        "SELECT * FROM evidence WHERE customerId = ? ORDER BY sourceFileName",
      )
      .all(customerId) as EvidenceRow[];
    return rows.map(rowToEvidence);
  }

  async getById(id: string): Promise<EvidenceItem | null> {
    const row = this.db
      .prepare("SELECT * FROM evidence WHERE id = ?")
      .get(id) as EvidenceRow | undefined;
    return row ? rowToEvidence(row) : null;
  }

  async upsert(item: EvidenceItem): Promise<void> {
    this.db
      .prepare(
        `INSERT INTO evidence
           (id, customerId, sourceFileName, sourceType, contentPreview, fullText, uploadedAt)
         VALUES
           (@id, @customerId, @sourceFileName, @sourceType, @contentPreview, @fullText, @uploadedAt)
         ON CONFLICT (customerId, sourceFileName) DO NOTHING`,
      )
      .run({
        id: item.id,
        customerId: item.customerId,
        sourceFileName: item.sourceFileName,
        sourceType: item.sourceType,
        contentPreview: item.contentPreview,
        fullText: item.fullText ?? null,
        uploadedAt: item.uploadedAt ?? null,
      });
  }
}
