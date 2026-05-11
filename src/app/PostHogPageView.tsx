'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';

/** Pages where session replay must never run (phone number + OTP code live here). */
const SENSITIVE = /^\/(login|account)\b/;

function PostHogPageViewInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    // No key → PostHog was never initialised (e.g. local dev); stay quiet.
    if (!pathname || !posthog || !process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

    // The App Router doesn't emit a navigation event PostHog can hook, so we
    // send $pageview ourselves on every path / query-string change.
    let url = window.origin + pathname;
    const qs = searchParams?.toString();
    if (qs) url += `?${qs}`;
    posthog.capture('$pageview', { $current_url: url });

    // Pause replay on sensitive routes, resume it everywhere else.
    if (SENSITIVE.test(pathname)) {
      posthog.stopSessionRecording();
    } else {
      posthog.startSessionRecording();
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

/** `useSearchParams()` must sit inside a Suspense boundary in the App Router. */
export function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageViewInner />
    </Suspense>
  );
}
