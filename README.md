# Graafex

Marketing site for **Graafex**, a creative studio focused on strategy, design, and film.

Built with [Next.js](https://nextjs.org) (App Router), React, and Tailwind CSS.

## Pages

| Route | Description |
| ----- | ----------- |
| `/` | Home — video hero with scroll-driven intro |
| `/about` | Studio story, services, and team |
| `/extras` | Portfolio / additional work |

Site copy, nav, services, and contact details live in [`lib/content.ts`](lib/content.ts). Much of it is still placeholder — swap in real Graafex content there.

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

## Stack

- **Next.js 16** — App Router, `next/font` (Syne)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript**

Hero video assets live under `public/videos/` (MP4 for playback; browsers do not reliably play `.mov`). Team photos are under `public/team/`.

## Deploy

Deploy on [Vercel](https://vercel.com) — connect the repo and use the default Next.js settings.
