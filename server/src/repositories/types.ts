import type { EvidenceItem } from "@hibit/shared";

/**
 * Repository contracts. Every method is async (Promise-returning) even though the
 * SQLite driver is synchronous, so a Firestore implementation is a drop-in swap
 * with no async rewrite up through the services (ADR-0005). Later slices extend
 * these interfaces with the observation/finding CRUD surface.
 */
export interface EvidenceRepository {
  count(): Promise<number>;
  listByCustomer(customerId: string): Promise<EvidenceItem[]>;
  getById(id: string): Promise<EvidenceItem | null>;
  /** Insert if absent (keyed by customerId + sourceFileName); no-op on conflict. Used by seeding. */
  upsert(item: EvidenceItem): Promise<void>;
}

export interface Repositories {
  evidence: EvidenceRepository;
}
