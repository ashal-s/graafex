"use server";

import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { caseStudies, portfolioVideos } from "@/db/schema";
import { requireAdmin } from "@/lib/admin/session";
import { CASE_STUDIES_TAG } from "@/lib/data/case-studies";
import { PORTFOLIO_TAG } from "@/lib/data/portfolio";

export async function deletePortfolioVideo(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await getDb().delete(portfolioVideos).where(eq(portfolioVideos.id, id));
  revalidateTag(PORTFOLIO_TAG, "max");
  redirect("/admin/portfolio");
}

export async function deleteCaseStudy(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await getDb().delete(caseStudies).where(eq(caseStudies.id, id));
  revalidateTag(CASE_STUDIES_TAG, "max");
  redirect("/admin/case-studies");
}
