export type Country = {
  code: string;
  dial: string;
  flag: string;
  mask: string;
};

export const COUNTRIES: Country[] = [
  { code: 'UZ', dial: '+998', flag: '🇺🇿', mask: '## ### ## ##' },
  { code: 'US', dial: '+1', flag: '🇺🇸', mask: '(###) ###-####' },
  { code: 'GB', dial: '+44', flag: '🇬🇧', mask: '#### ######' },
  { code: 'DE', dial: '+49', flag: '🇩🇪', mask: '### ########' },
  { code: 'FR', dial: '+33', flag: '🇫🇷', mask: '# ## ## ## ##' },
  { code: 'JP', dial: '+81', flag: '🇯🇵', mask: '##-####-####' },
  { code: 'IN', dial: '+91', flag: '🇮🇳', mask: '##### #####' },
  { code: 'BR', dial: '+55', flag: '🇧🇷', mask: '## #####-####' },
  { code: 'KZ', dial: '+7', flag: '🇰🇿', mask: '### ### ## ##' },
  { code: 'TR', dial: '+90', flag: '🇹🇷', mask: '### ### ## ##' },
  { code: 'AE', dial: '+971', flag: '🇦🇪', mask: '## ### ####' },
  { code: 'CN', dial: '+86', flag: '🇨🇳', mask: '### #### ####' },
];

export function applyMask(value: string, mask: string): string {
  const digits = value.replace(/\D/g, '');
  let out = '';
  let di = 0;
  for (const ch of mask) {
    if (di >= digits.length) break;
    if (ch === '#') {
      out += digits[di++];
    } else {
      out += ch;
    }
  }
  return out;
}

export function digitsOf(s: string): string {
  return s.replace(/\D/g, '');
}
