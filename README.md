# siymo-web

The Siymo AI marketing site **and** its phone sign-in flow, as a single
[Next.js](https://nextjs.org) (App Router) app — server-rendered pages plus the
`/api/*` route handlers that hold the Siymo OTP API key. One app, one process.
Visitor analytics (clicks, scroll, pageviews, session replay, heatmaps) run
through [PostHog](https://posthog.com).

---

## Quick start (development)

```bash
npm install
cp .env.example .env          # then put your siymo_<48-hex> key in .env
npm run dev                   # http://localhost:3000
```

`npm run lint` runs ESLint; `npm run typecheck` runs `tsc --noEmit`.

---

## Environment variables

`.env` is loaded automatically by Next.js (no `dotenv`, no separate backend).
`.env` is git-ignored — never commit your real key. See `.env.example` for the
template.

| Variable | Scope | Read at | Purpose |
|---|---|---|---|
| `SIYMO_OTP_API_KEY` | server only — **secret** | request time | API key (`siymo_<48-hex>`) used by the `/api/*` route handlers; never sent to the browser |
| `SIYMO_OTP_BASE_URL` | server | request time | Base URL of the Siymo OTP service (default `https://otp.siymo.com`) |
| `PORT` | server | startup | Port the Node server listens on (default `3000`) |
| `NEXT_PUBLIC_POSTHOG_KEY` | **public** (browser) | **build time** | PostHog project API key (`phc_…`). Empty ⇒ analytics disabled |
| `NEXT_PUBLIC_POSTHOG_HOST` | public | build time | PostHog UI host — `https://us.posthog.com` or `https://eu.posthog.com` |
| `NEXT_PUBLIC_POSTHOG_INGEST_HOST` | public | build time | Only for EU cloud: `https://eu.i.posthog.com` (default is the US host) |
| `NEXT_PUBLIC_POSTHOG_ASSETS_HOST` | public | build time | Only for EU cloud: `https://eu-assets.i.posthog.com` |

> **Build-time vs runtime.** Anything prefixed `NEXT_PUBLIC_` is inlined into the
> client JS bundle when `next build` runs — it must be present *at build time*
> (and changing it later means rebuilding). `SIYMO_OTP_API_KEY` and friends are
> server-side and only need to be present *at runtime*.

---

## Running in production (plain Node)

```bash
npm run build                 # NEXT_PUBLIC_* must be set now
npm start                     # serves SSR pages + /api/* ; honours $PORT
```

Put TLS in front of it (Caddy, nginx, your platform's load balancer). Behind
HTTPS, set `secure: true` on the `siymo_session` cookie — there's a `// Add
secure: true …` note in [src/app/api/confirm/route.ts](src/app/api/confirm/route.ts).

---

## Docker

`output: 'standalone'` (in `next.config.mjs`) makes the image a thin runtime —
just the Next server bundle and the `node_modules` it actually needs. The
`.dockerignore` excludes `.env`, so the OTP secret never lands in an image
layer; it's supplied at runtime instead.

### Build & run locally

```bash
docker build -t siymo-web --build-arg NEXT_PUBLIC_POSTHOG_KEY=phc_xxx .

docker run -p 3000:3000 \
  -e SIYMO_OTP_API_KEY=siymo_xxx \
  -e SIYMO_OTP_BASE_URL=https://otp.siymo.com \
  --restart unless-stopped siymo-web
```

…or with Compose ([docker-compose.yml](docker-compose.yml) — pulls the published
image, reads runtime env from `.env`, maps host `:3012` → container `:3000`,
healthcheck on `/api/health`):

```bash
docker compose up -d
```

### Publish a multi-arch image (amd64 + arm64)

Same pattern as `siymo-otp-service` (`docker buildx … --push`):

```bash
# Optionally export the (public) analytics vars first so they get baked in —
# NEXT_PUBLIC_* must be present at build time:
export NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
export NEXT_PUBLIC_POSTHOG_HOST=https://us.posthog.com

npm run docker:publish        # → registry.inadullaev.com/siymo-web:latest  (--push)
npm run docker:tag v1         # alias the just-pushed :latest as :v1
```

`docker:publish` passes `--build-arg NEXT_PUBLIC_*` through from your shell, so
unset vars simply mean analytics stays off in that image. (First time on a new
machine you may need `docker buildx create --use` to get a multi-platform
builder — Docker Desktop ships one already.)

---

## Deploying — read this first

This app keeps the sign-in session state (`pendingPhones`, `logins`) **in
memory** ([src/lib/sessionStore.ts](src/lib/sessionStore.ts)). Consequences:

- **Run exactly one long-lived process** — a VM/VPS, a single Docker container,
  or a PaaS like Railway / Render / Fly. ✅
- It is **not** multi-instance / serverless safe as-is: a visitor who starts
  sign-in on instance A can't confirm on instance B, and all sessions are lost
  on restart/redeploy. ❌
- To run on **Vercel** or behind an **autoscaler**, first move those two maps to
  Redis (the file's own comment says exactly this) — e.g. reuse the Redis that
  `siymo-otp-service` already runs.

Other production checklist items:

- Set `secure: true` on the `siymo_session` cookie once you're on HTTPS.
- In PostHog → **Project settings → Authorized URLs**, add your production
  domain so the toolbar / heatmaps work there.
- `NEXT_PUBLIC_*` set at build time; `SIYMO_OTP_API_KEY` set at runtime only.
- A process supervisor so it survives reboots (`--restart unless-stopped`, a
  systemd unit, `pm2 startup`, or the PaaS's own).
- No special networking needed: the browser OTP SDK opens a WebSocket
  **directly** to the OTP service, not through this app — the host just needs
  ordinary outbound HTTPS for the server-side API-key calls.

---

## Analytics (PostHog)

Autocaptured clicks, scroll depth and `$pageview`s, plus **session replay** and
**heatmaps**, all through PostHog. Setup:

1. Create a project at [posthog.com](https://posthog.com), copy the **Project
   API key**, put it in `.env` as `NEXT_PUBLIC_POSTHOG_KEY`, and set
   `NEXT_PUBLIC_POSTHOG_HOST` to your region's UI host (EU users also set the
   two `*_INGEST_HOST` / `*_ASSETS_HOST` vars — see `.env.example`).
2. In the PostHog project, turn on **Session Replay** and **Heatmaps**.
3. Leave the key blank to disable analytics entirely (the `.env.example`
   default) — the app no-ops cleanly.

Ingestion is reverse-proxied under `/ingest/*` (rewrites in `next.config.mjs`)
so ad-blockers don't drop the requests.

**Privacy.** `/login` collects a phone number and an OTP code, so:

- session replay **masks all `<input>` values**;
- replay is **never recorded on `/login` or `/account`** — `PostHogPageView`
  calls `stopSessionRecording()` on those routes (and `disable_session_recording`
  in `providers.tsx` catches hard loads before first paint);
- opt any element out of capture with `data-ph-no-capture`, or hard-mask its
  text with `data-ph-mask`;
- there is **no cookie-consent banner yet** — add one before serving EU/UK
  traffic (PostHog can be initialised opted-out until the visitor consents).

Wiring lives in [src/app/providers.tsx](src/app/providers.tsx) (init) and
[src/app/PostHogPageView.tsx](src/app/PostHogPageView.tsx) (pageviews + per-route
recording toggle); both are mounted from the root layout.

---

## How it's laid out

```
Dockerfile               multi-stage build (node:20-alpine) → standalone runtime
.dockerignore            keeps node_modules/.env/.next/… out of the build context
docker-compose.yml       run the published image locally / on a single host
next.config.mjs          output:'standalone', /ingest → PostHog rewrites
src/
  app/
    layout.tsx           root layout: <html>, fonts, <PostHogProvider>, <LanguageProvider>
    page.tsx             "/"        — landing (redirects to /account if signed in)
    login/page.tsx       "/login"   — sign-in (redirects to /account if signed in)
    account/page.tsx     "/account" — signed-in screen (redirects to /login if not)
    not-found.tsx        custom 404 page (logo + Lottie pulse, in your design system)
    providers.tsx        client-side PostHog init (autocapture, replay, heatmaps)
    PostHogPageView.tsx  $pageview on each route change + replay off on /login,/account
    globals.css          the styles
    api/
      start/route.ts     POST  — initiate an inbound SMS / call session
      confirm/route.ts   POST  — re-verify the verificationToken JWT, open a login cookie
      session/route.ts   GET   — current login, or 401
      logout/route.ts    POST  — drop the login
      health/route.ts    GET   — OTP service liveness passthrough
  views/                 the three page bodies (client components)
  components/             UI components (Hero, Nav, the sign-in steps, NotFoundLottie, …)
  i18n/                   cookie-backed language context + translations (default: Uzbek)
  lib/
    otpServer.ts          server-side Siymo OTP client (holds SIYMO_OTP_API_KEY)
    sessionStore.ts       in-memory pending-phone / login maps  (see "Deploying")
    auth.ts               getCurrentAccount() — reads the siymo_session cookie server-side
    apiError.ts           maps SDK errors to JSON responses
    otpApi.ts             tiny browser-side fetch client for /api/*
    lang.ts               the siymo-lang cookie helpers
```

### Auth flow

1. `/login` → enter phone → `POST /api/start` initiates an inbound SMS (or call)
   session and returns a `clientToken`. The browser SDK (`@siymo/otp-browser`)
   opens a WebSocket to the OTP service directly with that token — that traffic
   does **not** pass through this app.
2. When the OTP service emits `otp.verified` with a short-lived
   `verificationToken` JWT, the browser posts it to `POST /api/confirm`, which
   re-verifies it (pinned to the phone from step 1) and sets an httpOnly
   `siymo_session` cookie.
3. The client navigates to `/account`. That page is server-rendered: it reads
   the cookie via `getCurrentAccount()` and renders the signed-in screen — or
   redirects to `/login` if there's no valid session.

### Other notes

- **Session state** (`pendingPhones`, `logins`) is in-memory — see "Deploying"
  for what that implies and how to scale past it.
- The UI language defaults to Uzbek and is persisted in a `siymo-lang` cookie
  (not localStorage) so the server renders the right copy on the first paint;
  visitors can switch to English or Russian and the choice sticks.
