'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HeroMesh } from '@/components/HeroMesh';
import { Logo } from '@/components/Logo';
import { Rich } from '@/components/Rich';
import { useT } from '@/i18n/LanguageContext';
import { logout } from '@/lib/otpApi';
import type { Account } from '@/lib/otpApi';

type ComingSoonPageProps = {
  account: Account;
};

function fmtDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

export function ComingSoonPage({ account }: ComingSoonPageProps) {
  const { t } = useT();
  const c = t.comingSoon;
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const signOut = async () => {
    setBusy(true);
    try {
      await logout();
    } catch {
      // Even if the server call fails, drop the local session.
    }
    router.replace('/');
    router.refresh();
  };

  return (
    <div className="auth-page">
      <HeroMesh />
      <header className="auth-top account-top">
        <Link href="/" className="auth-home" aria-label="Siymo AI">
          <Logo height={22} />
        </Link>
        <div className="account-chip" title={account.phone}>
          <span className="account-avatar" aria-hidden>
            {account.phone.replace(/\D/g, '').slice(-2) || '··'}
          </span>
          <span className="account-chip-phone mono">{account.phone}</span>
          <button className="account-signout" onClick={signOut} disabled={busy}>
            {c.signOut}
          </button>
        </div>
      </header>

      <div className="auth-body">
        <div className="modal coming-soon">
          <span className="cs-badge">
            <span className="cs-dot" />
            {c.badge}
          </span>
          <h2>
            <Rich segments={c.title} />
          </h2>
          <p className="modal-sub">{c.body}</p>

          <div className="qr-detail cs-detail">
            <div className="qr-detail-row">
              <span className="qr-detail-k mono">{c.phoneLabel}</span>
              <span className="mono">{account.phone}</span>
            </div>
            <div className="qr-detail-row">
              <span className="qr-detail-k mono">{c.verifiedLabel}</span>
              <span className="mono">
                {fmtDate(account.verifiedAt)} · {account.channel.toUpperCase()}
              </span>
            </div>
          </div>

          <button
            className="modal-btn secondary"
            style={{ marginTop: 18 }}
            onClick={signOut}
            disabled={busy}
          >
            {c.signOut}
          </button>
        </div>
      </div>
    </div>
  );
}
