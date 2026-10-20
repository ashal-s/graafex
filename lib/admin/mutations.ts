import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { getDb } from "@/lib/db/mongo";
import {
  COLLECTIONS,
  type CaseStudyDoc,
  type ClientLogoDoc,
  type PortfolioVideoDoc,
} from "@/lib/db/types";
import { CASE_STUDIES_TAG } from "@/lib/data/case-studies";
import { CLIENT_LOGOS_TAG } from "@/lib/data/client-logos";
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

export async function upsertPortfolioVideo(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const src = String(formData.get("src") ?? "").trim() || null;
  const poster =
    String(formData.get("thumbnail") ?? formData.get("poster") ?? "").trim() || null;
  const paletteA = String(formData.get("paletteA") ?? "#ff4d00");
  const paletteB = String(formData.get("paletteB") ?? "#7a2a0a");
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;
  const published = formData.get("published") === "on";

  if (!title) throw new Error("Title is required");

  const col = getDb().collection<PortfolioVideoDoc>(COLLECTIONS.portfolioVideos);
  const now = new Date();
  const values = {
    title,
    src,
    poster,
    palette: [paletteA, paletteB] as [string, string],
    sortOrder,
    published,
    updatedAt: now,
  };

  if (id) {
    if (!ObjectId.isValid(id)) throw new Error("Invalid video id");
    await col.updateOne({ _id: new ObjectId(id) }, { $set: values });
  } else {
    await col.insertOne({
      _id: new ObjectId(),
      ...values,
      createdAt: now,
    } as PortfolioVideoDoc);
  }

  revalidateTag(PORTFOLIO_TAG, "max");
}

export async function upsertCaseStudy(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim() || slugify(name);
  const logo = String(formData.get("logo") ?? "").trim() || null;
  const description = String(formData.get("description") ?? "").trim();
  const services = parseServices(String(formData.get("services") ?? ""));
  const year = String(formData.get("year") ?? "").trim();
  const video = String(formData.get("video") ?? "").trim();
  const poster =
    String(formData.get("thumbnail") ?? formData.get("poster") ?? "").trim() || null;
  const reelUrls = parseLines(String(formData.get("reels") ?? ""));
  const photoUrls = parseLines(String(formData.get("photos") ?? ""));
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;
  const published = formData.get("published") === "on";

  if (!name || !description || !year || !video) {
    throw new Error("Name, description, year, and video are required");
  }

  const reels = reelUrls.map((url, i) => ({ url, sortOrder: i }));
  const photos = photoUrls.map((url, i) => ({
    url,
    alt: `${name} — photo ${i + 1}`,
    sortOrder: i,
  }));

  const col = getDb().collection<CaseStudyDoc>(COLLECTIONS.caseStudies);
  const now = new Date();
  const values = {
    slug,
    name,
    logo,
    description,
    services,
    year,
    video,
    poster,
    reels,
    photos,
    sortOrder,
    published,
    updatedAt: now,
  };

  if (id) {
    if (!ObjectId.isValid(id)) throw new Error("Invalid case study id");
    await col.updateOne({ _id: new ObjectId(id) }, { $set: values });
  } else {
    await col.insertOne({
      _id: new ObjectId(),
      ...values,
      createdAt: now,
    } as CaseStudyDoc);
  }

  revalidateTag(CASE_STUDIES_TAG, "max");
}

export async function upsertClientLogo(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim() || null;
  const sortOrder = Number(formData.get("sortOrder") ?? 0) || 0;
  const published = formData.get("published") === "on";

  if (!name) throw new Error("Name is required");
  if (!image) throw new Error("Logo image is required");

  const col = getDb().collection<ClientLogoDoc>(COLLECTIONS.clientLogos);
  const now = new Date();
  const values = {
    name,
    image,
    sortOrder,
    published,
    updatedAt: now,
  };

  if (id) {
    if (!ObjectId.isValid(id)) throw new Error("Invalid logo id");
    await col.updateOne({ _id: new ObjectId(id) }, { $set: values });
  } else {
    await col.insertOne({
      _id: new ObjectId(),
      ...values,
      createdAt: now,
    } as ClientLogoDoc);
  }

  revalidateTag(CLIENT_LOGOS_TAG, "max");
}

export async function deletePortfolioVideoById(id: string) {
  if (!ObjectId.isValid(id)) return;
  await getDb()
    .collection(COLLECTIONS.portfolioVideos)
    .deleteOne({ _id: new ObjectId(id) });
  revalidateTag(PORTFOLIO_TAG, "max");
}

export async function deleteCaseStudyById(id: string) {
  if (!ObjectId.isValid(id)) return;
  await getDb()
    .collection(COLLECTIONS.caseStudies)
    .deleteOne({ _id: new ObjectId(id) });
  revalidateTag(CASE_STUDIES_TAG, "max");
}

export async function deleteClientLogoById(id: string) {
  if (!ObjectId.isValid(id)) return;
  await getDb()
    .collection(COLLECTIONS.clientLogos)
    .deleteOne({ _id: new ObjectId(id) });
  revalidateTag(CLIENT_LOGOS_TAG, "max");
}
