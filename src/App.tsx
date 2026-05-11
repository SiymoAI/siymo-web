import { useEffect, useState } from 'react';
import { AuthPage } from './pages/AuthPage';
import { LandingPage } from './pages/LandingPage';
import { useRoute } from './router';

type AccentKey = 'violet' | 'mint' | 'amber' | 'blue';
type Theme = 'dark' | 'light';
type Motion = 'high' | 'low';

type Tweaks = {
  accent: AccentKey;
  theme: Theme;
  motion: Motion;
};

const TWEAK_DEFAULTS: Tweaks = {
  accent: 'violet',
  theme: 'dark',
  motion: 'high',
};

const ACCENTS: Record<AccentKey, { c: string; s: string }> = {
  violet: { c: 'oklch(0.72 0.17 290)', s: 'oklch(0.72 0.17 290 / 0.18)' },
  mint: { c: 'oklch(0.78 0.14 165)', s: 'oklch(0.78 0.14 165 / 0.18)' },
  amber: { c: 'oklch(0.8 0.16 70)', s: 'oklch(0.8 0.16 70 / 0.2)' },
  blue: { c: 'oklch(0.7 0.18 250)', s: 'oklch(0.7 0.18 250 / 0.18)' },
};

export default function App() {
  const [tweaks] = useState<Tweaks>(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = tweaks.theme;
    root.dataset.motion = tweaks.motion;
    const a = ACCENTS[tweaks.accent];
    root.style.setProperty('--accent', a.c);
    root.style.setProperty('--accent-soft', a.s);
  }, [tweaks]);

  const route = useRoute();
  return route === '/login' ? <AuthPage /> : <LandingPage />;
}
