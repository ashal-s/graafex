"use server";

import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { getDb } from "@/db";
import { caseStudies, caseStudyPhotos, caseStudyReels, portfolioVideos } from "@/db/schema";
import { requireAdmin } from "@/lib/admin/session";
import { CASE_STUDIES_TAG } from "@/lib/data/case-studies";
import { PORTFOLIO_TAG } from "@/lib/data/portfolio";
import { slugify } from "@/lib/data/types";

function parseServices(raw: string) {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseLines(raw: string) {
  return raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function savePortfolioVideo(formData: FormData) {
  await requireAdmin();
  const db = getDb();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const src = String(formData.get("src") ?? "").trim() || null;
  const poster = String(formData.get("poster") ?? "").trim() || null;
  const paletteA = String(formData.get("paletteA") ?? "#ff4d00");
  const paletteB = String(formData.get("paletteB") ?? "#7a2a0a");
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;
  const published = formData.get("published") === "on";

  if (!title) throw new Error("Title is required");

  const values = {
    title,
    src,
    poster,
    palette: [paletteA, paletteB] as [string, string],
    sortOrder,
    published,
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(portfolioVideos).set(values).where(eq(portfolioVideos.id, id));
  } else {
    await db.insert(portfolioVideos).values(values);
  }

  revalidateTag(PORTFOLIO_TAG, "max");
}

export async function deletePortfolioVideo(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await getDb().delete(portfolioVideos).where(eq(portfolioVideos.id, id));
  revalidateTag(PORTFOLIO_TAG, "max");
}

export async function saveCaseStudy(formData: FormData) {
  await requireAdmin();
  const db = getDb();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim() || slugify(name);
  const logo = String(formData.get("logo") ?? "").trim() || null;
  const description = String(formData.get("description") ?? "").trim();
  const services = parseServices(String(formData.get("services") ?? ""));
  const year = String(formData.get("year") ?? "").trim();
  const video = String(formData.get("video") ?? "").trim();
  const poster = String(formData.get("poster") ?? "").trim() || null;
  const reels = parseLines(String(formData.get("reels") ?? ""));
  const photos = parseLines(String(formData.get("photos") ?? ""));
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;
  const published = formData.get("published") === "on";

  if (!name || !description || !year || !video) {
    throw new Error("Name, description, year, and video are required");
  }

  const studyValues = {
    slug,
    name,
    logo,
    description,
    services,
    year,
    video,
    poster,
    sortOrder,
    published,
    updatedAt: new Date(),
  };

  let studyId = id;
  if (id) {
    await db.update(caseStudies).set(studyValues).where(eq(caseStudies.id, id));
    await db.delete(caseStudyReels).where(eq(caseStudyReels.caseStudyId, id));
    await db.delete(caseStudyPhotos).where(eq(caseStudyPhotos.caseStudyId, id));
  } else {
    const [row] = await db.insert(caseStudies).values(studyValues).returning({ id: caseStudies.id });
    studyId = row.id;
  }

  if (reels.length) {
    await db.insert(caseStudyReels).values(
      reels.map((url, i) => ({ caseStudyId: studyId, url, sortOrder: i })),
    );
  }
  if (photos.length) {
    await db.insert(caseStudyPhotos).values(
      photos.map((url, i) => ({
        caseStudyId: studyId,
        url,
        alt: `${name} — photo ${i + 1}`,
        sortOrder: i,
      })),
    );
  }

  revalidateTag(CASE_STUDIES_TAG, "max");
}

export async function deleteCaseStudy(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await getDb().delete(caseStudies).where(eq(caseStudies.id, id));
  revalidateTag(CASE_STUDIES_TAG, "max");
}
