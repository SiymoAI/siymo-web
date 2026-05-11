import { useT } from '../i18n/LanguageContext';
import { Logo } from './Logo';

export function Footer() {
  const { t } = useT();
  return (
    <footer className="footer">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Logo height={20} />
        <span>{t.footer.copyright}</span>
      </div>
      <div>
        <a href="mailto:support@siymo.com">support@siymo.com</a>
        <a href="#">{t.footer.privacy}</a>
        <a href="#">{t.footer.terms}</a>
      </div>
    </footer>
  );
}
