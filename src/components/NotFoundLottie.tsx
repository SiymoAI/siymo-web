'use client';

import dynamic from 'next/dynamic';
import animationData from './notFoundAnimation.json';

// lottie-react drives lottie-web, which is DOM-only — load it on the client
// only so it never runs during SSR. This is allowed here because the file is a
// Client Component.
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export function NotFoundLottie() {
  return (
    <div className="nf-lottie" aria-hidden>
      <Lottie animationData={animationData} loop autoplay style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
