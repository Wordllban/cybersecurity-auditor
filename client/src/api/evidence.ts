import type { EvidenceItem } from "@hibit/shared";
import { apiGet } from "./client";

export function fetchEvidence(): Promise<EvidenceItem[]> {
  return apiGet<EvidenceItem[]>("/evidence");
}

export function fetchEvidenceItem(id: string): Promise<EvidenceItem> {
  return apiGet<EvidenceItem>(`/evidence/${id}`);
}
