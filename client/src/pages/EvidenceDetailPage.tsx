import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { linkStyle } from "../linkStyle";
import { fetchEvidenceItem } from "../api/evidence";
import { fetchObservations } from "../api/observations";
import { fetchFindings } from "../api/findings";
import { SourceTypeChip } from "../components/SourceTypeChip";
import { ObservationTypeChip } from "../components/ObservationTypeChip";
import { SeverityChip } from "../components/SeverityChip";
import { FindingStatusChip } from "../components/FindingStatusChip";

export function EvidenceDetailPage() {
  const { evidenceId } = useParams({ from: "/evidence/$evidenceId" });

  const evidence = useQuery({
    queryKey: ["evidence", evidenceId],
    queryFn: () => fetchEvidenceItem(evidenceId),
  });
  const observations = useQuery({
    queryKey: ["observations", evidenceId],
    queryFn: () => fetchObservations(evidenceId),
  });
  const findings = useQuery({
    queryKey: ["findings", "by-evidence", evidenceId],
    queryFn: () => fetchFindings(evidenceId),
  });

  return (
    <Stack spacing={3}>
      <Box>
        <Link to="/evidence" style={linkStyle}>
          ← Back to evidence
        </Link>
      </Box>

      {evidence.isPending && <CircularProgress />}
      {evidence.isError && (
        <Alert severity="error">Could not load this evidence item.</Alert>
      )}

      {evidence.isSuccess && (
        <>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h4">{evidence.data.sourceFileName}</Typography>
            <SourceTypeChip sourceType={evidence.data.sourceType} />
          </Stack>

          {/* Extracted observations — each is sourced from exactly this evidence item. */}
          <Typography variant="h6">
            Extracted observations ({observations.data?.length ?? 0})
          </Typography>
          {observations.isSuccess && observations.data.length === 0 && (
            <Alert severity="info">
              No observations yet. Run analysis on this item from the Evidence
              page.
            </Alert>
          )}
          <Stack spacing={1}>
            {observations.data?.map((obs) => (
              <Card key={obs.id} variant="outlined">
                <CardContent>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 0.5 }}
                  >
                    <ObservationTypeChip type={obs.observationType} />
                    <Typography variant="caption" color="text.secondary">
                      Confidence {Math.round(obs.confidence * 100)}%
                    </Typography>
                  </Stack>
                  <Typography variant="body2">{obs.text}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>

          {/* Findings this evidence feeds — the reverse traceability direction. */}
          <Typography variant="h6">
            Findings citing this evidence ({findings.data?.length ?? 0})
          </Typography>
          {findings.isSuccess && findings.data.length === 0 && (
            <Alert severity="info">
              No findings reference this evidence yet.
            </Alert>
          )}
          <Stack spacing={1}>
            {findings.data?.map((finding) => (
              <Card key={finding.id} variant="outlined">
                <CardContent>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Link
                      to="/findings/$findingId"
                      params={{ findingId: finding.id }}
                      style={{ ...linkStyle, fontWeight: 600 }}
                    >
                      {finding.title}
                    </Link>
                    <Stack direction="row" spacing={1}>
                      <SeverityChip severity={finding.severity} />
                      <FindingStatusChip status={finding.status} />
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Divider />

          <Typography variant="h6">Full text</Typography>
          <Typography
            component="pre"
            variant="body2"
            sx={{ whiteSpace: "pre-wrap", fontFamily: "inherit", m: 0 }}
          >
            {evidence.data.fullText ?? evidence.data.contentPreview}
          </Typography>
        </>
      )}
    </Stack>
  );
}
