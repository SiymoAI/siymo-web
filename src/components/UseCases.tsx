import { useT } from '../i18n/LanguageContext';
import { Reveal } from './Reveal';
import { Rich } from './Rich';

export function UseCases() {
  const { t } = useT();
  const u = t.useCases;
  return (
    <section id="use-cases" className="section">
      <Reveal>
        <div className="section-eyebrow">{u.eyebrow}</div>
        <h2 className="section-title">
          <Rich segments={u.title} />
        </h2>
      </Reveal>
      <div className="usecases">
        {u.items.map((c, i) => (
          <Reveal key={i} className="usecase" delay={i * 80}>
            <div className="usecase-tag mono">{c.tag}</div>
            <h4>{c.title}</h4>
            <p>{c.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
