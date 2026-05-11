import { useState } from 'react';
import { HeroMesh } from '../components/HeroMesh';
import { Logo } from '../components/Logo';
import { COUNTRIES, type Country } from '../components/signin/countries';
import { PhoneStep } from '../components/signin/PhoneStep';
import { VerifyStep } from '../components/signin/VerifyStep';
import { Link } from '../router';

export function AuthPage() {
  const [step, setStep] = useState<0 | 1>(0);
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [phone, setPhone] = useState('');

  return (
    <div className="auth-page">
      <HeroMesh />
      <header className="auth-top">
        <Link to="/" className="auth-home" aria-label="Siymo AI">
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
            />
          )}
        </div>
      </div>
    </div>
  );
}
