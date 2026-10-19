# Graafex

Marketing site for **Graafex**, a creative studio focused on strategy, design, and film.

Built with [Next.js](https://nextjs.org) (App Router), React, and Tailwind CSS.

## Pages

| Route | Description |
| ----- | ----------- |
| `/` | Home — video hero with scroll-driven intro |
| `/about` | Studio story, services, and team |
| `/portfolio` | Hover-play film grid, clients and case study cards |
| `/portfolio/<slug>` | A case study (hero film, reels, photos) |
| `/admin` | CMS for portfolio films and case studies (Neon Auth) |

Site copy, nav, services, and contact details live in [`lib/content.ts`](lib/content.ts). Portfolio films and case studies are stored in **Neon** (metadata) with media on **Cloudflare R2**.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
| ------ | ------- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run db:push` | Push Drizzle schema to Neon |
| `npm run media:migrate` | Upload `public/` media to R2 and seed Neon |

Copy [`.env.example`](.env.example) to `.env.local` and fill Neon + R2 values.

## Stack

- **Next.js 16** — App Router, `next/font` (Syne)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript**
- **Neon** — Postgres + Managed Better Auth
- **Cloudflare R2** — media storage

Team photos still live under `public/team/`. Prefer MP4 for video (browsers do not reliably play `.mov`).

## Admin / case studies

1. Create an admin user at `/auth/sign-up` (optionally set `ADMIN_EMAIL_ALLOWLIST`).
2. Sign in at `/auth/sign-in`, then use `/admin` to manage portfolio tiles and case studies.
3. Uploads go to R2; public pages read from Neon with short cache revalidation.

## Deploy

Deploy on [Vercel](https://vercel.com). Add the same env vars as `.env.local`, and in the Neon Auth console add your production domain to trusted origins.
