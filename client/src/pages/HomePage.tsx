import { useQuery } from "@tanstack/react-query";
import { Alert, Chip, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { observationTypeSchema } from "@hibit/shared";
import { apiGet, type HealthResponse } from "../api/client";

export function HomePage() {
  const health = useQuery({
    queryKey: ["health"],
    queryFn: () => apiGet<HealthResponse>("/health"),
  });

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Overview</Typography>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          API status
        </Typography>
        {health.isPending && <CircularProgress size={24} />}
        {health.isError && (
          <Alert severity="error">
            Could not reach the API. Is the server running on port 4000?
          </Alert>
        )}
        {health.isSuccess && (
          <Alert severity="success">
            API healthy · database connected · {health.data.db.evidenceCount ?? 0} evidence
            items
          </Alert>
        )}
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Observation types (from @hibit/shared)
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {observationTypeSchema.options.map((t) => (
            <Chip key={t} label={t} size="small" />
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}
