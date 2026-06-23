import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { DraftFinding } from "@hibit/shared";

/**
 * Draft (suggested) findings from `/analyze` live in the query cache under this
 * key and are the only entry persisted to localStorage (ADR-0006). They are
 * never sent to the server until the reviewer accepts one.
 */
export const DRAFT_FINDINGS_KEY = ["draftFindings"] as const;

/**
 * Read/mutate the persisted draft findings. Backed by the query cache so the
 * persister keeps them across refresh/close; `staleTime: Infinity` means the
 * placeholder queryFn only ever seeds an empty list on a truly fresh load and
 * never overwrites hydrated or set data.
 */
export function useDraftFindings() {
  const queryClient = useQueryClient();

  const { data = [] } = useQuery<DraftFinding[]>({
    queryKey: DRAFT_FINDINGS_KEY,
    queryFn: async () => [],
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const addDrafts = (incoming: DraftFinding[]) =>
    queryClient.setQueryData<DraftFinding[]>(
      DRAFT_FINDINGS_KEY,
      (prev = []) => {
        const seen = new Set(prev.map((d) => d.id));
        return [...prev, ...incoming.filter((d) => !seen.has(d.id))];
      }
    );

  const removeDraft = (id: string) =>
    queryClient.setQueryData<DraftFinding[]>(DRAFT_FINDINGS_KEY, (prev = []) =>
      prev.filter((d) => d.id !== id)
    );

  return { drafts: data, addDrafts, removeDraft };
}
