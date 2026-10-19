import { asc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { getDb } from "@/db";
import { caseStudies, caseStudyPhotos, caseStudyReels } from "@/db/schema";
import type { CaseStudy } from "./types";

export const CASE_STUDIES_TAG = "case-studies";

async function fetchCaseStudies(): Promise<CaseStudy[]> {
  const db = getDb();
  const rows = await db
    .select()
    .from(caseStudies)
    .where(eq(caseStudies.published, true))
    .orderBy(asc(caseStudies.sortOrder), asc(caseStudies.name));

  if (rows.length === 0) return [];

  const ids = rows.map((r) => r.id);
  const [reels, photos] = await Promise.all([
    db.select().from(caseStudyReels).orderBy(asc(caseStudyReels.sortOrder)),
    db.select().from(caseStudyPhotos).orderBy(asc(caseStudyPhotos.sortOrder)),
  ]);

  const reelsByStudy = new Map<string, string[]>();
  const photosByStudy = new Map<string, string[]>();

  for (const r of reels) {
    if (!ids.includes(r.caseStudyId)) continue;
    const list = reelsByStudy.get(r.caseStudyId) ?? [];
    list.push(r.url);
    reelsByStudy.set(r.caseStudyId, list);
  }
  for (const p of photos) {
    if (!ids.includes(p.caseStudyId)) continue;
    const list = photosByStudy.get(p.caseStudyId) ?? [];
    list.push(p.url);
    photosByStudy.set(p.caseStudyId, list);
  }

  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    logo: r.logo ?? undefined,
    description: r.description,
    services: r.services ?? [],
    year: r.year,
    video: r.video,
    poster: r.poster ?? undefined,
    reels: reelsByStudy.get(r.id) ?? [],
    photos: photosByStudy.get(r.id) ?? [],
  }));
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return unstable_cache(fetchCaseStudies, ["case-studies-list"], {
    tags: [CASE_STUDIES_TAG],
    revalidate: 60,
  })();
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const all = await getCaseStudies();
  return all.find((s) => s.slug === slug) ?? null;
}

/** Uncached — for admin. */
export async function listAllCaseStudies() {
  const db = getDb();
  return db.select().from(caseStudies).orderBy(asc(caseStudies.sortOrder), asc(caseStudies.name));
}
