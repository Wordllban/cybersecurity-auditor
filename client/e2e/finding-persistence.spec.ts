import { execSync } from "node:child_process";
import { test, expect } from "@playwright/test";

// Matches the fixture inserted by server `seed:e2e` (see global-setup.ts).
const SEEDED_TITLE = "E2E Seeded Finding";

// Reset the shared E2E database before each test so they don't depend on order
// (the edit test mutates the seeded finding). Safe to re-run against the live
// server — the seed clears + re-inserts rows rather than touching the file.
test.beforeEach(() => {
  execSync("pnpm --filter @hibit/server seed:e2e", {
    stdio: "ignore",
    env: { ...process.env, DATABASE_PATH: "./data/e2e.db" },
  });
});

test("editing a finding persists across a page reload", async ({ page }) => {
  await page.goto("/findings");
  await expect(page.getByText(SEEDED_TITLE)).toBeVisible();

  // Edit the finding in the real UI.
  await page.getByRole("button", { name: "Edit" }).first().click();
  const dialog = page.getByRole("dialog");
  const newTitle = `Edited by E2E ${Date.now()}`;
  await dialog.getByLabel("Title").fill(newTitle);
  await dialog.getByRole("button", { name: "Save", exact: true }).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByText(newTitle)).toBeVisible();

  // The graded behavior: after a reload the edit must still be there. A
  // cache-only update (no server PATCH / bad invalidation) would regress here —
  // the old title would come back.
  await page.reload();
  await expect(page.getByText(newTitle)).toBeVisible();
  await expect(page.getByText(SEEDED_TITLE)).toHaveCount(0);
});

test("shows a loading indicator while findings load", async ({ page }) => {
  // Delay only the API fetch (not the SPA document navigation) so the loading
  // state is observable.
  await page.route("**/findings", async (route) => {
    if (route.request().resourceType() === "document") return route.continue();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await route.continue();
  });

  await page.goto("/findings");
  await expect(page.getByRole("progressbar")).toBeVisible();
  await expect(page.getByText(SEEDED_TITLE)).toBeVisible();
});

test("shows an error state when findings fail to load", async ({ page }) => {
  // Fail only the API fetch; let the SPA document navigation through.
  await page.route("**/findings", (route) => {
    if (route.request().resourceType() === "document") return route.continue();
    return route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: "Internal server error" }),
    });
  });

  await page.goto("/findings");
  await expect(page.getByText("Could not load findings.")).toBeVisible();
});
