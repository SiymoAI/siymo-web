'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HeroMesh } from '@/components/HeroMesh';
import { Logo } from '@/components/Logo';
import { COUNTRIES, type Country } from '@/components/signin/countries';
import { PhoneStep } from '@/components/signin/PhoneStep';
import { VerifyStep } from '@/components/signin/VerifyStep';
import { useT } from '@/i18n/LanguageContext';

export function AuthPage() {
  const router = useRouter();
  const { t } = useT();
  const [step, setStep] = useState<0 | 1>(0);
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [phone, setPhone] = useState('');

  // The httpOnly `siymo_session` cookie is set by /api/confirm before this
  // fires, so /account will see the login when we land on it.
  const handleSignedIn = () => {
    router.replace('/account');
    router.refresh();
  };

  return (
    <div className="auth-page">
      <HeroMesh />
      <header className="auth-top">
        <Link href="/" className="auth-home" aria-label="Siymo AI">
          <Logo height={22} />
        </Link>
      </header>
      <div className="auth-body">
        <div className="modal">
          {step === 0 && (
            <PhoneStep
              country={country}
              setCountry={setCountry}
              phone={phone}
              setPhone={setPhone}
              onNext={() => setStep(1)}
            />
          )}
          {step === 1 && (
            <VerifyStep
              country={country}
              phone={phone}
              onBack={() => setStep(0)}
              onSignedIn={handleSignedIn}
            />
          )}
        </div>
        {/* Quiet pitch for developers who land here: this whole SMS/call
            sign-in is the Siymo OTP product — point them at the docs. */}
        <p className="auth-ad">
          {t.signIn.builtWith.text}{' '}
          <a href="https://otp.siymo.com/docs" target="_blank" rel="noopener noreferrer">
            {t.signIn.builtWith.cta} ↗
          </a>
        </p>
      </div>
    </div>
  );
}
