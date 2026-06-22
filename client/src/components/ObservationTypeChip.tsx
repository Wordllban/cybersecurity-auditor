import { Chip } from "@mui/material";
import type { ObservationType } from "@hibit/shared";

const LABELS: Record<ObservationType, string> = {
  requirement: "Requirement",
  practice: "Practice",
  gap: "Gap",
  risk: "Risk",
  control: "Control",
  missing_evidence: "Missing evidence",
};

const COLORS: Record<
  ObservationType,
  "default" | "info" | "warning" | "error" | "success"
> = {
  requirement: "info",
  practice: "default",
  gap: "warning",
  risk: "error",
  control: "success",
  missing_evidence: "warning",
};

export function ObservationTypeChip({ type }: { type: ObservationType }) {
  return <Chip size="small" color={COLORS[type]} label={LABELS[type]} variant="outlined" />;
}
