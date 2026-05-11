'use client';

import { useEffect, useState } from 'react';

const LOGO_DARK_BG = 'https://storage.inadullaev.com/siymo_logo_white.svg';
const LOGO_LIGHT_BG = 'https://storage.inadullaev.com/siymo_logo.svg';

type LogoProps = {
  height?: number;
};

export function Logo({ height = 24 }: LogoProps) {
  // Start from the theme the server rendered on <html> ("dark"); reconcile with
  // the live value (and follow any future changes) once mounted.
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    const read = () => setTheme(document.documentElement.dataset.theme || 'dark');
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => obs.disconnect();
  }, []);
  const src = theme === 'light' ? LOGO_LIGHT_BG : LOGO_DARK_BG;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote SVG asset
    <img
      src={src}
      alt="Siymo AI"
      style={{ height, width: 'auto', display: 'block' }}
    />
  );
}
