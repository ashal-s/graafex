import { NextResponse } from "next/server";
import { upsertClientLogo } from "@/lib/admin/mutations";
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
    await upsertClientLogo(formData);
  } catch (err) {
    console.error("[admin] save-client-logo failed", err);
    return NextResponse.redirect(
      new URL("/admin/clients?error=save", request.url),
      303,
    );
  }

  return NextResponse.redirect(new URL("/admin/clients", request.url), 303);
}
