import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { logins, SESSION_COOKIE } from '@/lib/sessionStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/session -> current login ({ phone, verifiedAt, channel }) or 401.
// (Pages read this server-side via `getCurrentAccount()`; this endpoint is kept
// for parity with the documented API and any client that wants to poll it.)
export async function GET() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const account = token ? logins.get(token) : undefined;
  if (!account) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }
  return NextResponse.json({
    phone: account.phone,
    verifiedAt: account.verifiedAt,
    channel: account.channel,
  });
}
