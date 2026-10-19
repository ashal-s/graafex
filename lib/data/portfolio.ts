import { asc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { getDb } from "@/db";
import { portfolioVideos } from "@/db/schema";
import type { PortfolioVideo } from "./types";

export const PORTFOLIO_TAG = "portfolio-videos";

async function fetchPortfolioVideos(): Promise<PortfolioVideo[]> {
  const db = getDb();
  const rows = await db
    .select()
    .from(portfolioVideos)
    .where(eq(portfolioVideos.published, true))
    .orderBy(asc(portfolioVideos.sortOrder), asc(portfolioVideos.title));

  return rows.map((r) => ({
    id: r.id,
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
export async function listAllPortfolioVideos() {
  const db = getDb();
  return db.select().from(portfolioVideos).orderBy(asc(portfolioVideos.sortOrder), asc(portfolioVideos.title));
}
