import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import type { EvidenceItem } from "@hibit/shared";
import { DEFAULT_CUSTOMER_ID } from "../config";
import type { EvidenceRepository } from "../repositories/types";
import { SEED_MANIFEST } from "./manifest";

const DATA_DIR = fileURLToPath(new URL("../../seed/data/", import.meta.url));
const PREVIEW_LENGTH = 280;

function buildPreview(fullText: string): string {
  const normalized = fullText.replace(/\s+/g, " ").trim();
  return normalized.length > PREVIEW_LENGTH
    ? `${normalized.slice(0, PREVIEW_LENGTH)}…`
    : normalized;
}

/**
 * Upsert all manifest files as evidence (idempotent — keyed by sourceFileName, so
 * re-running never duplicates). Returns how many evidence items exist afterwards.
 */
export async function seedEvidence(
  repo: EvidenceRepository,
): Promise<{ total: number }> {
  const now = new Date().toISOString();
  for (const entry of SEED_MANIFEST) {
    const fullText = readFileSync(`${DATA_DIR}${entry.fileName}`, "utf8");
    const item: EvidenceItem = {
      id: randomUUID(),
      customerId: DEFAULT_CUSTOMER_ID,
      sourceFileName: entry.fileName,
      sourceType: entry.sourceType,
      contentPreview: buildPreview(fullText),
      fullText,
      uploadedAt: now,
    };
    await repo.upsert(item);
  }
  return { total: await repo.count() };
}

/** Seed only when the evidence table is empty — the zero-setup startup path. */
export async function seedEvidenceIfEmpty(
  repo: EvidenceRepository,
): Promise<{ seeded: boolean; total: number }> {
  if ((await repo.count()) > 0) {
    return { seeded: false, total: await repo.count() };
  }
  const { total } = await seedEvidence(repo);
  return { seeded: true, total };
}
