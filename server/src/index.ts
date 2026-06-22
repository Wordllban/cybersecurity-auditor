import { loadConfig } from "./config";
import { openDatabase } from "./db/connection";
import { createRepositories } from "./repositories";
import { createApp } from "./app";
import { seedEvidenceIfEmpty } from "./seed/seed";

const config = loadConfig();
const db = openDatabase(config.databasePath);
const repositories = createRepositories(db);

// Zero-setup data: preload the Hibit evidence on first boot (idempotent).
const { seeded, total } = await seedEvidenceIfEmpty(repositories.evidence);
console.log(
  seeded
    ? `[server] seeded ${total} evidence items`
    : `[server] evidence already present (${total} items)`,
);

const app = createApp({ repositories });

app.listen(config.port, () => {
  console.log(`[server] listening on http://localhost:${config.port}`);
  if (!config.openRouterApiKey) {
    console.warn(
      "[server] OPENROUTER_API_KEY not set — POST /analyze will return 503. The rest of the app works.",
    );
  }
});
