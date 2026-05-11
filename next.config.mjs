/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The Siymo OTP SDKs ship as native ESM; Next handles them out of the box.
  // List them here only if a future build-pipeline change ever needs them
  // transpiled:
  // transpilePackages: ['@siymo/otp-browser', '@siymo/otp-core'],
};

export default nextConfig;
