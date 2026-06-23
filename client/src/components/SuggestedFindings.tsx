import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { CreateFindingInput, DraftFinding, Severity } from "@hibit/shared";
import { createFinding } from "../api/findings";
import { ApiError } from "../api/client";
import { useDraftFindings } from "../draftFindings";
import { SeverityChip } from "./SeverityChip";

const SEVERITIES: Severity[] = ["low", "medium", "high"];

interface AcceptForm {
  title: string;
  severity: Severity;
  summary: string;
  suggestedRemediation: string;
}

/**
 * Accept a draft: optionally edit title/severity/summary/remediation, then
 * POST it as a real finding. The server validates the cited observations still
 * exist, so a stale draft (its observations cleaned up by a re-analyze) fails
 * with a clear message and is left in place (ADR-0006).
 */
function AcceptDraftDialog({
  draft,
  onClose,
}: {
  draft: DraftFinding;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const { removeDraft } = useDraftFindings();
  const [form, setForm] = useState<AcceptForm>({
    title: draft.title,
    severity: draft.severity,
    summary: draft.summary,
    suggestedRemediation: draft.suggestedRemediation,
  });

  const accept = useMutation({
    mutationFn: (input: CreateFindingInput) => createFinding(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["findings"] });
      removeDraft(draft.id);
      onClose();
    },
  });

  const set = <K extends keyof AcceptForm>(key: K, value: AcceptForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = () =>
    accept.mutate({
      ...form,
      status: "accepted",
      relatedObservationIds: draft.relatedObservationIds,
      confidence: draft.confidence,
    });

  const error = accept.error;
  const isStale =
    error instanceof ApiError && error.code === "invalid_observations";

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Accept suggested finding</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            fullWidth
          />
          <TextField
            select
            label="Severity"
            value={form.severity}
            onChange={(e) => set("severity", e.target.value as Severity)}
            sx={{ maxWidth: 200 }}
          >
            {SEVERITIES.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Summary"
            value={form.summary}
            onChange={(e) => set("summary", e.target.value)}
            multiline
            minRows={2}
            fullWidth
          />
          <TextField
            label="Suggested remediation"
            value={form.suggestedRemediation}
            onChange={(e) => set("suggestedRemediation", e.target.value)}
            multiline
            minRows={2}
            fullWidth
          />
          {accept.isError &&
            (isStale ? (
              <Alert severity="warning">
                This suggestion is stale — some of its observations no longer
                exist (a re-analysis replaced them). Reject it and re-run
                analysis.
              </Alert>
            ) : (
              <Alert severity="error">
                Could not accept: {(error as Error)?.message ?? "unknown error"}
              </Alert>
            ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={accept.isPending}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={submit}
          disabled={accept.isPending}
        >
          {accept.isPending ? "Accepting…" : "Accept finding"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function SuggestedFindings() {
  const { drafts, removeDraft } = useDraftFindings();
  const [accepting, setAccepting] = useState<DraftFinding | null>(null);

  if (drafts.length === 0) return null;

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Suggested findings ({drafts.length})</Typography>
      <Typography variant="body2" color="text.secondary">
        Draft suggestions from analysis, kept in this browser only. Accept to
        save one as a finding, or reject to discard it.
      </Typography>

      {drafts.map((draft) => (
        <Card key={draft.id} variant="outlined" sx={{ borderStyle: "dashed" }}>
          <CardContent>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">{draft.title}</Typography>
              <SeverityChip severity={draft.severity} />
            </Stack>

            <Typography variant="caption" color="text.secondary">
              Confidence {Math.round(draft.confidence * 100)}% ·{" "}
              {draft.relatedObservationIds.length} observation(s)
            </Typography>

            <Typography variant="body1" sx={{ mt: 1 }}>
              {draft.summary}
            </Typography>

            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Suggested remediation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {draft.suggestedRemediation}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => setAccepting(draft)}
                >
                  Accept…
                </Button>
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => removeDraft(draft.id)}
                >
                  Reject
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      ))}

      {accepting && (
        <AcceptDraftDialog
          draft={accepting}
          onClose={() => setAccepting(null)}
        />
      )}
    </Stack>
  );
}
