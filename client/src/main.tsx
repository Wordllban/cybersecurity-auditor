import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { RouterProvider } from "@tanstack/react-router";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { router } from "./router";
import { DRAFT_FINDINGS_KEY } from "./draftFindings";

const queryClient = new QueryClient();
const theme = createTheme();

const persister = createSyncStoragePersister({
  storage: window.localStorage,
  key: "hibit-query-cache",
});

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Missing #root element");

createRoot(rootEl).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister,
          // Only draft findings live in localStorage (ADR-0006). Server-owned
          // queries (evidence, observations, findings) are never persisted —
          // the server stays the source of truth and they refetch on load.
          dehydrateOptions: {
            shouldDehydrateQuery: (query) =>
              query.queryKey[0] === DRAFT_FINDINGS_KEY[0],
          },
        }}
      >
        <RouterProvider router={router} />
      </PersistQueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
