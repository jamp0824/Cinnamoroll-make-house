# Cinnamoroll House Builder

A cute, kid-friendly mini game built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Auto deploy to Vercel on `main` push (GitHub Actions)

This repository includes `.github/workflows/vercel-deploy.yml`.
When a commit is pushed to `main`, GitHub Actions builds and deploys to Vercel production.

### 1) Create required GitHub repository secrets

In GitHub repo settings, add these secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### 2) Get Vercel values

- `VERCEL_TOKEN`: Vercel account settings → Tokens
- `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`:
  - Option A: from Vercel project settings
  - Option B: run `vercel link` locally and read `.vercel/project.json`

### 3) Push to `main`

```bash
git checkout main
git push origin main
```

The action will run automatically and deploy production.

## Manual production deploy (optional)

```bash
npx vercel pull --yes --environment=production
npx vercel build --prod
npx vercel deploy --prebuilt --prod
```

## Vercel deployment troubleshooting

- If Vercel blocks deployment with `Error: Vulnerable version of Next.js detected`, upgrade `next` to a patched version listed by the Next.js security advisory (for CVE-2025-66478).
- This repository is pinned to `next@15.5.7`, which is one of the documented fixed versions.
- If logs still show an older version (such as `15.1.6`), verify the Vercel project is deploying the latest `main` commit SHA.
- Build telemetry is disabled in CI via `NEXT_TELEMETRY_DISABLED=1` to keep logs focused on build/deploy outcomes.
