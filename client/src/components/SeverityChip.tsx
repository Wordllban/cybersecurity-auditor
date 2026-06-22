import { Chip } from "@mui/material";
import type { Severity } from "@hibit/shared";

const LABELS: Record<Severity, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const COLORS: Record<Severity, "success" | "warning" | "error"> = {
  low: "success",
  medium: "warning",
  high: "error",
};

export function SeverityChip({ severity }: { severity: Severity }) {
  return (
    <Chip size="small" color={COLORS[severity]} label={LABELS[severity]} />
  );
}
