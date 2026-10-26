# Aniori

[![CI](https://github.com/madkitzune/Aniori/actions/workflows/ci.yml/badge.svg)](https://github.com/madkitzune/Aniori/actions/workflows/ci.yml)

Anime streaming web app: catalog with search and filters, video player with seasons and quality switch, watch history and customizable user profiles.

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS
- Supabase Auth
- hls.js for video playback
- Docker, GitHub Actions, Vercel

## Run locally

```bash
npm ci
cp .env.local.example .env.local   # fill in the values
npm run dev
```

Open http://localhost:3000.

Without Supabase keys the site runs in guest mode: the catalog and the player work, sign-in and sign-up are disabled.

## Environment variables

| Variable | When it is read | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | build time | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | build time | Supabase public anon key |
| `KODIK_TOKEN` | runtime, server only | Kodik API token for episode search |

## Docker

The image uses Next.js standalone output and runs as a non-root user.

```bash
docker build -t aniori \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key> .
docker run -p 3000:3000 -e KODIK_TOKEN=<token> aniori
```

## CI/CD

- GitHub Actions runs on every push to `main` and on every pull request: lint, production build, then a Docker image build with a smoke test that starts the container and requests `/catalog`.
- Vercel deploys `main` automatically.

## Project structure

```
app/          pages and route handlers (catalog, watch, profile, auth, API proxies)
components/   UI components
lib/          anime data, utilities, Supabase clients
proxy.ts      session refresh and protected routes
```
