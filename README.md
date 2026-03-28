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
