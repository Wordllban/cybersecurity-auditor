/**
 * Repository contracts. Every method is async (Promise-returning) even though the
 * SQLite driver is synchronous, so a Firestore implementation is a drop-in swap
 * with no async rewrite up through the services (ADR-0005). Later slices extend
 * these interfaces with the full CRUD surface; the skeleton needs only a health
 * probe that proves DB access flows through the repository layer.
 */
export interface EvidenceRepository {
  count(): Promise<number>;
}

export interface Repositories {
  evidence: EvidenceRepository;
}
