# syntax=docker/dockerfile:1

# ─── Stage 1: install deps + build ──────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies (using package-lock.json for a reproducible install)
COPY package*.json ./
RUN npm ci

# Copy the rest of the source and build
COPY . .

# NEXT_PUBLIC_* values are inlined into the client bundle at *build* time, so
# they must be present here — not just at runtime. `npm run docker:publish`
# passes them through from the shell; unset just means analytics stays off.
ARG NEXT_PUBLIC_POSTHOG_KEY=""
ARG NEXT_PUBLIC_POSTHOG_HOST="https://us.posthog.com"
ARG NEXT_PUBLIC_POSTHOG_INGEST_HOST="https://us.i.posthog.com"
ARG NEXT_PUBLIC_POSTHOG_ASSETS_HOST="https://us-assets.i.posthog.com"
ENV NEXT_PUBLIC_POSTHOG_KEY=$NEXT_PUBLIC_POSTHOG_KEY \
    NEXT_PUBLIC_POSTHOG_HOST=$NEXT_PUBLIC_POSTHOG_HOST \
    NEXT_PUBLIC_POSTHOG_INGEST_HOST=$NEXT_PUBLIC_POSTHOG_INGEST_HOST \
    NEXT_PUBLIC_POSTHOG_ASSETS_HOST=$NEXT_PUBLIC_POSTHOG_ASSETS_HOST \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ─── Stage 2: minimal runtime image ─────────────────────────────────────────
FROM node:20-alpine AS runner

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

WORKDIR /usr/src/app

# `output: 'standalone'` (next.config.mjs) produces a self-contained server in
# .next/standalone with just the node_modules it needs; static assets sit
# alongside it under .next/static. (Add a `COPY ... ./public` line here if you
# ever introduce a public/ directory.)
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static

# Default port (override with -e PORT=… ; SIYMO_OTP_API_KEY etc. come at runtime)
EXPOSE 3000

# Start up command — the standalone server entrypoint
CMD ["node", "server.js"]
