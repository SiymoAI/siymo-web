import 'server-only';
import { NextResponse } from 'next/server';
import { SiymoOtpApiError } from '@siymo/otp-server';

/**
 * Maps an error thrown inside an `/api/*` Route Handler to a JSON response —
 * the equivalent of the Express error middleware the old backend used.
 */
export function handleApiError(err: unknown): NextResponse {
  if (err instanceof SiymoOtpApiError) {
    console.error('[siymo] OTP service error', err.status, err.url, err.body);
    const status = err.status >= 400 && err.status < 600 ? err.status : 502;
    return NextResponse.json(
      { error: 'otp_service_error', detail: err.body ?? err.statusText },
      { status },
    );
  }
  if (err instanceof Error && err.message.includes('SIYMO_OTP_API_KEY')) {
    console.error('[siymo] config error:', err.message);
    return NextResponse.json(
      { error: 'server_not_configured', detail: err.message },
      { status: 500 },
    );
  }
  console.error('[siymo] unhandled error', err);
  return NextResponse.json({ error: 'internal_error' }, { status: 500 });
}
