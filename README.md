# siymo-web

The Siymo AI marketing site **and** its phone sign-in flow, as a single
[Next.js](https://nextjs.org) (App Router) app — server-rendered pages plus the
`/api/*` route handlers that hold the Siymo OTP API key. One app, one process.

## Setup

```bash
npm install
cp .env.example .env          # then put your siymo_<48-hex> key in .env
```

## Run

```bash
npm run dev                   # http://localhost:3000
```

For production:

```bash
npm run build
npm start                     # http://localhost:3000
```

`npm run lint` runs ESLint; `npm run typecheck` runs `tsc --noEmit`.

## How it's laid out

```
src/
  app/
    layout.tsx          root layout: <html>, fonts, <LanguageProvider>
    page.tsx            "/"        — landing (redirects to /account if signed in)
    login/page.tsx      "/login"   — sign-in (redirects to /account if signed in)
    account/page.tsx    "/account" — signed-in screen (redirects to /login if not)
    not-found.tsx       custom 404 page (logo + Lottie pulse, in your design system)
    globals.css         the styles
    api/
      start/route.ts    POST  — initiate an inbound SMS / call session
      confirm/route.ts  POST  — re-verify the verificationToken JWT, open a login cookie
      session/route.ts  GET   — current login, or 401
      logout/route.ts   POST  — drop the login
      health/route.ts   GET   — OTP service liveness passthrough
  views/                the three page bodies (client components)
  components/            UI components (Hero, Nav, the sign-in steps, NotFoundLottie, …)
  i18n/                  cookie-backed language context + translations (default: Uzbek)
  lib/
    otpServer.ts         server-side Siymo OTP client (holds SIYMO_OTP_API_KEY)
    sessionStore.ts      in-memory pending-phone / login maps  (see note below)
    auth.ts              getCurrentAccount() — reads the siymo_session cookie server-side
    apiError.ts          maps SDK errors to JSON responses
    otpApi.ts            tiny browser-side fetch client for /api/*
    lang.ts              the siymo-lang cookie helpers
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

### Notes

- **Env vars** are loaded by Next.js from `.env` automatically — there's no
  `dotenv` and no separate backend to start.
- **Session state** (`pendingPhones`, `logins`) is in-memory — fine for a demo
  or a single-process deployment (`next dev` / `next start`). For a
  multi-instance or serverless deployment, back it with Redis or a DB, and add
  `secure: true` to the `siymo_session` cookie behind HTTPS.
- The UI language defaults to Uzbek and is persisted in a `siymo-lang` cookie
  (not localStorage) so the server renders the right copy on the first paint;
  visitors can switch to English or Russian and the choice sticks.
