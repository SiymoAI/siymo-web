import { useT } from '../i18n/LanguageContext';
import { Reveal } from './Reveal';
import { Rich } from './Rich';

type PricingProps = {
  onSignIn: () => void;
};

export function Pricing({ onSignIn }: PricingProps) {
  const { t } = useT();
  const p = t.pricing;
  return (
    <section id="pricing" className="section">
      <Reveal>
        <div className="section-eyebrow">{p.eyebrow}</div>
        <h2 className="section-title">
          <Rich segments={p.title} />
        </h2>
      </Reveal>
      <div className="pricing">
        <Reveal className="price-card" delay={0}>
          <div className="price-eyebrow mono">{p.payg.eyebrow}</div>
          <div className="price-head">
            <div className="price-amount">
              <span className="serif">{p.payg.amount}</span>
            </div>
            <div className="price-cap">{p.payg.cap}</div>
          </div>
          <ul className="price-list">
            {p.payg.list.map((li, i) => (
              <li key={i}>{li}</li>
            ))}
          </ul>
          <button
            className="btn btn-secondary btn-lg"
            onClick={onSignIn}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {p.payg.cta}
          </button>
        </Reveal>
        <Reveal className="price-card featured" delay={120}>
          <div className="price-eyebrow mono">{p.enterprise.eyebrow}</div>
          <div className="price-head">
            <div className="price-amount">
              <span className="serif">{p.enterprise.amount}</span>
            </div>
            <div className="price-cap">{p.enterprise.cap}</div>
          </div>
          <ul className="price-list">
            {p.enterprise.list.map((li, i) => (
              <li key={i}>{li}</li>
            ))}
          </ul>
          <button
            className="btn btn-primary btn-lg"
            onClick={onSignIn}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {p.enterprise.cta}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
