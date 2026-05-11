import { useT } from '../i18n/LanguageContext';
import { Reveal } from './Reveal';
import { Rich } from './Rich';

type CtaProps = {
  onSignIn: () => void;
};

export function Cta({ onSignIn }: CtaProps) {
  const { t } = useT();
  const c = t.cta;
  return (
    <Reveal as="section" className="cta">
      <h2>
        <Rich segments={c.title} />
      </h2>
      <p>{c.body}</p>
      <div
        style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <button className="btn btn-primary btn-lg" onClick={onSignIn}>
          {c.primary}
          <span className="arrow">→</span>
        </button>
        <button className="btn btn-secondary btn-lg">{c.secondary}</button>
      </div>
    </Reveal>
  );
}
