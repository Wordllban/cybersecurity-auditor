/**
 * Inline style for in-content TanStack Router links. We use the router's own
 * `Link` (not MUI `Link` with `component`) because MUI's polymorphism conflicts
 * with the router's typed `to`/`params` props — same reason as RootLayout.
 */
export const linkStyle = {
  color: "#1976d2", // MUI primary.main
  textDecoration: "none",
} as const;
