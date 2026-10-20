import { unstable_cache } from "next/cache";
import { getDb } from "@/lib/db/mongo";
import { COLLECTIONS, type CaseStudyDoc } from "@/lib/db/types";
import type { CaseStudy } from "./types";

export const CASE_STUDIES_TAG = "case-studies";

export type AdminCaseStudy = {
  id: string;
  slug: string;
  name: string;
  logo: string | null;
  description: string;
  services: string[];
  year: string;
  video: string;
  poster: string | null;
  reels: { url: string; sortOrder: number }[];
  photos: { url: string; alt?: string | null; sortOrder: number }[];
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

function toPublic(doc: CaseStudyDoc): CaseStudy {
  return {
    id: doc._id.toHexString(),
    slug: doc.slug,
    name: doc.name,
    logo: doc.logo ?? undefined,
    description: doc.description,
    services: doc.services ?? [],
    year: doc.year,
    video: doc.video,
    poster: doc.poster ?? undefined,
    reels: [...(doc.reels ?? [])]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((r) => r.url),
    photos: [...(doc.photos ?? [])]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((p) => p.url),
  };
}

function toAdmin(doc: CaseStudyDoc): AdminCaseStudy {
  return {
    id: doc._id.toHexString(),
    slug: doc.slug,
    name: doc.name,
    logo: doc.logo,
    description: doc.description,
    services: doc.services ?? [],
    year: doc.year,
    video: doc.video,
    poster: doc.poster,
    reels: [...(doc.reels ?? [])].sort((a, b) => a.sortOrder - b.sortOrder),
    photos: [...(doc.photos ?? [])].sort((a, b) => a.sortOrder - b.sortOrder),
    sortOrder: doc.sortOrder,
    published: doc.published,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

async function fetchCaseStudies(): Promise<CaseStudy[]> {
  const rows = await getDb()
    .collection<CaseStudyDoc>(COLLECTIONS.caseStudies)
    .find({ published: true })
    .sort({ sortOrder: 1, name: 1 })
    .toArray();

  return rows.map(toPublic);
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
export async function listAllCaseStudies(): Promise<AdminCaseStudy[]> {
  const rows = await getDb()
    .collection<CaseStudyDoc>(COLLECTIONS.caseStudies)
    .find({})
    .sort({ sortOrder: 1, name: 1 })
    .toArray();
  return rows.map(toAdmin);
}

export async function getCaseStudyById(id: string): Promise<AdminCaseStudy | null> {
  const { ObjectId } = await import("mongodb");
  if (!ObjectId.isValid(id)) return null;
  const doc = await getDb()
    .collection<CaseStudyDoc>(COLLECTIONS.caseStudies)
    .findOne({ _id: new ObjectId(id) });
  return doc ? toAdmin(doc) : null;
}
