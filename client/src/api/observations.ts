import type { Observation } from "@hibit/shared";
import { apiGet } from "./client";

export function fetchObservations(evidenceId?: string): Promise<Observation[]> {
  const query = evidenceId ? `?evidenceId=${encodeURIComponent(evidenceId)}` : "";
  return apiGet<Observation[]>(`/observations${query}`);
}
