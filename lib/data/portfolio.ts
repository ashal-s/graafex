import { unstable_cache } from "next/cache";
import { getDb } from "@/lib/db/mongo";
import { COLLECTIONS, type PortfolioVideoDoc } from "@/lib/db/types";
import type { PortfolioVideo } from "./types";

export const PORTFOLIO_TAG = "portfolio-videos";

export type AdminPortfolioVideo = {
  id: string;
  title: string;
  src: string | null;
  poster: string | null;
  palette: [string, string];
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

function toAdmin(doc: PortfolioVideoDoc): AdminPortfolioVideo {
  return {
    id: doc._id.toHexString(),
    title: doc.title,
    src: doc.src,
    poster: doc.poster,
    palette: doc.palette,
    sortOrder: doc.sortOrder,
    published: doc.published,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

async function fetchPortfolioVideos(): Promise<PortfolioVideo[]> {
  const rows = await getDb()
    .collection<PortfolioVideoDoc>(COLLECTIONS.portfolioVideos)
    .find({ published: true })
    .sort({ sortOrder: 1, title: 1 })
    .toArray();

  return rows.map((r) => ({
    id: r._id.toHexString(),
    title: r.title,
    src: r.src ?? undefined,
    poster: r.poster ?? undefined,
    palette: r.palette,
  }));
}

export async function getPortfolioVideos(): Promise<PortfolioVideo[]> {
  return unstable_cache(fetchPortfolioVideos, ["portfolio-videos-list"], {
    tags: [PORTFOLIO_TAG],
    revalidate: 60,
  })();
}

/** Uncached — for admin. */
export async function listAllPortfolioVideos(): Promise<AdminPortfolioVideo[]> {
  const rows = await getDb()
    .collection<PortfolioVideoDoc>(COLLECTIONS.portfolioVideos)
    .find({})
    .sort({ sortOrder: 1, title: 1 })
    .toArray();
  return rows.map(toAdmin);
}

export async function getPortfolioVideoById(
  id: string,
): Promise<AdminPortfolioVideo | null> {
  const { ObjectId } = await import("mongodb");
  if (!ObjectId.isValid(id)) return null;
  const doc = await getDb()
    .collection<PortfolioVideoDoc>(COLLECTIONS.portfolioVideos)
    .findOne({ _id: new ObjectId(id) });
  return doc ? toAdmin(doc) : null;
}
