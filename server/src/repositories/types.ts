import type {
  EvidenceItem,
  Finding,
  FindingUpdate,
  Observation,
} from "@hibit/shared";

/**
 * Repository contracts. Every method is async (Promise-returning) even though the
 * SQLite driver is synchronous, so a Firestore implementation is a drop-in swap
 * with no async rewrite up through the services (ADR-0005).
 */
export interface EvidenceRepository {
  count(): Promise<number>;
  listByCustomer(customerId: string): Promise<EvidenceItem[]>;
  getById(id: string): Promise<EvidenceItem | null>;
  /** Insert if absent (keyed by customerId + sourceFileName); no-op on conflict. Used by seeding. */
  upsert(item: EvidenceItem): Promise<void>;
}

export interface ObservationRepository {
  createMany(observations: Observation[]): Promise<void>;
  listByCustomer(customerId: string): Promise<Observation[]>;
  listByEvidence(evidenceId: string): Promise<Observation[]>;
  /** Fetch the observations matching the given ids (used to validate finding inputs). */
  getByIds(ids: string[]): Promise<Observation[]>;
  /**
   * Delete observations for an evidence item that are NOT referenced by any
   * persisted finding — the re-analyze refresh from ADR-0002.
   */
  deleteUnreferencedByEvidence(evidenceId: string): Promise<void>;
}

export interface FindingRepository {
  /** Persist a finding plus its observation links (relatedEvidenceIds is derived on read). */
  create(finding: Finding): Promise<void>;
  listByCustomer(customerId: string): Promise<Finding[]>;
  getById(id: string): Promise<Finding | null>;
  /** Partial update of editable fields; always bumps updatedAt. Returns null if absent. */
  update(id: string, fields: FindingUpdate): Promise<Finding | null>;
  /**
   * Delete the finding and reference-counted-delete the observations it cited —
   * only those no other finding still references (ADR-0002). Returns false if absent.
   */
  delete(id: string): Promise<boolean>;
}

export interface Repositories {
  evidence: EvidenceRepository;
  observations: ObservationRepository;
  findings: FindingRepository;
}
