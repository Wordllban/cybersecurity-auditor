import { randomUUID } from "node:crypto";
import type { CreateFindingInput, Finding, FindingUpdate } from "@hibit/shared";
import type { Repositories } from "../repositories/types";
import { FindingValidationError } from "./findingErrors";

/**
 * Findings CRUD. The server owns id/customerId/timestamps and derives
 * relatedEvidenceIds from the cited observations; the reviewer never sets them.
 */
export class FindingService {
  constructor(private readonly repositories: Repositories) {}

  list(customerId: string): Promise<Finding[]> {
    return this.repositories.findings.listByCustomer(customerId);
  }

  get(customerId: string, id: string): Promise<Finding | null> {
    return this.scopedGet(customerId, id);
  }

  async create(
    customerId: string,
    input: CreateFindingInput
  ): Promise<Finding> {
    // Validate every cited observation exists and belongs to this customer.
    const found = await this.repositories.observations.getByIds(
      input.relatedObservationIds
    );
    const ownById = new Map(
      found.filter((o) => o.customerId === customerId).map((o) => [o.id, o])
    );
    const missing = input.relatedObservationIds.filter(
      (id) => !ownById.has(id)
    );
    if (missing.length > 0) {
      throw new FindingValidationError(
        `Unknown observation id(s): ${missing.join(", ")}`,
        missing
      );
    }

    // Derive relatedEvidenceIds from the cited observations (each cites one evidence item).
    const relatedEvidenceIds = [
      ...new Set(
        input.relatedObservationIds.map((id) => ownById.get(id)!.evidenceId)
      ),
    ];

    const now = new Date().toISOString();
    const finding: Finding = {
      id: randomUUID(),
      customerId,
      title: input.title,
      severity: input.severity,
      status: input.status,
      summary: input.summary,
      relatedObservationIds: input.relatedObservationIds,
      relatedEvidenceIds,
      suggestedRemediation: input.suggestedRemediation,
      confidence: input.confidence,
      createdAt: now,
      updatedAt: now,
    };
    await this.repositories.findings.create(finding);
    return finding;
  }

  async update(
    customerId: string,
    id: string,
    fields: FindingUpdate
  ): Promise<Finding | null> {
    if (!(await this.scopedGet(customerId, id))) return null;
    return this.repositories.findings.update(id, fields);
  }

  async delete(customerId: string, id: string): Promise<boolean> {
    if (!(await this.scopedGet(customerId, id))) return false;
    return this.repositories.findings.delete(id);
  }

  private async scopedGet(
    customerId: string,
    id: string
  ): Promise<Finding | null> {
    const finding = await this.repositories.findings.getById(id);
    return finding && finding.customerId === customerId ? finding : null;
  }
}
