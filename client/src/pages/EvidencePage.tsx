import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { fetchEvidence, fetchEvidenceItem } from "../api/evidence";
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
  const evidence = useQuery({ queryKey: ["evidence"], queryFn: fetchEvidence });

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Evidence</Typography>

      {evidence.isPending && <CircularProgress />}
      {evidence.isError && (
        <Alert severity="error">
          Could not load evidence. Is the server running on port 4000?
        </Alert>
      )}
      {evidence.isSuccess && evidence.data.length === 0 && (
        <Alert severity="info">No evidence items yet.</Alert>
      )}

      {evidence.isSuccess && (
        <Stack spacing={2}>
          {evidence.data.map((item) => (
            <Card key={item.id} variant="outlined">
              <CardActionArea onClick={() => setSelectedId(item.id)}>
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
