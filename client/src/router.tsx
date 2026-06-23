import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { RootLayout } from "./RootLayout";
import { HomePage } from "./pages/HomePage";
import { EvidencePage } from "./pages/EvidencePage";
import { EvidenceDetailPage } from "./pages/EvidenceDetailPage";
import { ObservationsPage } from "./pages/ObservationsPage";
import { FindingsPage } from "./pages/FindingsPage";
import { FindingDetailPage } from "./pages/FindingDetailPage";

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const evidenceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/evidence",
  component: EvidencePage,
});

const evidenceDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/evidence/$evidenceId",
  component: EvidenceDetailPage,
});

const observationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/observations",
  component: ObservationsPage,
});

const findingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/findings",
  component: FindingsPage,
});

const findingDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/findings/$findingId",
  component: FindingDetailPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  evidenceRoute,
  evidenceDetailRoute,
  observationsRoute,
  findingsRoute,
  findingDetailRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
