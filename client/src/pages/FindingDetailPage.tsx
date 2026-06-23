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
import { fetchFinding } from "../api/findings";
import { fetchEvidence } from "../api/evidence";
import { fetchObservations } from "../api/observations";
import { SeverityChip } from "../components/SeverityChip";
import { FindingStatusChip } from "../components/FindingStatusChip";
import { ObservationTypeChip } from "../components/ObservationTypeChip";

export function FindingDetailPage() {
  const { findingId } = useParams({ from: "/findings/$findingId" });

  const finding = useQuery({
    queryKey: ["findings", findingId],
    queryFn: () => fetchFinding(findingId),
  });
  const evidence = useQuery({ queryKey: ["evidence"], queryFn: fetchEvidence });
  const observations = useQuery({
    queryKey: ["observations", "__all__"],
    queryFn: () => fetchObservations(),
  });

  const evidenceName = (id: string) =>
    evidence.data?.find((e) => e.id === id)?.sourceFileName ?? id;
  const observationById = (id: string) =>
    observations.data?.find((o) => o.id === id);

  return (
    <Stack spacing={3}>
      <Box>
        <Link to="/findings" style={linkStyle}>
          ← Back to findings
        </Link>
      </Box>

      {finding.isPending && <CircularProgress />}
      {finding.isError && (
        <Alert severity="error">Could not load this finding.</Alert>
      )}

      {finding.isSuccess && (
        <>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h4">{finding.data.title}</Typography>
            <Stack direction="row" spacing={1}>
              <SeverityChip severity={finding.data.severity} />
              <FindingStatusChip status={finding.data.status} />
            </Stack>
          </Stack>

          <Typography variant="body1">{finding.data.summary}</Typography>

          <Box>
            <Typography variant="subtitle2">Suggested remediation</Typography>
            <Typography variant="body2" color="text.secondary">
              {finding.data.suggestedRemediation}
            </Typography>
          </Box>

          <Divider />

          {/* Related observations — each links to the single evidence item it cites. */}
          <Typography variant="h6">
            Related observations ({finding.data.relatedObservationIds.length})
          </Typography>
          <Stack spacing={1}>
            {finding.data.relatedObservationIds.map((id) => {
              const obs = observationById(id);
              return (
                <Card key={id} variant="outlined">
                  <CardContent>
                    {obs ? (
                      <>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ mb: 0.5 }}
                        >
                          <ObservationTypeChip type={obs.observationType} />
                        </Stack>
                        <Typography variant="body2">{obs.text}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Source:{" "}
                          <Link
                            to="/evidence/$evidenceId"
                            params={{ evidenceId: obs.evidenceId }}
                            style={linkStyle}
                          >
                            {evidenceName(obs.evidenceId)}
                          </Link>
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Observation {id} is no longer available.
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </Stack>

          {/* Related evidence — derived from the cited observations. */}
          <Typography variant="h6">
            Related evidence ({finding.data.relatedEvidenceIds.length})
          </Typography>
          <Box component="ul" sx={{ mt: 0, pl: 3 }}>
            {finding.data.relatedEvidenceIds.map((id) => (
              <Typography component="li" variant="body2" key={id}>
                <Link
                  to="/evidence/$evidenceId"
                  params={{ evidenceId: id }}
                  style={linkStyle}
                >
                  {evidenceName(id)}
                </Link>
              </Typography>
            ))}
          </Box>
        </>
      )}
    </Stack>
  );
}
