import { useEffect, useState } from 'react';

const LOGO_DARK_BG = 'https://storage.inadullaev.com/siymo_logo_white.svg';
const LOGO_LIGHT_BG = 'https://storage.inadullaev.com/siymo_logo.svg';

type LogoProps = {
  height?: number;
};

export function Logo({ height = 24 }: LogoProps) {
  const [theme, setTheme] = useState<string>(
    document.documentElement.dataset.theme || 'dark'
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.dataset.theme || 'dark')
    );
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => obs.disconnect();
  }, []);
  const src = theme === 'light' ? LOGO_LIGHT_BG : LOGO_DARK_BG;
  return (
    <img
      src={src}
      alt="Siymo AI"
      style={{ height, width: 'auto', display: 'block' }}
    />
  );
}
