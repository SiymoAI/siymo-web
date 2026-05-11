'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { PostHogPageView } from './PostHogPageView';

/**
 * Initialises PostHog in the browser and exposes it to the React tree.
 *
 * What this gives us out of the box:
 *  - autocapture — every click / input change / form submit, no per-element code
 *  - $pageview / $pageleave on every App-Router navigation (see PostHogPageView)
 *  - session replay (watch real sessions) + heatmaps + scroll-depth
 *
 * Privacy: this site has a phone-OTP login. Replay therefore masks **all**
 * inputs and any element tagged `data-ph-no-capture` / `.ph-no-capture`, and
 * PostHogPageView stops recording entirely on `/login` and `/account` so we
 * never capture a phone number or one-time code. Events from those pages are
 * still counted (pageviews, button clicks) — just not the DOM contents.
 *
 * No-ops cleanly when `NEXT_PUBLIC_POSTHOG_KEY` is unset (e.g. local dev).
 */
export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    posthog.init(key, {
      // Routed through the Next rewrites in next.config.mjs so ad-blockers
      // don't eat the requests. `ui_host` is where "open in PostHog" links go.
      api_host: '/ingest',
      ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.posthog.com',

      // We capture pageviews ourselves in PostHogPageView (App Router needs it).
      capture_pageview: false,
      capture_pageleave: true,

      // Only create a Person profile for users we explicitly identify();
      // anonymous events, replays and heatmaps are still captured for everyone.
      person_profiles: 'identified_only',

      // Click/scroll heatmaps.
      enable_heatmaps: true,

      // Session replay — keep it locked down (this is also configurable in the
      // PostHog project settings; values here win).
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: '[data-ph-mask]',
        // Don't record password-manager-style fields or anything we opt out.
        blockSelector: '[data-ph-no-capture]',
      },
      // Belt-and-braces: never record the OTP / account screens at all.
      // (PostHogPageView also calls stop/startSessionRecording on navigation,
      // but this stops it before the first paint on a hard load.)
      disable_session_recording:
        typeof window !== 'undefined' &&
        /^\/(login|account)\b/.test(window.location.pathname),

      autocapture: true,
      debug: process.env.NODE_ENV === 'development',
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}
