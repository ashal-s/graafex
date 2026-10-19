/**
 * One-shot: convert MOV→MP4, upload public media to R2, seed Neon.
 *
 *   npx tsx --env-file=.env.local scripts/migrate-media.ts
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, extname, join, relative } from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { caseStudies, caseStudyPhotos, caseStudyReels, portfolioVideos } from "../db/schema";

const ROOT = process.cwd();
const TMP = join(ROOT, ".tmp-migrate");

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

const PUBLIC_URL = requireEnv("R2_PUBLIC_URL").replace(/\/$/, "");
const BUCKET = requireEnv("R2_BUCKET");
const ACCOUNT = requireEnv("R2_ACCOUNT_ID");

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.S3_API_ENDPOINT ?? `https://${ACCOUNT}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
    secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
  },
});

const urlMap = new Map<string, string>(); // local public path -> R2 URL

function contentType(path: string) {
  const ext = extname(path).toLowerCase();
  const map: Record<string, string> = {
    ".mp4": "video/mp4",
    ".mov": "video/quicktime",
    ".webm": "video/webm",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };
  return map[ext] ?? "application/octet-stream";
}

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function toMp4IfNeeded(absPath: string): string {
  const ext = extname(absPath).toLowerCase();
  if (ext !== ".mov") return absPath;
  mkdirSync(TMP, { recursive: true });
  const out = join(TMP, `${basename(absPath, ext)}.mp4`);
  if (existsSync(out)) return out;
  console.log(`  ffmpeg → ${relative(ROOT, out)}`);
  const result = spawnSync(
    "ffmpeg",
    ["-y", "-i", absPath, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", "-movflags", "+faststart", out],
    { stdio: "inherit" },
  );
  if (result.status !== 0) throw new Error(`ffmpeg failed for ${absPath}`);
  return out;
}

async function uploadFile(absPath: string, key: string) {
  const uploadPath = toMp4IfNeeded(absPath);
  const finalKey = key.replace(/\.mov$/i, ".mp4");
  const body = readFileSync(uploadPath);
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: finalKey,
      Body: body,
      ContentType: contentType(uploadPath),
    }),
  );
  const url = `${PUBLIC_URL}/${finalKey}`;
  console.log(`  uploaded ${finalKey}`);
  return url;
}

function publicPath(abs: string) {
  return "/" + relative(join(ROOT, "public"), abs).split("\\").join("/");
}

async function migrateFiles() {
  const videoFiles = walk(join(ROOT, "public/videos"));
  for (const abs of videoFiles) {
    const rel = relative(join(ROOT, "public/videos"), abs).split("\\").join("/");
    const key = `videos/${rel}`.replace(/\.mov$/i, ".mp4");
    const url = await uploadFile(abs, key);
    urlMap.set(publicPath(abs), url);
    if (abs.toLowerCase().endsWith(".mov")) {
      urlMap.set(publicPath(abs).replace(/\.mov$/i, ".mp4"), url);
    }
  }

  const caseFiles = walk(join(ROOT, "public/case-studies"));
  for (const abs of caseFiles) {
    const rel = relative(join(ROOT, "public/case-studies"), abs).split("\\").join("/");
    const key = `case-studies/${rel}`.replace(/\.mov$/i, ".mp4");
    const url = await uploadFile(abs, key);
    urlMap.set(publicPath(abs), url);
  }
}

function resolveUrl(localOrRemote: string | undefined): string | null {
  if (!localOrRemote) return null;
  if (localOrRemote.startsWith("http")) return localOrRemote;
  const mapped = urlMap.get(localOrRemote) ?? urlMap.get(localOrRemote.replace(/\.mov$/i, ".mp4"));
  if (!mapped) {
    console.warn(`  WARN: no R2 URL for ${localOrRemote}`);
    return localOrRemote;
  }
  return mapped;
}

async function seed() {
  const sql = neon(requireEnv("DATABASE_URL"));
  const db = drizzle(sql, { schema: { portfolioVideos, caseStudies, caseStudyReels, caseStudyPhotos } });

  const HERO = resolveUrl("/videos/hero_video.mp4")!;

  const portfolioSeed = [
    { title: "Northwind Gallery", src: resolveUrl("/videos/masjid_video.mov"), palette: ["#ff4d00", "#7a2a0a"] as [string, string], sortOrder: 0 },
    { title: "Harbour Collective", src: resolveUrl("/videos/gym_video.mov"), palette: ["#ff7a33", "#3a1208"] as [string, string], sortOrder: 1 },
    { title: "Atlas Athletics", src: resolveUrl("/videos/hijab_video.mov"), palette: ["#ff9a5c", "#4a1a08"] as [string, string], sortOrder: 2 },
    { title: "Lumen Studio", src: HERO, palette: ["#e03d00", "#2a0f06"] as [string, string], sortOrder: 3 },
    { title: "Fieldhouse", src: HERO, palette: ["#ff7a33", "#ffd9bf"] as [string, string], sortOrder: 4 },
    { title: "Meridian Health", src: HERO, palette: ["#c23a00", "#ff9a5c"] as [string, string], sortOrder: 5 },
  ];

  console.log("Seeding portfolio_videos…");
  await db.delete(portfolioVideos);
  await db.insert(portfolioVideos).values(
    portfolioSeed.map((p) => ({
      title: p.title,
      src: p.src,
      palette: p.palette,
      sortOrder: p.sortOrder,
      published: true,
    })),
  );

  const slug = "pharmaceutical-development-conference";
  const photoLocals = [
    "/case-studies/pdc/pdc_2.JPG",
    "/case-studies/pdc/pdc_3.JPG",
    "/case-studies/pdc/pdc_4.JPG",
    "/case-studies/pdc/pdc_6.JPG",
    "/case-studies/pdc/pdc_7.JPG",
    "/case-studies/pdc/pdc_8.JPG",
    "/case-studies/pdc/pdc_9.png",
    "/case-studies/pdc/pdc_1.JPG",
    "/case-studies/pdc/pdc_5.JPG",
  ];

  console.log("Seeding case_studies…");
  await db.delete(caseStudies);
  const [study] = await db
    .insert(caseStudies)
    .values({
      slug,
      name: "Pharmaceutical Development Conference",
      logo: resolveUrl("/case-studies/logo-placeholder.svg"),
      description:
        "Placeholder: a short summary of what we made for the Pharmaceutical Development Conference and why it mattered.",
      services: ["Videography", "Photography", "Graphic Design", "Content Creation"],
      year: "2026",
      video: resolveUrl("/videos/pdc_casestudy.mov")!,
      sortOrder: 0,
      published: true,
    })
    .returning({ id: caseStudies.id });

  await db.insert(caseStudyReels).values(
    [0, 1, 2, 3].map((i) => ({ caseStudyId: study.id, url: HERO, sortOrder: i })),
  );
  await db.insert(caseStudyPhotos).values(
    photoLocals.map((src, i) => ({
      caseStudyId: study.id,
      url: resolveUrl(src)!,
      alt: `Pharmaceutical Development Conference — photo ${i + 1}`,
      sortOrder: i,
    })),
  );

  console.log("Done.");
}

async function main() {
  console.log("Uploading media to R2…");
  await migrateFiles();
  await seed();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
