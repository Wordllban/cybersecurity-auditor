import type { CreateFindingInput, Finding, FindingUpdate } from "@hibit/shared";
import { apiDelete, apiGet, apiPatch, apiPost } from "./client";

export function fetchFindings(evidenceId?: string): Promise<Finding[]> {
  const query = evidenceId
    ? `?evidenceId=${encodeURIComponent(evidenceId)}`
    : "";
  return apiGet<Finding[]>(`/findings${query}`);
}

export function fetchFinding(id: string): Promise<Finding> {
  return apiGet<Finding>(`/findings/${id}`);
}

export function createFinding(input: CreateFindingInput): Promise<Finding> {
  return apiPost<Finding>("/findings", input);
}

export function updateFinding(
  id: string,
  fields: FindingUpdate
): Promise<Finding> {
  return apiPatch<Finding>(`/findings/${id}`, fields);
}

export function deleteFinding(id: string): Promise<void> {
  return apiDelete(`/findings/${id}`);
}
