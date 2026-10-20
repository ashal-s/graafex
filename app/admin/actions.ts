"use server";

import { redirect } from "next/navigation";
import {
  deleteCaseStudyById,
  deletePortfolioVideoById,
} from "@/lib/admin/mutations";
import { requireAdmin } from "@/lib/admin/session";

export async function deletePortfolioVideo(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deletePortfolioVideoById(id);
  redirect("/admin/portfolio");
}

export async function deleteCaseStudy(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deleteCaseStudyById(id);
  redirect("/admin/case-studies");
}
