import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { logins, SESSION_COOKIE } from '@/lib/sessionStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/logout -> drops the login and clears the cookie.
export async function POST() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (token) logins.delete(token);

  const res = new NextResponse(null, { status: 204 });
  res.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
