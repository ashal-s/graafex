# Studiofex

Marketing site for **Studiofex**, a creative studio focused on strategy, design, and film.

Built with [Next.js](https://nextjs.org) (App Router), React, and Tailwind CSS.

## Pages

| Route | Description |
| ----- | ----------- |
| `/` | Home — video hero with scroll-driven intro |
| `/about` | Studio story, services, and team |
| `/portfolio` | Hover-play film grid, clients and case study cards |
| `/portfolio/<slug>` | A case study (hero film, reels, photos) |
| `/admin` | CMS for portfolio films and case studies (Better Auth) |

Site copy, nav, services, and contact details live in [`lib/content.ts`](lib/content.ts). Portfolio films and case studies are stored in **MongoDB Atlas** (metadata) with media on **Cloudflare R2**.

Repo: [github.com/ashal-s/studiofex](https://github.com/ashal-s/studiofex). The Atlas database and R2 bucket still use the legacy `graafex` names so existing content keeps loading — rename those in Atlas/Cloudflare only when you are ready to migrate.

## Getting started

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
| ------ | ------- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run seed:admin` | Create the first admin user |
| `npm run import:neon` | One-shot: copy CMS rows from Neon → Mongo (`DATABASE_URL` required) |

Copy [`.env.example`](.env.example) to `.env.local` and fill MongoDB, Better Auth, and R2 values.

## Stack

- **Next.js 16** — App Router, `next/font` (Syne)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript**
- **MongoDB Atlas** — CMS + Better Auth data
- **Better Auth** — email/password admin auth
- **Cloudflare R2** — media storage

Team photos still live under `public/team/`. Prefer MP4 for video (browsers do not reliably play `.mov`).

## Admin

1. Seed the first admin:
   ```bash
   SEED_ADMIN_EMAIL=you@example.com SEED_ADMIN_PASSWORD='your-password' npm run seed:admin
   ```
2. Sign in at `/auth/sign-in`, then use `/admin` to manage portfolio tiles, case studies, and users.
3. Further accounts are invite-only via `/admin/users` (public sign-up is disabled).
4. Uploads go to R2; public pages read from MongoDB with short cache revalidation.

## Deploy

Deploy on [Vercel](https://vercel.com). Add the same env vars as `.env.local` (`MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` for production, and R2). Leave `BETTER_AUTH_URL` unset on Preview so Better Auth infers the deployment URL.
