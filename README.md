# devops.gabochie.com — productized hardening service + portfolio console

Public landing (`public/`) + admin progress console (`public/app/`) + Cloudflare Functions API proxy.
Data-driven: `scripts/collect.mjs` scans local repos + GitHub → `public/data/*.json` (checked in, versioned).

## Develop

```powershell
node scripts/collect.mjs --hub "C:\Users\user\Documents\GitHub"   # regenerate public/data
npx wrangler pages dev public --port 8788                          # local parity (no Docker needed)
```

## Deploy (staging first, approval before prod)

```powershell
npx wrangler pages deploy public --project-name devops-gabochie --branch preview
# promote only after /api/health green + release checklist in docs
```

Secrets (names only): `GITHUB_TOKEN` via Pages dashboard / `wrangler secret` — never commit `.dev.vars`.
Custom domain `devops.gabochie.com`: Pages dashboard → Custom domains (DNS click, one time).
