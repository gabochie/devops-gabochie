# devops.gabochie.com — productized hardening service + portfolio console

Public landing (`public/`) + client portal (`public/app/c/`) + admin progress console (`public/app/`)
+ Cloudflare Functions API (`functions/api/`).
Data-driven: `scripts/collect.mjs` scans local repos + GitHub → `public/data/*.json` (checked in, versioned).

Positioning: **global-first, Ghana as one market.** Pricing anchors in USD with a GHS equivalent.
Stack called out publicly: Next.js · **Supabase / Neon Postgres** · Cloudflare · Docker · Python.

## Develop

```powershell
node scripts/collect.mjs --hub "C:\Users\user\Documents\GitHub"   # regenerate public/data
npx wrangler pages dev public --port 8787                          # local parity (no Docker needed)
```

Local console gate needs `.dev.vars` (gitignored): `CONSOLE_TOKEN=...`, `CLIENT_SECRET=<32+>`.
Mint a client link: `CLIENT_SECRET=<secret> node scripts/mint-client-token.mjs --id demo-acme`.

## Deploy (staging first, approval before prod)

```powershell
npx wrangler pages deploy public --project-name devops-gabochie --branch preview
# promote only after /api/health green + release checklist
```

Secrets (names only, never commit `.dev.vars`):

| Secret | Used by | Notes |
| --- | --- | --- |
| `GITHUB_TOKEN` | collect/CI | repo stats |
| `BREVO_API_KEY` | `/api/lead` | email |
| `CLIENT_SECRET` | `/api/client`, `/api/deposit` | HMAC magic links |
| `PAYSTACK_SECRET_KEY`, `PAYSTACK_EMAIL` | `/api/deposit` | GHS checkout (optional) |
| `EXPRESSPAY_MERCHANT_ID` / `SECRET` / `ENV` | `/api/deposit` | GHS fallback (optional) |
| `CONSOLE_TOKEN` | `/app/*` middleware | private consoles |

## Payments

- **GHS invoices** → Paystack (`PAYSTACK_SECRET_KEY`) else ExpressPay, amount read server-side from
  `data/clients.json`. Never from the browser.
- **USD / other invoices** → Wise or Payoneer (invoice details by email), or an invoice `payUrl`
  when one is configured. `/api/deposit` returns `manual` for these instead of a checkout.
- Client portal formats any invoice currency with `Intl.NumberFormat`.

## PWA + theme

- `manifest.webmanifest` (id/start_url/display_override/shortcuts), maskable + apple icons,
  install button on public pages (custom `beforeinstallprompt` + iOS Share → Add to Home Screen hint).
- `public/sw.js`: app-shell precache, network-first navigations → `/offline.html`, never caches
  `/api/`, `/app/`, `/os/`, `/unlock/`, `/admin/`. `sw.js` and the manifest are `no-cache` in `_headers`.
- `public/theme.js` runs blocking in `<head>` (CSP is `script-src 'self'`), applies
  `localStorage.gabo_theme` or `prefers-color-scheme` before first paint; toggle persists per browser.
