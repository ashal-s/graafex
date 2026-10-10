/**
 * CASE STUDIES
 *
 * Add one object to `entries` per project. The portfolio page lists every entry
 * as a card, and each one gets its own page at /portfolio/<slug> built from the
 * template (hero video, name, description, services, year, reels, photos).
 *
 *   name         Project name, shown under the hero video and on the portfolio card.
 *   logo         Optional client logo (file in /public or link). Shown on a light tile
 *                above the name so any logo stays legible. SVG or PNG works best.
 *   description  Short summary shown under the video.
 *   services     List of services, e.g. ["Videography", "Content Creation"].
 *   year         e.g. "2025".
 *   video        Hero video: a file in /public (e.g. "/case-studies/acme/hero.mp4")
 *                or a direct https link to an MP4.
 *   poster       Optional still shown before the video loads.
 *   reels        Vertical reels (9:16): list of video file paths or links. Four fit
 *                the row; leave empty to hide the section.
 *   photos       Photography / graphic design: list of image paths or links. Each
 *                keeps its own aspect ratio. Leave empty to hide the section.
 *   slug         Optional URL override. Defaults to the name, e.g.
 *                "Pharmaceutical Development Conference" -> "pharmaceutical-development-conference".
 *
 * Files in /public are served from the site root (public/a/b.mp4 -> "/a/b.mp4").
 * Photo sizes are read from local files at build time so there is no layout jump;
 * remote links work too but load at their natural size once downloaded.
 */
export type CaseStudyInput = {
  name: string;
  logo?: string;
  description: string;
  services: string[];
  year: string;
  video: string;
  poster?: string;
  reels: string[];
  photos: string[];
  slug?: string;
};

export type CaseStudy = CaseStudyInput & { slug: string };

// Temporary media — every slot uses the hero video / thumbnail until real files are supplied.
const HERO_VIDEO = "/videos/hero_video.mp4";
const HERO_THUMB = "/videos/hero-poster.jpg";

const entries: CaseStudyInput[] = [
  {
    name: "Pharmaceutical Development Conference",
    logo: "/case-studies/logo-placeholder.svg",
    description:
      "Placeholder: a short summary of what we made for the Pharmaceutical Development Conference and why it mattered.",
    services: ["Videography", "Photography", "Graphic Design", "Content Creation"],
    year: "2026",
    video: HERO_VIDEO,
    reels: [HERO_VIDEO, HERO_VIDEO, HERO_VIDEO, HERO_VIDEO],
    photos: Array.from({ length: 10 }, () => HERO_THUMB),
  },
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const caseStudies: CaseStudy[] = entries.map((e) => ({ ...e, slug: e.slug ?? slugify(e.name) }));

const seen = new Set<string>();
for (const s of caseStudies) {
  if (!s.slug || seen.has(s.slug)) {
    throw new Error(`Case study "${s.name}" has an empty or duplicate slug "${s.slug}". Set a unique \`slug\`.`);
  }
  seen.add(s.slug);
}
