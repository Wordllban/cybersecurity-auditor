import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type {
  Finding,
  FindingStatus,
  FindingUpdate,
  Severity,
} from "@hibit/shared";
import { fetchFindings, updateFinding, deleteFinding } from "../api/findings";
import { fetchEvidence } from "../api/evidence";
import { fetchObservations } from "../api/observations";
import { SeverityChip } from "../components/SeverityChip";
import { FindingStatusChip } from "../components/FindingStatusChip";
import { SuggestedFindings } from "../components/SuggestedFindings";

const SEVERITIES: Severity[] = ["low", "medium", "high"];
const STATUSES: FindingStatus[] = ["draft", "reviewed", "accepted", "rejected"];

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString();
}

interface EditState {
  title: string;
  severity: Severity;
  status: FindingStatus;
  summary: string;
  suggestedRemediation: string;
}

function EditFindingDialog({
  finding,
  onClose,
}: {
  finding: Finding;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<EditState>({
    title: finding.title,
    severity: finding.severity,
    status: finding.status,
    summary: finding.summary,
    suggestedRemediation: finding.suggestedRemediation,
  });

  const save = useMutation({
    mutationFn: (fields: FindingUpdate) => updateFinding(finding.id, fields),
    onSuccess: () => {
      // Server is the source of truth — refetch rather than patch the cache.
      queryClient.invalidateQueries({ queryKey: ["findings"] });
      onClose();
    },
  });

  const set = <K extends keyof EditState>(key: K, value: EditState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit finding</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <TextField
              select
              label="Severity"
              value={form.severity}
              onChange={(e) => set("severity", e.target.value as Severity)}
              sx={{ flex: 1 }}
            >
              {SEVERITIES.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Status"
              value={form.status}
              onChange={(e) => set("status", e.target.value as FindingStatus)}
              sx={{ flex: 1 }}
            >
              {STATUSES.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
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
          {save.isError && (
            <Alert severity="error">
              Could not save:{" "}
              {(save.error as Error)?.message ?? "unknown error"}
            </Alert>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={save.isPending}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => save.mutate(form)}
          disabled={save.isPending}
        >
          {save.isPending ? "Saving…" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function DeleteFindingDialog({
  finding,
  onClose,
}: {
  finding: Finding;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const remove = useMutation({
    mutationFn: () => deleteFinding(finding.id),
    onSuccess: () => {
      // Deleting a finding can reference-count-delete its observations (ADR-0002).
      queryClient.invalidateQueries({ queryKey: ["findings"] });
      queryClient.invalidateQueries({ queryKey: ["observations"] });
      onClose();
    },
  });

  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete finding?</DialogTitle>
      <DialogContent>
        <Typography variant="body2">
          “{finding.title}” will be removed. Observations cited only by this
          finding will also be deleted.
        </Typography>
        {remove.isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Could not delete:{" "}
            {(remove.error as Error)?.message ?? "unknown error"}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={remove.isPending}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => remove.mutate()}
          disabled={remove.isPending}
        >
          {remove.isPending ? "Deleting…" : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function FindingsPage() {
  const [editing, setEditing] = useState<Finding | null>(null);
  const [deleting, setDeleting] = useState<Finding | null>(null);

  const findings = useQuery({ queryKey: ["findings"], queryFn: fetchFindings });
  const evidence = useQuery({ queryKey: ["evidence"], queryFn: fetchEvidence });
  const observations = useQuery({
    queryKey: ["observations", "__all__"],
    queryFn: () => fetchObservations(),
  });

  const evidenceName = (id: string) =>
    evidence.data?.find((e) => e.id === id)?.sourceFileName ?? id;
  const observationText = (id: string) =>
    observations.data?.find((o) => o.id === id)?.text ?? id;

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Findings</Typography>

      <SuggestedFindings />

      {findings.isPending && <CircularProgress />}
      {findings.isError && (
        <Alert severity="error">Could not load findings.</Alert>
      )}
      {findings.isSuccess && findings.data.length === 0 && (
        <Alert severity="info">
          No saved findings yet. Run analysis on the Evidence page, then accept
          a suggested finding above to save it here.
        </Alert>
      )}

      {findings.isSuccess &&
        findings.data.map((finding) => (
          <Card key={finding.id} variant="outlined">
            <CardContent>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h6">{finding.title}</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <SeverityChip severity={finding.severity} />
                  <FindingStatusChip status={finding.status} />
                </Stack>
              </Stack>

              <Typography variant="caption" color="text.secondary">
                Confidence {Math.round(finding.confidence * 100)}%
              </Typography>

              <Typography variant="body1" sx={{ mt: 1 }}>
                {finding.summary}
              </Typography>

              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Suggested remediation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {finding.suggestedRemediation}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2">Related evidence</Typography>
              <Box component="ul" sx={{ mt: 0.5, mb: 1, pl: 3 }}>
                {finding.relatedEvidenceIds.map((id) => (
                  <Typography component="li" variant="body2" key={id}>
                    {evidenceName(id)}
                  </Typography>
                ))}
              </Box>

              <Typography variant="subtitle2">Related observations</Typography>
              <Box component="ul" sx={{ mt: 0.5, mb: 1, pl: 3 }}>
                {finding.relatedObservationIds.map((id) => (
                  <Typography component="li" variant="body2" key={id}>
                    {observationText(id)}
                  </Typography>
                ))}
              </Box>

              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mt: 1 }}
              >
                Created {formatTimestamp(finding.createdAt)} · Updated{" "}
                {formatTimestamp(finding.updatedAt)}
              </Typography>

              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setEditing(finding)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => setDeleting(finding)}
                >
                  Delete
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}

      {editing && (
        <EditFindingDialog finding={editing} onClose={() => setEditing(null)} />
      )}
      {deleting && (
        <DeleteFindingDialog
          finding={deleting}
          onClose={() => setDeleting(null)}
        />
      )}
    </Stack>
  );
}
