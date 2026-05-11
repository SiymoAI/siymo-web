'use client';

import { useEffect, useRef, useState } from 'react';
import { SiymoOtpBrowser, type OtpSessionSubscription } from '@siymo/otp-browser';
import { useT } from '../../i18n/LanguageContext';
import { confirmSession, startSession, type OtpMode } from '../../lib/otpApi';
import { Rich } from '../Rich';
import { applyMask, digitsOf, type Country } from './countries';
import { SmsIcon, VoiceIcon } from './icons';

type Phase =
  | { kind: 'starting' }
  | { kind: 'waiting' }
  | { kind: 'confirming' }
  | { kind: 'verified' }
  | { kind: 'expired' }
  | { kind: 'locked' }
  | { kind: 'error'; message: string };

type SessionInfo = {
  sessionId: string;
  servicePhone: string | null;
  smsText: string | null;
};

function fmtTime(secs: number) {
  const s = Math.max(0, secs);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

type VerifyStepProps = {
  country: Country;
  phone: string;
  onBack: () => void;
  onSignedIn: () => void;
};

export function VerifyStep({ country, phone, onBack, onSignedIn }: VerifyStepProps) {
  const { t } = useT();
  const v = t.signIn.verify;
  const userPhone = `${country.dial} ${applyMask(phone, country.mask)}`;
  const e164 = `${country.dial}${digitsOf(phone)}`;

  const [mode, setMode] = useState<OtpMode>('sms');
  const [restartNonce, setRestartNonce] = useState(0);

  const [phase, setPhase] = useState<Phase>({ kind: 'starting' });
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  // Bumped on every failed attempt — used to (re)play the one-shot red flash.
  const [attemptNonce, setAttemptNonce] = useState(0);

  const subRef = useRef<OtpSessionSubscription | null>(null);
  const timerRef = useRef<number | null>(null);

  const onSignedInRef = useRef(onSignedIn);
  useEffect(() => {
    onSignedInRef.current = onSignedIn;
  });

  useEffect(() => {
    let cancelled = false;

    const stopTimer = () => {
      if (timerRef.current != null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    const teardown = () => {
      stopTimer();
      subRef.current?.close(1000, 'restart');
      subRef.current = null;
    };

    teardown();
    setPhase({ kind: 'starting' });
    setSession(null);
    setQrImage(null);
    setAttemptsLeft(null);
    setSecondsLeft(null);
    setAttemptNonce(0);

    void (async () => {
      let started;
      try {
        started = await startSession(e164, mode);
      } catch (err) {
        if (!cancelled) {
          setPhase({
            kind: 'error',
            message: err instanceof Error ? err.message : 'Could not start verification.',
          });
        }
        return;
      }
      if (cancelled) return;

      setSession({
        sessionId: started.sessionId,
        servicePhone: started.servicePhone,
        smsText: started.smsText,
      });
      setQrImage(started.qrCodeImage);
      setAttemptsLeft(started.maxTries);
      setSecondsLeft(started.expiresIn);

      const client = new SiymoOtpBrowser({
        baseUrl: started.otpBaseUrl,
        sessionId: started.sessionId,
        clientToken: started.clientToken,
      });

      const failIfActive = (message: string) =>
        setPhase((p) =>
          p.kind === 'starting' || p.kind === 'waiting' ? { kind: 'error', message } : p,
        );

      const sub = client.subscribe({
        onSubscribed: (e) => {
          if (cancelled) return;
          setPhase({ kind: 'waiting' });
          // The service sends `expiresAt` as a Unix timestamp in *seconds*
          // (despite the docs saying ms). Normalise: anything below ~1e12 is
          // seconds-since-epoch, otherwise it's already milliseconds.
          const raw = e.data.expiresAt;
          const targetMs = raw < 1e12 ? raw * 1000 : raw;
          stopTimer();
          const tick = () => {
            const left = Math.round((targetMs - Date.now()) / 1000);
            setSecondsLeft(left);
            if (left <= 0) {
              stopTimer();
              setPhase((p) => (p.kind === 'waiting' ? { kind: 'expired' } : p));
            }
          };
          tick();
          timerRef.current = window.setInterval(tick, 1000);
        },
        onAttempt: (e) => {
          if (cancelled) return;
          setAttemptsLeft(e.data.triesLeft);
          setAttemptNonce((n) => n + 1);
        },
        onLocked: () => {
          if (!cancelled) {
            stopTimer();
            setPhase({ kind: 'locked' });
          }
        },
        onExpired: () => {
          if (!cancelled) {
            stopTimer();
            setPhase({ kind: 'expired' });
          }
        },
        onVerified: async (e) => {
          if (cancelled) return;
          stopTimer();
          setPhase({ kind: 'confirming' });
          try {
            // Re-verifies the JWT and sets the `siymo_session` cookie.
            await confirmSession(e.data.sessionId, e.data.verificationToken);
            if (cancelled) return;
            setPhase({ kind: 'verified' });
            onSignedInRef.current();
          } catch (err) {
            if (!cancelled) {
              setPhase({
                kind: 'error',
                message:
                  err instanceof Error ? err.message : 'Could not confirm verification.',
              });
            }
          }
        },
        onError: (err) => {
          if (!cancelled) failIfActive(err instanceof Error ? err.message : 'Connection error.');
        },
        onClose: () => {
          if (!cancelled) failIfActive('Connection closed before verification.');
        },
      });

      if (cancelled) {
        // Effect was torn down (e.g. React StrictMode remount) before this
        // async path finished — don't leak the socket.
        sub.close(1000, 'cancelled');
        return;
      }
      subRef.current = sub;
    })();

    return () => {
      cancelled = true;
      teardown();
    };
  }, [mode, restartNonce, e164]);

  const getNewCode = () => setRestartNonce((n) => n + 1);
  const switchMode = () => setMode((m) => (m === 'sms' ? 'call' : 'sms'));

  const meta = mode === 'sms' ? v.sms : v.call;
  const showActions = phase.kind === 'starting' || phase.kind === 'waiting';
  const inResult = phase.kind === 'confirming' || phase.kind === 'verified';

  return (
    <>
      <button className="modal-back" onClick={onBack}>
        ← {v.back}
      </button>
      <h2 style={{ textAlign: 'center', fontSize: 30, marginBottom: 8 }}>
        <Rich segments={meta.title} />
      </h2>
      <p className="modal-sub">{meta.sub}</p>

      <div style={{ textAlign: 'center' }}>
        <span className="qr-method-pill">
          {mode === 'sms' ? <SmsIcon /> : <VoiceIcon />}
          {meta.badge}
          <span style={{ color: 'var(--fg-mute)' }}>· {userPhone}</span>
        </span>
      </div>

      {inResult ? (
        <div className="otp-result">
          {phase.kind === 'verified' ? (
            <span className="otp-check" aria-hidden>
              ✓
            </span>
          ) : (
            <span className="otp-spinner" aria-hidden />
          )}
          <div className="otp-result-text">
            {phase.kind === 'verified' ? v.verified : v.confirming}
          </div>
        </div>
      ) : (
        <>
          <div
            className="qr-frame"
            data-dim={phase.kind !== 'waiting' ? 'true' : undefined}
          >
            <span className="qr-corner-tr" />
            <span className="qr-corner-bl" />
            {phase.kind === 'waiting' && attemptNonce > 0 && (
              <span className="qr-attempt-ring" key={attemptNonce} aria-hidden />
            )}
            {phase.kind === 'starting' ? (
              <span className="otp-spinner" aria-hidden />
            ) : qrImage ? (
              // eslint-disable-next-line @next/next/no-img-element -- inline data-URL QR code
              <img
                src={qrImage}
                width={200}
                height={200}
                alt={`Scan to verify via ${meta.badge}`}
              />
            ) : (
              <span className="otp-placeholder mono">
                {phase.kind === 'error' ? '⚠' : session?.servicePhone ?? ''}
              </span>
            )}
          </div>

          {phase.kind !== 'starting' && (
            <div className="qr-detail">
              {mode === 'sms' ? (
                <>
                  <div className="qr-detail-row">
                    <span className="qr-detail-k mono">{v.toLabel}</span>
                    <span className="mono">{session?.servicePhone ?? '—'}</span>
                  </div>
                  <div className="qr-detail-row">
                    <span className="qr-detail-k mono">{v.messageLabel}</span>
                    <span className="mono">{session?.smsText ?? '—'}</span>
                  </div>
                </>
              ) : (
                <div className="qr-detail-row">
                  <span className="qr-detail-k mono">{v.callLabel}</span>
                  <span className="mono">{session?.servicePhone ?? '—'}</span>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <div className="qr-status">
        {phase.kind === 'starting' && (
          <div className="qr-waiting">
            <span className="qr-pulse" />
            {v.starting}
          </div>
        )}

        {phase.kind === 'waiting' && (
          <>
            <div className="qr-meter">
              {secondsLeft != null && (
                <span className="mono">
                  {v.expiresIn.replace('{time}', fmtTime(secondsLeft))}
                </span>
              )}
              {secondsLeft != null && attemptsLeft != null && <span className="qr-dot" />}
              {attemptsLeft != null && (
                <span className="mono">
                  {v.attemptsLeft.replace('{n}', String(attemptsLeft))}
                </span>
              )}
            </div>
            {attemptNonce > 0 && (
              <div className="otp-attempt-line" key={attemptNonce} role="alert">
                {v.attemptInvalid}
                {attemptsLeft != null && (
                  <span className="otp-attempt-count mono">
                    {v.attemptsLeft.replace('{n}', String(attemptsLeft))}
                  </span>
                )}
              </div>
            )}
            <div className="qr-waiting">
              <span className="qr-pulse" />
              {v.waiting}
            </div>
          </>
        )}

        {phase.kind === 'expired' && (
          <>
            <div className="qr-expired mono">{v.expired}</div>
            <button className="modal-btn" style={{ marginTop: 10 }} onClick={getNewCode}>
              {v.newCode}
            </button>
          </>
        )}

        {phase.kind === 'locked' && (
          <>
            <div className="qr-expired mono">{v.tooManyTries}</div>
            <button className="modal-btn" style={{ marginTop: 10 }} onClick={onBack}>
              {v.startOver}
            </button>
          </>
        )}

        {phase.kind === 'error' && (
          <>
            <div className="qr-expired mono">{phase.message}</div>
            <button className="modal-btn" style={{ marginTop: 10 }} onClick={getNewCode}>
              {v.tryAgain}
            </button>
          </>
        )}

        {session && (
          <div className="mono qr-session">
            {v.sessionTemplate.replace(
              '{code}',
              session.sessionId.slice(0, 8).toUpperCase(),
            )}
          </div>
        )}
      </div>

      {showActions && (
        <button
          className="modal-btn secondary"
          style={{ marginTop: 14 }}
          onClick={switchMode}
          disabled={phase.kind === 'starting'}
        >
          {mode === 'sms' ? v.switchToCall : v.switchToSms}
        </button>
      )}
    </>
  );
}
