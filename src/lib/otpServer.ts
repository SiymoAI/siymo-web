import 'server-only';
import { SiymoOtpServer } from '@siymo/otp-server';

/**
 * Server-side Siymo OTP client. Holds the API key — must only ever be imported
 * from Route Handlers / Server Components, never from a Client Component.
 *
 * Env vars are loaded automatically by Next.js from `.env` (and `.env.local`),
 * so there's no `dotenv` here.
 */

const API_KEY = process.env.SIYMO_OTP_API_KEY;

// Base URL of the Siymo OTP service. Safe to expose to the browser — it's the
// host the browser SDK opens its WebSocket against.
export const OTP_BASE_URL = process.env.SIYMO_OTP_BASE_URL || 'https://otp.siymo.com';

let client: SiymoOtpServer | null = null;

export function getOtp(): SiymoOtpServer {
  if (!API_KEY) {
    throw new Error(
      'SIYMO_OTP_API_KEY is not set. Copy .env.example to .env and put your ' +
        'siymo_<48-hex> key in it.',
    );
  }
  if (!client) {
    client = new SiymoOtpServer({ apiKey: API_KEY, baseUrl: OTP_BASE_URL });
  }
  return client;
}
