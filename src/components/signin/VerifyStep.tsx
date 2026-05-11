import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useT } from '../../i18n/LanguageContext';
import { Rich } from '../Rich';
import { applyMask, type Country } from './countries';
import { SmsIcon, VoiceIcon } from './icons';

type Mode = 'sms' | 'call';

const SERVICE_E164 = '+998712000000';
const SERVICE_DISPLAY = '+998 71 200-00-00';
const DURATION = 60; // seconds the QR stays valid
const MAX_ATTEMPTS = 3;

function genToken() {
  const part = () => Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${part()}-${part()}`;
}
function genSession() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}
function fmtTime(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

type VerifyStepProps = {
  country: Country;
  phone: string;
  onBack: () => void;
};

export function VerifyStep({ country, phone, onBack }: VerifyStepProps) {
  const { t } = useT();
  const v = t.signIn.verify;
  const userPhone = `${country.dial} ${applyMask(phone, country.mask)}`;

  const [mode, setMode] = useState<Mode>('sms');
  const [token, setToken] = useState(genToken);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [session] = useState(genSession);

  useEffect(() => {
    setSecondsLeft(DURATION);
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [token]);

  const message = `SIYMO VERIFY ${token}`;
  const payload =
    mode === 'sms' ? `SMSTO:${SERVICE_E164}:${message}` : `tel:${SERVICE_E164}`;
  const meta = mode === 'sms' ? v.sms : v.call;
  const expired = secondsLeft === 0;
  const canRetry = attemptsLeft > 1;

  const newCode = () => {
    setAttemptsLeft((a) => a - 1);
    setToken(genToken());
  };
  const switchMode = () => {
    setMode((m) => (m === 'sms' ? 'call' : 'sms'));
    setAttemptsLeft(MAX_ATTEMPTS);
    setToken(genToken());
  };

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

      <div className="qr-frame" data-dim={expired ? 'true' : undefined}>
        <span className="qr-corner-tr" />
        <span className="qr-corner-bl" />
        <QRCodeSVG
          value={payload}
          size={200}
          level="M"
          bgColor="#ffffff"
          fgColor="#000000"
          marginSize={0}
        />
      </div>

      <div className="qr-detail">
        {mode === 'sms' ? (
          <>
            <div className="qr-detail-row">
              <span className="qr-detail-k mono">{v.toLabel}</span>
              <span className="mono">{SERVICE_DISPLAY}</span>
            </div>
            <div className="qr-detail-row">
              <span className="qr-detail-k mono">{v.messageLabel}</span>
              <span className="mono">{message}</span>
            </div>
          </>
        ) : (
          <div className="qr-detail-row">
            <span className="qr-detail-k mono">{v.callLabel}</span>
            <span className="mono">{SERVICE_DISPLAY}</span>
          </div>
        )}
      </div>

      <div className="qr-status">
        {!expired ? (
          <>
            <div className="qr-meter">
              <span className="mono">
                {v.expiresIn.replace('{time}', fmtTime(secondsLeft))}
              </span>
              <span className="qr-dot" />
              <span className="mono">
                {v.attemptsLeft.replace('{n}', String(attemptsLeft))}
              </span>
            </div>
            <div className="qr-waiting">
              <span className="qr-pulse" />
              {v.waiting}
            </div>
          </>
        ) : canRetry ? (
          <>
            <div className="qr-expired mono">{v.expired}</div>
            <button
              className="modal-btn"
              style={{ marginTop: 10 }}
              onClick={newCode}
            >
              {v.newCode}
            </button>
          </>
        ) : (
          <>
            <div className="qr-expired mono">{v.tooManyTries}</div>
            <button
              className="modal-btn"
              style={{ marginTop: 10 }}
              onClick={onBack}
            >
              {v.startOver}
            </button>
          </>
        )}
        <div className="mono qr-session">
          {v.sessionTemplate.replace('{code}', session)}
        </div>
      </div>

      <button
        className="modal-btn secondary"
        style={{ marginTop: 14 }}
        onClick={switchMode}
      >
        {mode === 'sms' ? v.switchToCall : v.switchToSms}
      </button>
    </>
  );
}
