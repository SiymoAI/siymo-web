import { NextResponse } from 'next/server';
import { getOtp, OTP_BASE_URL } from '@/lib/otpServer';
import { pendingPhones, PENDING_TTL_MS } from '@/lib/sessionStore';
import { handleApiError } from '@/lib/apiError';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/start  { phone, mode: 'sms' | 'call' }
// Initiates an inbound SMS (default) or inbound-call verification session.
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { phone?: unknown; mode?: unknown }
      | null;
    const phone = String(body?.phone ?? '').trim();
    const mode = body?.mode === 'call' ? 'call' : 'sms';

    if (!/^\+\d{7,15}$/.test(phone)) {
      return NextResponse.json({ error: 'invalid_phone' }, { status: 400 });
    }

    const otp = getOtp();
    const session =
      mode === 'call'
        ? await otp.inbound.call.initiate({ phone, qrCode: true })
        : await otp.inbound.sms.initiate({ phone, qrCode: true });

    pendingPhones.set(session.sessionId, {
      phone,
      expiresAt: Date.now() + PENDING_TTL_MS,
    });

    // Forward only what the browser needs. NEVER forward `session.code` on an
    // inbound-call session — that is the answer to the verification.
    return NextResponse.json({
      sessionId: session.sessionId,
      clientToken: session.clientToken,
      qrCodeImage: session.qrCodeImage ?? null,
      otpBaseUrl: OTP_BASE_URL,
      channel: mode,
      expiresIn: session.expiresIn,
      maxTries: session.maxTries,
      servicePhone: session.phone ?? null,
      smsText: 'text' in session ? session.text : null,
    });
  } catch (err) {
    return handleApiError(err);
  }
}
