import { Cta } from '../components/Cta';
import { Features } from '../components/Features';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { Nav } from '../components/Nav';
import { Pricing } from '../components/Pricing';
import { UseCases } from '../components/UseCases';
import { navigate } from '../router';

export function LandingPage() {
  const goSignIn = () => navigate('/login');
  return (
    <>
      <Nav onSignIn={goSignIn} />
      <main>
        <Hero onSignIn={goSignIn} />
        <Features />
        <HowItWorks />
        <UseCases />
        <Pricing onSignIn={goSignIn} />
        <Cta onSignIn={goSignIn} />
        <Footer />
      </main>
    </>
  );
}
