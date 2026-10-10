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

## Adding a case study

Case studies are data-driven. Add one object to `entries` in `lib/case-studies.ts`:

```ts
{
  name: "Project name",
  description: "Short summary shown under the video.",
  services: ["Videography", "Content Creation"],
  year: "2025",
  video: "/case-studies/project/hero.mp4",       // hero video (file in /public or an https link)
  reels: ["/case-studies/project/reel-1.mp4"],   // vertical 9:16 videos
  photos: ["/case-studies/project/photo-1.jpg"], // each keeps its own aspect ratio
}
```

It appears as a card on `/portfolio` and gets its own page at `/portfolio/<slug>` (the slug defaults to the name). Reels and photos are optional; an empty list hides that section.

## Deploy

Deploy on [Vercel](https://vercel.com) — connect the repo and use the default Next.js settings.
