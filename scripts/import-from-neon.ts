/**
 * One-shot: copy CMS content from Neon Postgres → MongoDB Atlas.
 * Does not migrate auth users (seed those with `npm run seed:admin`).
 *
 * 1. Add DATABASE_URL (Neon) back to .env.local temporarily
 * 2. npm run import:neon
 * 3. Remove DATABASE_URL when done
 *
 * Refuses to run if Mongo already has portfolio/case-study docs (protects CMS
 * edits). Pass --force to wipe and re-import from Neon (overwrites CMS edits).
 */
import { neon } from "@neondatabase/serverless";
import { MongoClient, ObjectId } from "mongodb";
import { COLLECTIONS } from "../lib/db/types";

type NeonVideo = {
  id: string;
  title: string;
  src: string | null;
  poster: string | null;
  palette: [string, string] | string;
  sort_order: number;
  published: boolean;
  created_at: string | Date;
  updated_at: string | Date;
};

type NeonStudy = {
  id: string;
  slug: string;
  name: string;
  logo: string | null;
  description: string;
  services: string[] | null;
  year: string;
  video: string;
  poster: string | null;
  sort_order: number;
  published: boolean;
  created_at: string | Date;
  updated_at: string | Date;
};

type NeonReel = {
  case_study_id: string;
  url: string;
  sort_order: number;
};

type NeonPhoto = {
  case_study_id: string;
  url: string;
  alt: string | null;
  sort_order: number;
};

function asDate(value: string | Date | null | undefined) {
  if (!value) return new Date();
  return value instanceof Date ? value : new Date(value);
}

function asPalette(raw: NeonVideo["palette"]): [string, string] {
  if (Array.isArray(raw) && raw.length >= 2) {
    return [String(raw[0]), String(raw[1])];
  }
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed) && parsed.length >= 2) {
        return [String(parsed[0]), String(parsed[1])];
      }
    } catch {
      /* fall through */
    }
  }
  return ["#ff4d00", "#7a2a0a"];
}

function dbNameFromUri(uri: string) {
  try {
    const path = new URL(uri).pathname.replace(/^\//, "");
    return path.split("/")[0] || "graafex";
  } catch {
    return "graafex";
  }
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  const mongoUri = process.env.MONGODB_URI;
  if (!databaseUrl) {
    console.error("Add DATABASE_URL (Neon) to .env.local, then re-run.");
    process.exit(1);
  }
  if (!mongoUri) {
    console.error("MONGODB_URI is not set.");
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  console.log("Reading from Neon…");
  const [videos, studies, reels, photos] = (await Promise.all([
    sql`SELECT id, title, src, poster, palette, sort_order, published, created_at, updated_at
        FROM portfolio_videos
        ORDER BY sort_order ASC, title ASC`,
    sql`SELECT id, slug, name, logo, description, services, year, video, poster,
               sort_order, published, created_at, updated_at
        FROM case_studies
        ORDER BY sort_order ASC, name ASC`,
    sql`SELECT case_study_id, url, sort_order
        FROM case_study_reels
        ORDER BY sort_order ASC`,
    sql`SELECT case_study_id, url, alt, sort_order
        FROM case_study_photos
        ORDER BY sort_order ASC`,
  ])) as [NeonVideo[], NeonStudy[], NeonReel[], NeonPhoto[]];

  console.log(`  portfolio_videos: ${videos.length}`);
  console.log(`  case_studies: ${studies.length}`);
  console.log(`  case_study_reels: ${reels.length}`);
  console.log(`  case_study_photos: ${photos.length}`);

  const reelsByStudy = new Map<string, NeonReel[]>();
  for (const r of reels) {
    const list = reelsByStudy.get(r.case_study_id) ?? [];
    list.push(r);
    reelsByStudy.set(r.case_study_id, list);
  }
  const photosByStudy = new Map<string, NeonPhoto[]>();
  for (const p of photos) {
    const list = photosByStudy.get(p.case_study_id) ?? [];
    list.push(p);
    photosByStudy.set(p.case_study_id, list);
  }

  const videoDocs = videos.map((v) => ({
    _id: new ObjectId(),
    title: v.title,
    src: v.src,
    poster: v.poster,
    palette: asPalette(v.palette),
    sortOrder: Number(v.sort_order) || 0,
    published: Boolean(v.published),
    createdAt: asDate(v.created_at),
    updatedAt: asDate(v.updated_at),
    neonId: v.id,
  }));

  const studyDocs = studies.map((s) => {
    const studyReels = (reelsByStudy.get(s.id) ?? []).map((r) => ({
      url: r.url,
      sortOrder: Number(r.sort_order) || 0,
    }));
    const studyPhotos = (photosByStudy.get(s.id) ?? []).map((p) => ({
      url: p.url,
      alt: p.alt,
      sortOrder: Number(p.sort_order) || 0,
    }));
    return {
      _id: new ObjectId(),
      slug: s.slug,
      name: s.name,
      logo: s.logo,
      description: s.description,
      services: s.services ?? [],
      year: s.year,
      video: s.video,
      poster: s.poster,
      reels: studyReels,
      photos: studyPhotos,
      sortOrder: Number(s.sort_order) || 0,
      published: Boolean(s.published),
      createdAt: asDate(s.created_at),
      updatedAt: asDate(s.updated_at),
      neonId: s.id,
    };
  });

  const force = process.argv.includes("--force");
  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db(dbNameFromUri(mongoUri));

  const existingVideos = await db.collection(COLLECTIONS.portfolioVideos).countDocuments();
  const existingStudies = await db.collection(COLLECTIONS.caseStudies).countDocuments();
  if ((existingVideos > 0 || existingStudies > 0) && !force) {
    console.error(
      `Mongo already has ${existingVideos} video(s) and ${existingStudies} case study(ies).`,
    );
    console.error(
      "Refusing to wipe CMS content. Re-run with --force only if you intend to overwrite edits made in /admin.",
    );
    await client.close();
    process.exit(1);
  }

  console.log(`Writing to MongoDB (${db.databaseName})…`);
  if (force && (existingVideos > 0 || existingStudies > 0)) {
    console.warn("--force: clearing existing CMS documents before import.");
  }
  await db.collection(COLLECTIONS.portfolioVideos).deleteMany({});
  await db.collection(COLLECTIONS.caseStudies).deleteMany({});

  if (videoDocs.length) {
    await db.collection(COLLECTIONS.portfolioVideos).insertMany(videoDocs);
  }
  if (studyDocs.length) {
    await db.collection(COLLECTIONS.caseStudies).insertMany(studyDocs);
  }
  await db
    .collection(COLLECTIONS.caseStudies)
    .createIndex({ slug: 1 }, { unique: true });

  console.log("Done.");
  console.log(`  ${COLLECTIONS.portfolioVideos}: ${videoDocs.length}`);
  console.log(`  ${COLLECTIONS.caseStudies}: ${studyDocs.length}`);
  console.log("You can remove DATABASE_URL from .env.local now.");
  console.log("Auth users are not imported — run: npm run seed:admin");

  await client.close();
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
