import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { linkStyle } from "../linkStyle";
import { fetchObservations } from "../api/observations";
import { fetchEvidence } from "../api/evidence";
import { ObservationTypeChip } from "../components/ObservationTypeChip";

const ALL = "__all__";

export function ObservationsPage() {
  const [evidenceFilter, setEvidenceFilter] = useState<string>(ALL);

  const evidence = useQuery({ queryKey: ["evidence"], queryFn: fetchEvidence });
  const evidenceId = evidenceFilter === ALL ? undefined : evidenceFilter;
  const observations = useQuery({
    queryKey: ["observations", evidenceId ?? ALL],
    queryFn: () => fetchObservations(evidenceId),
  });

  const nameFor = (id: string) =>
    evidence.data?.find((e) => e.id === id)?.sourceFileName ?? id;

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Observations</Typography>
        <FormControl size="small" sx={{ minWidth: 240 }}>
          <InputLabel id="evidence-filter-label">Source evidence</InputLabel>
          <Select
            labelId="evidence-filter-label"
            label="Source evidence"
            value={evidenceFilter}
            onChange={(e) => setEvidenceFilter(e.target.value)}
          >
            <MenuItem value={ALL}>All evidence</MenuItem>
            {evidence.data?.map((e) => (
              <MenuItem key={e.id} value={e.id}>
                {e.sourceFileName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {observations.isPending && <CircularProgress />}
      {observations.isError && (
        <Alert severity="error">Could not load observations.</Alert>
      )}
      {observations.isSuccess && observations.data.length === 0 && (
        <Alert severity="info">
          No observations yet. Select evidence and run analysis on the Evidence
          page.
        </Alert>
      )}

      {observations.isSuccess &&
        observations.data.map((obs) => (
          <Card key={obs.id} variant="outlined">
            <CardContent>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <ObservationTypeChip type={obs.observationType} />
                {obs.relatedFrameworkArea && (
                  <Typography variant="caption" color="text.secondary">
                    {obs.relatedFrameworkArea}
                  </Typography>
                )}
              </Stack>
              <Typography variant="body1">{obs.text}</Typography>
              <Typography variant="caption" color="text.secondary">
                Source:{" "}
                <Link
                  to="/evidence/$evidenceId"
                  params={{ evidenceId: obs.evidenceId }}
                  style={linkStyle}
                >
                  {nameFor(obs.evidenceId)}
                </Link>
              </Typography>
              <Box
                sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}
              >
                <Typography variant="caption" color="text.secondary">
                  Confidence {Math.round(obs.confidence * 100)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={obs.confidence * 100}
                  sx={{ flexGrow: 1, maxWidth: 200 }}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
    </Stack>
  );
}
