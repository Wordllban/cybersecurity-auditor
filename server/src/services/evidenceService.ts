import type { EvidenceItem } from "@hibit/shared";
import type { Repositories } from "../repositories/types";

/** Read-side service for evidence. Scopes every read to the given customer. */
export class EvidenceService {
  constructor(private readonly repositories: Repositories) {}

  list(customerId: string): Promise<EvidenceItem[]> {
    return this.repositories.evidence.listByCustomer(customerId);
  }

  get(id: string): Promise<EvidenceItem | null> {
    return this.repositories.evidence.getById(id);
  }
}
