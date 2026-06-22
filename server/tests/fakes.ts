import type { AnalyzeLlm } from "../src/llm/openRouterClient";
import type { ChatMessage } from "../src/llm/prompt";

/**
 * A scriptable fake LLM so the suite runs offline with no key (ADR-0007). Pass a
 * fixed string, or a function for dynamic behavior / throwing to simulate failures.
 */
export function fakeLlm(
  respondWith: string | ((messages: ChatMessage[]) => string | Promise<string>),
): AnalyzeLlm {
  return {
    complete: async (messages) =>
      typeof respondWith === "function" ? respondWith(messages) : respondWith,
  };
}

/** An LLM that should never be called (for tests that don't touch /analyze). */
export const unusedLlm: AnalyzeLlm = {
  complete: async () => {
    throw new Error("LLM should not be called in this test");
  },
};
