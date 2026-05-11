import { Fragment } from 'react';
import type { RichSegment } from '../i18n/translations';

export function Rich({ segments }: { segments: RichSegment[] }) {
  return (
    <>
      {segments.map((s, i) =>
        'br' in s ? (
          <br key={i} />
        ) : s.ital ? (
          <span key={i} className="ital">
            {s.t}
          </span>
        ) : (
          <Fragment key={i}>{s.t}</Fragment>
        )
      )}
    </>
  );
}
