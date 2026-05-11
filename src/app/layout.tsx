import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { translations } from '@/i18n/translations';
import { LANG_COOKIE, parseLang } from '@/lib/lang';
import './globals.css';

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap';

export function generateMetadata(): Metadata {
  const lang = parseLang(cookies().get(LANG_COOKIE)?.value);
  return {
    title: translations[lang].meta.title,
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  // Theme/motion are fixed defaults today (the old App.tsx only ever applied
  // the defaults), so set them statically here — no client flash, no effect.
  const lang = parseLang(cookies().get(LANG_COOKIE)?.value);

  return (
    <html lang={lang} data-theme="dark" data-motion="high">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={FONTS_HREF} rel="stylesheet" />
      </head>
      <body>
        <LanguageProvider initialLang={lang}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
