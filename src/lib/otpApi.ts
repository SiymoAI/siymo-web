// Thin client for the siymo-web backend (see ../../server/index.js).

export type OtpMode = 'sms' | 'call';

export type StartSessionResult = {
  sessionId: string;
  clientToken: string;
  qrCodeImage: string | null;
  otpBaseUrl: string;
  channel: OtpMode;
  expiresIn: number;
  maxTries: number;
  servicePhone: string | null;
  smsText: string | null;
};

export type Account = {
  phone: string;
  verifiedAt: string;
  channel: 'voice' | 'sms' | 'call';
};

export class OtpApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message);
    this.name = 'OtpApiError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(path, {
      ...init,
      headers: { 'content-type': 'application/json', ...(init?.headers ?? {}) },
    });
  } catch {
    throw new OtpApiError('Network error — is the backend running?', 0, 'network');
  }
  const body = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) {
    const code = (body && typeof body === 'object' && 'error' in body && String(body.error)) || undefined;
    throw new OtpApiError(code ? `Request failed (${code})` : `Request failed (${res.status})`, res.status, code);
  }
  return body as T;
}

export function startSession(phone: string, mode: OtpMode): Promise<StartSessionResult> {
  return request<StartSessionResult>('/api/start', {
    method: 'POST',
    body: JSON.stringify({ phone, mode }),
  });
}

export function confirmSession(sessionId: string, verificationToken: string): Promise<Account> {
  return request<Account>('/api/confirm', {
    method: 'POST',
    body: JSON.stringify({ sessionId, verificationToken }),
  });
}

export async function fetchSession(): Promise<Account | null> {
  try {
    return await request<Account>('/api/session');
  } catch (err) {
    if (err instanceof OtpApiError && err.status === 401) return null;
    throw err;
  }
}

export function logout(): Promise<void> {
  return request<void>('/api/logout', { method: 'POST' });
}
