// Minimal Supabase client using plain fetch (Auth + PostgREST). No SDK needed.
// All calls are no-ops unless NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY are set.

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const backendConfigured = Boolean(URL_BASE && ANON_KEY);

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number; // unix seconds
  user: { id: string; email: string };
}

export interface ProfileRow {
  id: string;
  name: string | null;
  user_type: string | null;
  data: Record<string, unknown> | null;
}

export class ApiError extends Error {}

async function request<T>(path: string, init: RequestInit & { token?: string } = {}): Promise<T> {
  if (!URL_BASE || !ANON_KEY) throw new ApiError("Backend not configured");
  const headers: Record<string, string> = {
    apikey: ANON_KEY,
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string> | undefined),
  };
  headers.Authorization = `Bearer ${init.token ?? ANON_KEY}`;
  const res = await fetch(`${URL_BASE}${path}`, { ...init, headers });
  const text = await res.text();
  const body = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const message =
      body?.error_description || body?.msg || body?.message || body?.error || `Request failed (${res.status})`;
    throw new ApiError(String(message));
  }
  return body as T;
}

interface TokenResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  expires_at?: number;
  user?: { id: string; email: string };
}

function toSession(r: TokenResponse): Session | null {
  if (!r.access_token || !r.refresh_token || !r.user) return null;
  const expires_at = r.expires_at ?? Math.floor(Date.now() / 1000) + (r.expires_in ?? 3600);
  return {
    access_token: r.access_token,
    refresh_token: r.refresh_token,
    expires_at,
    user: { id: r.user.id, email: r.user.email },
  };
}

export async function signUp(
  email: string,
  password: string,
  meta: { name: string; user_type: string }
): Promise<Session | null> {
  const r = await request<TokenResponse>("/auth/v1/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, data: meta }),
  });
  return toSession(r); // null => email confirmation is required
}

export async function signIn(email: string, password: string): Promise<Session> {
  const r = await request<TokenResponse>("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const s = toSession(r);
  if (!s) throw new ApiError("Sign-in failed");
  return s;
}

export async function refreshSession(refresh_token: string): Promise<Session> {
  const r = await request<TokenResponse>("/auth/v1/token?grant_type=refresh_token", {
    method: "POST",
    body: JSON.stringify({ refresh_token }),
  });
  const s = toSession(r);
  if (!s) throw new ApiError("Session expired");
  return s;
}

export async function signOutRemote(token: string): Promise<void> {
  try {
    await request("/auth/v1/logout", { method: "POST", token });
  } catch {
    // signing out locally is enough if the network call fails
  }
}

export async function getProfile(session: Session): Promise<ProfileRow | null> {
  const rows = await request<ProfileRow[]>(`/rest/v1/profiles?id=eq.${session.user.id}&select=*`, {
    token: session.access_token,
  });
  return rows[0] ?? null;
}

export async function saveProfile(
  session: Session,
  row: { name?: string; user_type?: string; data?: Record<string, unknown> }
): Promise<void> {
  await request("/rest/v1/profiles?on_conflict=id", {
    method: "POST",
    token: session.access_token,
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({ id: session.user.id, ...row, updated_at: new Date().toISOString() }),
  });
}

export async function deleteAccount(session: Session): Promise<void> {
  await request("/rest/v1/rpc/delete_own_user", {
    method: "POST",
    token: session.access_token,
    body: "{}",
  });
}
