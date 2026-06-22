import { Paper, Typography } from "@mui/material";

/** Placeholder workspace — filled in by later slices (#3 evidence, #4 observations, #5 findings). */
export function PlaceholderPage({ title }: { title: string }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography color="text.secondary">Coming soon.</Typography>
    </Paper>
  );
}
