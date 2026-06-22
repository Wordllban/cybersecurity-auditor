import { Chip } from "@mui/material";
import type { SourceType } from "@hibit/shared";

const LABELS: Record<SourceType, string> = {
  policy: "Policy",
  interview: "Interview",
  spreadsheet: "Spreadsheet",
  audit_note: "Audit note",
  other: "Other",
};

const COLORS: Record<SourceType, "primary" | "secondary" | "default"> = {
  policy: "primary",
  interview: "secondary",
  spreadsheet: "default",
  audit_note: "default",
  other: "default",
};

export function SourceTypeChip({ sourceType }: { sourceType: SourceType }) {
  return <Chip size="small" color={COLORS[sourceType]} label={LABELS[sourceType]} />;
}
