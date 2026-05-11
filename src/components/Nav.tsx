import { useEffect, useState } from 'react';
import { useT } from '../i18n/LanguageContext';
import { LanguagePicker } from './LanguagePicker';
import { Logo } from './Logo';

type NavProps = {
  onSignIn: () => void;
};

export function Nav({ onSignIn }: NavProps) {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#" className="nav-brand">
        <Logo height={22} />
      </a>
      <div className="nav-links">
        <a href="#what">{t.nav.whatItDoes}</a>
        <a href="#how">{t.nav.howItWorks}</a>
        <a href="#use-cases">{t.nav.useCases}</a>
        <a href="#pricing">{t.nav.pricing}</a>
      </div>
      <div className="nav-cta">
        <LanguagePicker />
        <button className="btn btn-ghost" onClick={onSignIn}>
          {t.nav.signIn}
        </button>
        <button className="btn btn-primary" onClick={onSignIn}>
          {t.nav.startFree}
          <span className="arrow">→</span>
        </button>
      </div>
    </nav>
  );
}
