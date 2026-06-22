const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

/** Carries the HTTP status + server `code` so the UI can render specific error states. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly code?: string,
  ) {
    super(message);
  }
}

async function toError(res: Response, path: string): Promise<ApiError> {
  let code: string | undefined;
  let message = `Request failed (${res.status}): ${path}`;
  try {
    const body = (await res.json()) as { error?: string; code?: string };
    if (body.error) message = body.error;
    code = body.code;
  } catch {
    /* non-JSON error body */
  }
  return new ApiError(res.status, message, code);
}

/** Thin fetch wrapper that throws ApiError on non-2xx so TanStack Query surfaces errors. */
export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw await toError(res, path);
  return res.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw await toError(res, path);
  return res.json() as Promise<T>;
}

export interface HealthResponse {
  status: string;
  db: { connected: boolean; evidenceCount?: number };
}
