/** @type {import('next').NextConfig} */

// PostHog ingestion is reverse-proxied under `/ingest/*` so ad-blockers don't
// drop the analytics/replay requests. Point this at your PostHog cloud region:
//   US: https://us.i.posthog.com  + https://us-assets.i.posthog.com
//   EU: https://eu.i.posthog.com  + https://eu-assets.i.posthog.com
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_INGEST_HOST ?? 'https://us.i.posthog.com';
const POSTHOG_ASSETS_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_ASSETS_HOST ?? 'https://us-assets.i.posthog.com';

const nextConfig = {
  reactStrictMode: true,
  // Emit a self-contained server bundle (.next/standalone) so the Docker image
  // only ships the node_modules it actually needs. See the Dockerfile.
  output: 'standalone',
  // Required for the PostHog `/ingest` rewrites to work reliably.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      { source: '/ingest/static/:path*', destination: `${POSTHOG_ASSETS_HOST}/static/:path*` },
      { source: '/ingest/:path*', destination: `${POSTHOG_HOST}/:path*` },
      { source: '/ingest/decide', destination: `${POSTHOG_HOST}/decide` },
    ];
  },
  // The Siymo OTP SDKs ship as native ESM; Next handles them out of the box.
  // List them here only if a future build-pipeline change ever needs them
  // transpiled:
  // transpilePackages: ['@siymo/otp-browser', '@siymo/otp-core'],
};

export default nextConfig;
