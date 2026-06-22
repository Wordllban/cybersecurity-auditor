const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

/** Thin fetch wrapper that throws on non-2xx so TanStack Query surfaces error states. */
export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status}): ${path}`);
  }
  return res.json() as Promise<T>;
}

export interface HealthResponse {
  status: string;
  db: { connected: boolean; evidenceCount?: number };
}
