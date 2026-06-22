import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { Link, Outlet } from "@tanstack/react-router";

const NAV = [
  { to: "/", label: "Overview" },
  { to: "/evidence", label: "Evidence" },
  { to: "/observations", label: "Observations" },
  { to: "/findings", label: "Findings" },
] as const;

const linkStyle = {
  color: "white",
  textDecoration: "none",
  marginRight: 20,
  fontSize: 15,
} as const;

export function RootLayout() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ mr: 4 }}>
            Hibit Assessment
          </Typography>
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={linkStyle}
              activeProps={{ style: { ...linkStyle, fontWeight: 700, textDecoration: "underline" } }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
