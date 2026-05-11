'use client';

import Link from 'next/link';
import { HeroMesh } from '@/components/HeroMesh';
import { Logo } from '@/components/Logo';
import { NotFoundLottie } from '@/components/NotFoundLottie';
import { Rich } from '@/components/Rich';
import { useT } from '@/i18n/LanguageContext';

export default function NotFound() {
  const { t } = useT();
  const n = t.notFound;
  return (
    <div className="auth-page">
      <HeroMesh />
      <header className="auth-top">
        <Link href="/" className="auth-home" aria-label="Siymo AI">
          <Logo height={22} />
        </Link>
      </header>
      <div className="auth-body">
        <div className="modal nf-modal">
          <div className="nf-figure">
            <NotFoundLottie />
            <span className="nf-code serif" aria-hidden>
              4<span className="ital">0</span>4
            </span>
          </div>
          <h2>
            <Rich segments={n.title} />
          </h2>
          <p className="modal-sub">{n.body}</p>
          <Link href="/" className="modal-btn nf-home-btn">
            {n.backHome}
            <span aria-hidden style={{ marginLeft: 8 }}>
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
