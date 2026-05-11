import { useT } from '../i18n/LanguageContext';
import { Reveal } from './Reveal';
import { Rich } from './Rich';

export function HowItWorks() {
  const { t } = useT();
  const h = t.how;
  return (
    <section id="how" className="section">
      <Reveal>
        <div className="section-eyebrow">{h.eyebrow}</div>
        <h2 className="section-title">
          <Rich segments={h.title} />
        </h2>
        <p className="section-lede">{h.lede}</p>
      </Reveal>

      <div className="steps">
        {h.steps.map((s, i) => (
          <Reveal key={i} className="step" delay={i * 120}>
            <h4>{s.title}</h4>
            <p>{s.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
