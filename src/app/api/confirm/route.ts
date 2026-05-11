import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { SiymoOtpPhoneMismatchError } from '@siymo/otp-server';
import { getOtp } from '@/lib/otpServer';
import {
  logins,
  pendingPhones,
  LOGIN_TTL_MS,
  SESSION_COOKIE,
} from '@/lib/sessionStore';
import { handleApiError } from '@/lib/apiError';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/confirm  { sessionId, verificationToken }
// Re-verifies the `verificationToken` JWT (pinned to the phone from /api/start)
// and opens a login behind the `siymo_session` httpOnly cookie.
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { sessionId?: unknown; verificationToken?: unknown }
      | null;
    const sessionId = String(body?.sessionId ?? '');
    const verificationToken = String(body?.verificationToken ?? '');
    if (!sessionId || !verificationToken) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
    }

    const pending = pendingPhones.get(sessionId);
    if (!pending) {
      return NextResponse.json(
        { error: 'unknown_or_expired_session' },
        { status: 409 },
      );
    }

    let result;
    try {
      result = await getOtp().inbound.confirm({
        verificationToken,
        expectedPhone: pending.phone, // throws SiymoOtpPhoneMismatchError on mismatch
      });
    } catch (err) {
      if (err instanceof SiymoOtpPhoneMismatchError) {
        return NextResponse.json({ error: 'phone_mismatch' }, { status: 400 });
      }
      throw err;
    }
    pendingPhones.delete(sessionId);

    const token = crypto.randomBytes(32).toString('hex');
    logins.set(token, {
      phone: result.phone,
      verifiedAt: result.verifiedAt,
      channel: result.channel,
      direction: result.direction,
      createdAt: Date.now(),
    });

    const res = NextResponse.json({
      phone: result.phone,
      verifiedAt: result.verifiedAt,
      channel: result.channel,
    });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: Math.floor(LOGIN_TTL_MS / 1000), // Next cookie maxAge is in SECONDS
      // Add `secure: true` when serving over HTTPS.
    });
    return res;
  } catch (err) {
    return handleApiError(err);
  }
}
