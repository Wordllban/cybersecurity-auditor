import type { SourceType } from "@hibit/shared";

export interface SeedEntry {
  fileName: string;
  sourceType: SourceType;
}

/**
 * The curated subset preloaded as evidence: 7 markdown files covering the full
 * evidence variety the pipeline needs (policies, interviews, a draft plan). Binary
 * artifacts are intentionally out of scope (ADR-0001). Files live in
 * `server/seed/data/` and are committed so the app is self-contained.
 */
export const SEED_MANIFEST: readonly SeedEntry[] = [
  { fileName: "hibit_ai_governance_policy.md", sourceType: "policy" },
  { fileName: "hibit_ai_data_management_policy.md", sourceType: "policy" },
  { fileName: "hibit_ai_ethics_responsible_use_policy.md", sourceType: "policy" },
  { fileName: "hibit_governance_interview_shapira.md", sourceType: "interview" },
  { fileName: "hibit_ethics_compliance_interview_levine.md", sourceType: "interview" },
  { fileName: "hibit_datasci_interview_stern.md", sourceType: "interview" },
  { fileName: "hibit_ai_incident_response_plan_DRAFT.md", sourceType: "other" },
];
