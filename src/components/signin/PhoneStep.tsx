import { useEffect, useRef, useState } from 'react';
import { useT } from '../../i18n/LanguageContext';
import { Rich } from '../Rich';
import { applyMask, COUNTRIES, digitsOf, type Country } from './countries';
import { PhoneIcon } from './icons';

type PhoneStepProps = {
  country: Country;
  setCountry: (c: Country) => void;
  phone: string;
  setPhone: (p: string) => void;
  onNext: () => void;
};

export function PhoneStep({
  country,
  setCountry,
  phone,
  setPhone,
  onNext,
}: PhoneStepProps) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);
  const masked = applyMask(phone, country.mask);
  const valid =
    digitsOf(phone).length >=
    digitsOf(country.mask.replace(/[^#]/g, '')).length - 1;

  return (
    <>
      <div className="modal-icon">
        <PhoneIcon />
      </div>
      <h2>
        <Rich segments={t.signIn.phone.title} />
      </h2>
      <p className="modal-sub">{t.signIn.phone.sub}</p>

      <div className="field" ref={ref} style={{ position: 'relative' }}>
        <span className="field-label">{t.signIn.phone.countryLabel}</span>
        <button
          className="field-btn"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className="field-row">
            <span className="flag">{country.flag}</span>
            <span>{t.countries[country.code]}</span>
          </span>
          <span
            className="field-arrow"
            style={{ transform: open ? 'rotate(180deg)' : 'none' }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>
        {open && (
          <div className="country-pop">
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setCountry(c);
                  setOpen(false);
                  setPhone('');
                }}
              >
                <span className="flag">{c.flag}</span>
                <span>{t.countries[c.code]}</span>
                <span className="dial-mono">{c.dial}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="field">
        <span className="field-label">{t.signIn.phone.phoneLabel}</span>
        <div className="field-row">
          <span className="dial-code">{country.dial}</span>
          <input
            type="tel"
            inputMode="numeric"
            placeholder={country.mask.replace(/#/g, '_')}
            value={masked}
            onChange={(e) => setPhone(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      <button className="modal-btn" disabled={!valid} onClick={onNext}>
        {t.signIn.phone.continue}
        <span style={{ marginLeft: 8 }}>→</span>
      </button>
    </>
  );
}
