import { useT } from '../i18n/LanguageContext';
import { Reveal } from './Reveal';
import { Rich } from './Rich';

export function Features() {
  const { t } = useT();
  const f = t.features;
  return (
    <section id="what" className="section">
      <Reveal>
        <div className="section-eyebrow">{f.eyebrow}</div>
        <h2 className="section-title">
          <Rich segments={f.title} />
        </h2>
        <p className="section-lede">{f.lede}</p>
      </Reveal>

      <div className="features">
        <Reveal className="feature col-7" delay={0}>
          <div className="feature-eyebrow">{f.items[0].eyebrow}</div>
          <h3>
            <Rich segments={f.items[0].title} />
          </h3>
          <p>{f.items[0].body}</p>
          <div className="feature-vis">
            <div className="vis-wave">
              {Array.from({ length: 60 }).map((_, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.04}s` }} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="feature col-5" delay={120}>
          <div className="feature-eyebrow">{f.items[1].eyebrow}</div>
          <h3>
            <Rich segments={f.items[1].title} />
          </h3>
          <p>{f.items[1].body}</p>
          <div className="feature-vis">
            <div className="vis-langs">
              <span>UZ</span>
              <span>RU</span>
              <span>EN</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="feature col-5" delay={0}>
          <div className="feature-eyebrow">{f.items[2].eyebrow}</div>
          <h3>
            <Rich segments={f.items[2].title} />
          </h3>
          <p>{f.items[2].body}</p>
          <div className="feature-vis">
            <div className="vis-cal">
              <div className="vis-cal-head mono">{f.cal.head}</div>
              <div className="vis-cal-row">
                <span className="mono">09:00</span>
                <span />
              </div>
              <div className="vis-cal-row booked">
                <span className="mono">10:00</span>
                <span>{f.cal.booked}</span>
              </div>
              <div className="vis-cal-row">
                <span className="mono">11:00</span>
                <span />
              </div>
              <div className="vis-cal-row">
                <span className="mono">12:00</span>
                <span />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="feature col-7" delay={120}>
          <div className="feature-eyebrow">{f.items[3].eyebrow}</div>
          <h3>
            <Rich segments={f.items[3].title} />
          </h3>
          <p>{f.items[3].body}</p>
          <div className="feature-vis">
            <div className="vis-lora">
              <div className="vis-lora-base">{f.lora.base}</div>
              <div className="vis-lora-link" />
              <div className="vis-lora-pods">
                {f.lora.pods.map((p, i) => (
                  <div key={i}>{p}</div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="feature col-12" delay={0}>
          <div className="feature-eyebrow">{f.items[4].eyebrow}</div>
          <h3>
            <Rich segments={f.items[4].title} />
          </h3>
          <p>{f.items[4].body}</p>
        </Reveal>
      </div>
    </section>
  );
}
