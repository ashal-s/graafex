/** Shared shapes used by public pages and admin (matches previous static content). */

export type CaseStudy = {
  id?: string;
  slug: string;
  name: string;
  logo?: string;
  description: string;
  services: string[];
  year: string;
  video: string;
  poster?: string;
  reels: string[];
  photos: string[];
};

export type PortfolioVideo = {
  id?: string;
  title: string;
  src?: string;
  poster?: string;
  palette: [string, string];
};

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
