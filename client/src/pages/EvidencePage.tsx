import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import type { AnalyzeResponse } from "@hibit/shared";
import { fetchEvidence, fetchEvidenceItem } from "../api/evidence";
import { postAnalyze } from "../api/analyze";
import { ApiError } from "../api/client";
import { SourceTypeChip } from "../components/SourceTypeChip";

function EvidenceDetailDialog({ id, onClose }: { id: string; onClose: () => void }) {
  const detail = useQuery({
    queryKey: ["evidence", id],
    queryFn: () => fetchEvidenceItem(id),
  });

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {detail.data?.sourceFileName ?? "Loading…"}
        {detail.data && (
          <Box component="span" sx={{ ml: 1 }}>
            <SourceTypeChip sourceType={detail.data.sourceType} />
          </Box>
        )}
      </DialogTitle>
      <DialogContent dividers>
        {detail.isPending && <CircularProgress size={24} />}
        {detail.isError && <Alert severity="error">Failed to load the evidence item.</Alert>}
        {detail.isSuccess && (
          <Typography
            component="pre"
            variant="body2"
            sx={{ whiteSpace: "pre-wrap", fontFamily: "inherit", m: 0 }}
          >
            {detail.data.fullText ?? detail.data.contentPreview}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function EvidencePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const evidence = useQuery({ queryKey: ["evidence"], queryFn: fetchEvidence });

  const analyze = useMutation({
    mutationFn: (evidenceIds: string[]) => postAnalyze(evidenceIds),
    onSuccess: (result: AnalyzeResponse) => {
      // Server is the source of truth — refetch observations rather than patch locally.
      queryClient.invalidateQueries({ queryKey: ["observations"] });
      // Draft findings (result.suggestedFindings) are handled by a later slice.
      void result;
      navigate({ to: "/observations" });
    },
  });

  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const analyzeError = analyze.error;
  const isKeyMissing = analyzeError instanceof ApiError && analyzeError.code === "config";

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Evidence</Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            disabled={analyze.isPending || !evidence.data?.length}
            onClick={() => analyze.mutate(evidence.data!.map((e) => e.id))}
          >
            Analyze all
          </Button>
          <Button
            variant="contained"
            disabled={analyze.isPending || checked.size === 0}
            onClick={() => analyze.mutate([...checked])}
          >
            Analyze selected ({checked.size})
          </Button>
        </Stack>
      </Stack>

      {analyze.isPending && (
        <Alert severity="info" icon={<CircularProgress size={18} />}>
          Running analysis… this may take a moment.
        </Alert>
      )}
      {analyze.isError &&
        (isKeyMissing ? (
          <Alert severity="warning">
            <strong>OpenRouter API key not configured.</strong> Set{" "}
            <code>OPENROUTER_API_KEY</code> in <code>server/.env</code> to run analysis.
          </Alert>
        ) : (
          <Alert severity="error">
            Analysis failed: {(analyzeError as Error)?.message ?? "unknown error"}
          </Alert>
        ))}

      {evidence.isPending && <CircularProgress />}
      {evidence.isError && (
        <Alert severity="error">
          Could not load evidence. Is the server running on port 4000?
        </Alert>
      )}

      {evidence.isSuccess && (
        <Stack spacing={2}>
          {evidence.data.map((item) => (
            <Card key={item.id} variant="outlined">
              <Stack direction="row" alignItems="stretch">
                <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
                  <Checkbox
                    checked={checked.has(item.id)}
                    onChange={() => toggle(item.id)}
                    inputProps={{ "aria-label": `Select ${item.sourceFileName}` }}
                  />
                </Box>
                <CardActionArea onClick={() => setSelectedId(item.id)} sx={{ flexGrow: 1 }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="subtitle1" fontWeight={600}>
                        {item.sourceFileName}
                      </Typography>
                      <SourceTypeChip sourceType={item.sourceType} />
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {item.contentPreview}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Stack>
            </Card>
          ))}
        </Stack>
      )}

      {selectedId && (
        <EvidenceDetailDialog id={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </Stack>
  );
}
