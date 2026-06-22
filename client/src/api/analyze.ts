import type { AnalyzeResponse } from "@hibit/shared";
import { apiPost } from "./client";

export function postAnalyze(evidenceIds: string[]): Promise<AnalyzeResponse> {
  return apiPost<AnalyzeResponse>("/analyze", { evidenceIds });
}
