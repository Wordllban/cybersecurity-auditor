import { Chip } from "@mui/material";
import type { FindingStatus } from "@hibit/shared";

const LABELS: Record<FindingStatus, string> = {
  draft: "Draft",
  reviewed: "Reviewed",
  accepted: "Accepted",
  rejected: "Rejected",
};

const COLORS: Record<FindingStatus, "default" | "info" | "success" | "error"> =
  {
    draft: "default",
    reviewed: "info",
    accepted: "success",
    rejected: "error",
  };

export function FindingStatusChip({ status }: { status: FindingStatus }) {
  return (
    <Chip
      size="small"
      variant="outlined"
      color={COLORS[status]}
      label={LABELS[status]}
    />
  );
}
