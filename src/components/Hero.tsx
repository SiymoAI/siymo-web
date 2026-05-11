import { Fragment } from 'react';
import { useT } from '../i18n/LanguageContext';
import { CallVisual } from './CallVisual';
import { HeroMesh } from './HeroMesh';

type HeroProps = {
  onSignIn: () => void;
};

export function Hero({ onSignIn }: HeroProps) {
  const { t } = useT();
  const headline = t.hero.headline;
  return (
    <section className="hero">
      <HeroMesh />
      <div className="hero-grid" />
      <div className="eyebrow">
        <span className="dot">
          <span className="pulse" style={{ position: 'absolute', inset: 6 }} />
        </span>
        <span>{t.hero.badge}</span>
      </div>
      <h1 className="h-display">
        {headline.map((word, i) => (
          <Fragment key={i}>
            <span className="word" style={{ animationDelay: `${i * 0.18}s` }}>
              {word.ital ? <span className="ital">{word.w}</span> : word.w}
            </span>
            {i < headline.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </h1>
      <p className="hero-sub">{t.hero.sub}</p>
      <div className="hero-cta">
        <button className="btn btn-primary btn-lg" onClick={onSignIn}>
          {t.hero.ctaPrimary}
          <span className="arrow">→</span>
        </button>
        <button className="btn btn-secondary btn-lg">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          {t.hero.ctaSecondary}
        </button>
      </div>

      <div style={{ width: '100%', maxWidth: 920, marginTop: 64 }}>
        <CallVisual />
      </div>

      <div className="hero-meta">
        {t.hero.stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className="stat-num">
              {s.num}
              {s.suffix ? (
                <span style={{ fontSize: '0.5em' }}>{s.suffix}</span>
              ) : null}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
