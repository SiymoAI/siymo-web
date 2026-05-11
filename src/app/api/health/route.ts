import { NextResponse } from 'next/server';
import { getOtp } from '@/lib/otpServer';
import { handleApiError } from '@/lib/apiError';

// Holds the API key — keep this on the Node.js runtime, never the Edge.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/health -> OTP service liveness passthrough.
export async function GET() {
  try {
    return NextResponse.json(await getOtp().health());
  } catch (err) {
    return handleApiError(err);
  }
}
