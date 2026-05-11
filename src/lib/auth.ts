import 'server-only';
import { cookies } from 'next/headers';
import { logins, SESSION_COOKIE } from './sessionStore';
import type { Account } from './otpApi';

/**
 * Reads the `siymo_session` httpOnly cookie and returns the verified account it
 * points at, or `null`. Call this from Server Components / Route Handlers to
 * gate pages on auth (the SSR-friendly replacement for the old client-side
 * `fetchSession()` bootstrap).
 */
export function getCurrentAccount(): Account | null {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const login = token ? logins.get(token) : undefined;
  if (!login) return null;
  return {
    phone: login.phone,
    verifiedAt: login.verifiedAt,
    channel: login.channel as Account['channel'],
  };
}
