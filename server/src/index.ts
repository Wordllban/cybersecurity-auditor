import { loadConfig } from "./config";
import { openDatabase } from "./db/connection";
import { createRepositories } from "./repositories";
import { createApp } from "./app";
import { seedEvidenceIfEmpty } from "./seed/seed";
import { OpenRouterClient } from "./llm/openRouterClient";

const config = loadConfig();
const db = openDatabase(config.databasePath);
const repositories = createRepositories(db);
const llm = new OpenRouterClient({
  apiKey: config.openRouterApiKey,
  model: config.openRouterModel,
});

// Zero-setup data: preload the Hibit evidence on first boot (idempotent).
const { seeded, total } = await seedEvidenceIfEmpty(repositories.evidence);
console.log(
  seeded
    ? `[server] seeded ${total} evidence items`
    : `[server] evidence already present (${total} items)`,
);

const app = createApp({ repositories, llm });

app.listen(config.port, () => {
  console.log(`[server] listening on http://localhost:${config.port}`);
  if (!config.openRouterApiKey) {
    console.warn(
      "[server] OPENROUTER_API_KEY not set — POST /analyze will return 503. The rest of the app works.",
    );
  }
});
