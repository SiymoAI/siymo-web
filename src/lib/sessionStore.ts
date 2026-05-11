import 'server-only';

/**
 * In-memory stores for the sign-in flow — the same model the old Express
 * backend used (see git history / the original `server/index.js`):
 *
 *   pendingPhones  sessionId -> the phone the caller asked to verify
 *   logins         authToken -> the verified login behind the `siymo_session`
 *                  httpOnly cookie
 *
 * Fine for a demo / single-process deployment (`next dev`, `next start`). For a
 * multi-instance or serverless deployment, swap these Maps for Redis or a DB.
 *
 * We hang the Maps (and the sweeper interval) off `globalThis` so they survive
 * Next.js dev hot-reloads instead of leaking a new sweeper on every edit.
 */

export type PendingPhone = { phone: string; expiresAt: number };
export type Login = {
  phone: string;
  verifiedAt: string;
  channel: string;
  direction: string;
  createdAt: number;
};

export const SESSION_COOKIE = 'siymo_session';

export const PENDING_TTL_MS = 15 * 60_000;
export const LOGIN_TTL_MS = 7 * 24 * 60 * 60_000;

type SiymoGlobal = typeof globalThis & {
  __siymoPendingPhones?: Map<string, PendingPhone>;
  __siymoLogins?: Map<string, Login>;
  __siymoSweeper?: ReturnType<typeof setInterval>;
};
const g = globalThis as SiymoGlobal;

export const pendingPhones: Map<string, PendingPhone> = (g.__siymoPendingPhones ??=
  new Map());
export const logins: Map<string, Login> = (g.__siymoLogins ??= new Map());

if (!g.__siymoSweeper) {
  g.__siymoSweeper = setInterval(() => {
    const now = Date.now();
    for (const [k, v] of pendingPhones) if (v.expiresAt < now) pendingPhones.delete(k);
    for (const [k, v] of logins) if (now - v.createdAt > LOGIN_TTL_MS) logins.delete(k);
  }, 5 * 60_000);
  // Don't keep the Node process alive just for the sweeper.
  g.__siymoSweeper.unref?.();
}
