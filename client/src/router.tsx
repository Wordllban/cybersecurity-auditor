import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { RootLayout } from "./RootLayout";
import { HomePage } from "./pages/HomePage";
import { EvidencePage } from "./pages/EvidencePage";
import { ObservationsPage } from "./pages/ObservationsPage";
import { FindingsPage } from "./pages/FindingsPage";

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

const routeTree = rootRoute.addChildren([
  indexRoute,
  evidenceRoute,
  observationsRoute,
  findingsRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
