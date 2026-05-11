import type { Lang } from '../i18n/translations';

/**
 * The active UI language is persisted in a cookie (not localStorage) so the
 * server can read it during SSR and render the right copy on the first paint —
 * no flash of the wrong language.
 *
 * Default is Uzbek; visitors can switch (which writes the cookie) and the
 * choice sticks.
 */
export const LANG_COOKIE = 'siymo-lang';
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year, in seconds
export const DEFAULT_LANG: Lang = 'uz';

export function parseLang(value: string | undefined | null): Lang {
  return value === 'en' || value === 'ru' || value === 'uz' ? value : DEFAULT_LANG;
}
