import type { CreateFindingInput, Finding, FindingUpdate } from "@hibit/shared";
import { apiDelete, apiGet, apiPatch, apiPost } from "./client";

export function fetchFindings(): Promise<Finding[]> {
  return apiGet<Finding[]>("/findings");
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
