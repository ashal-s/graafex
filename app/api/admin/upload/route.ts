import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/session";
import { uploadToR2 } from "@/lib/r2";

export const runtime = "nodejs";

function sanitizeKeyPart(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9._/-]+/g, "-")
    .replace(/\/+/g, "/")
    .replace(/^\/|\/$/g, "");
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const folder = String(form.get("folder") ?? "uploads");
  const filename = String(form.get("filename") ?? "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const safeFolder = sanitizeKeyPart(folder) || "uploads";
  const original = filename || file.name || "upload.bin";
  const safeName = sanitizeKeyPart(original) || `file-${Date.now()}`;
  const key = `${safeFolder}/${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const contentType = file.type || "application/octet-stream";

  try {
    const url = await uploadToR2({ key, body: buffer, contentType });
    return NextResponse.json({ url, key });
  } catch (err) {
    console.error("R2 upload failed", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
