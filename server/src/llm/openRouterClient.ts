import type { ChatMessage } from "./prompt";
import { AnalyzeConfigError, AnalyzeUpstreamError } from "./errors";

/** The LLM dependency the AnalyzeService talks to. Mocked in tests so the suite runs offline. */
export interface AnalyzeLlm {
  /** Returns the raw model text (expected to be JSON). Throws AnalyzeConfig/Upstream errors. */
  complete(messages: ChatMessage[]): Promise<string>;
}

export interface OpenRouterConfig {
  apiKey: string | undefined;
  model: string;
  timeoutMs?: number;
}

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export class OpenRouterClient implements AnalyzeLlm {
  constructor(private readonly config: OpenRouterConfig) {}

  async complete(messages: ChatMessage[]): Promise<string> {
    if (!this.config.apiKey) {
      throw new AnalyzeConfigError(
        "OpenRouter API key not configured — set OPENROUTER_API_KEY to run analysis.",
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      this.config.timeoutMs ?? 60_000,
    );

    let res: Response;
    try {
      res = await fetch(OPENROUTER_URL, {
        method: "POST",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.config.model,
          messages,
          response_format: { type: "json_object" },
        }),
      });
    } catch (err) {
      throw new AnalyzeUpstreamError(
        `Analysis upstream request failed: ${(err as Error).message}`,
      );
    } finally {
      clearTimeout(timeout);
    }

    if (res.status === 401 || res.status === 403) {
      throw new AnalyzeConfigError("OpenRouter rejected the API key (unauthorized).");
    }
    if (!res.ok) {
      throw new AnalyzeUpstreamError(
        `Analysis upstream returned HTTP ${res.status}.`,
      );
    }

    const payload = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = payload.choices?.[0]?.message?.content;
    if (typeof content !== "string") {
      throw new AnalyzeUpstreamError("Analysis upstream returned an unexpected shape.");
    }
    return content;
  }
}
