import { useEffect, useState } from 'react';
import { useT } from '../i18n/LanguageContext';

export function CallVisual() {
  const { t } = useT();
  const lines = t.call.lines;
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setIdx((i) => (i + 1) % (lines.length + 1)),
      2200
    );
    return () => window.clearInterval(timer);
  }, [lines.length]);

  return (
    <div className="call-vis">
      <div className="call-head">
        <span className="call-dot live" />
        <span className="mono">
          {t.call.live} · {t.call.phone} · 00:0{Math.min(idx, 9)}
        </span>
        <span style={{ marginLeft: 'auto' }} className="mono">
          {t.call.flow}
        </span>
      </div>
      <div className="call-body">
        {lines.slice(0, idx).map((l, i) => (
          <div key={i} className={`call-line ${l.who}`}>
            <span className="call-tag mono">
              {l.who === 'caller' ? t.call.caller : t.call.siymo}
            </span>
            <span className="call-text">{l.text}</span>
          </div>
        ))}
        {idx < lines.length && (
          <div className="call-line typing">
            <span className="call-tag mono">
              {lines[idx].who === 'caller' ? t.call.caller : t.call.siymo}
            </span>
            <span className="typing-dots">
              <span />
              <span />
              <span />
            </span>
          </div>
        )}
      </div>
      <div className="call-foot">
        <div className="call-wave">
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.04}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
