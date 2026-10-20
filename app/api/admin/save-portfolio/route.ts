import { NextResponse } from "next/server";
import { upsertPortfolioVideo } from "@/lib/admin/mutations";
import { verifySaveToken } from "@/lib/admin/save-token";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const token = String(formData.get("saveToken") ?? "");
  const session = verifySaveToken(token);
  if (!session) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url), 303);
  }

  try {
    await upsertPortfolioVideo(formData);
  } catch (err) {
    console.error("[admin] save-portfolio failed", err);
    return NextResponse.redirect(
      new URL("/admin/portfolio?error=save", request.url),
      303,
    );
  }

  return NextResponse.redirect(new URL("/admin", request.url), 303);
}
