import type { Observation } from "@hibit/shared";
import type { Repositories } from "../repositories/types";

/** Read-side service for observations. */
export class ObservationService {
  constructor(private readonly repositories: Repositories) {}

  list(customerId: string, evidenceId?: string): Promise<Observation[]> {
    return evidenceId
      ? this.repositories.observations.listByEvidence(evidenceId)
      : this.repositories.observations.listByCustomer(customerId);
  }
}
