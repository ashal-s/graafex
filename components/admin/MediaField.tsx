"use client";

import { useState } from "react";

function isVideo(url: string) {
  return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url) || url.includes("/videos/") || url.includes("/reels/") || url.includes("/hero");
}

function isImage(url: string) {
  return /\.(jpe?g|png|gif|webp|svg|avif)(\?|$)/i.test(url);
}

export default function MediaField({
  name,
  label,
  folder,
  defaultValue = "",
  accept = "*/*",
  kind = "auto",
}: {
  name: string;
  label: string;
  folder: string;
  defaultValue?: string;
  accept?: string;
  /** Force preview type when URL has no extension. */
  kind?: "auto" | "image" | "video";
}) {
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showVideo = value && (kind === "video" || (kind === "auto" && isVideo(value) && !isImage(value)));
  const showImage = value && (kind === "image" || (kind === "auto" && isImage(value)) || (kind === "auto" && !showVideo));

  async function onFile(file: File | null) {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const body = new FormData();
      body.set("file", file);
      body.set("folder", folder);
      body.set("filename", file.name);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Upload failed");
      setValue(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-2 text-sm text-body">
      <span className="font-medium text-heading">{label}</span>
      <input type="hidden" name={name} value={value} />

      {value ? (
        <div className="relative overflow-hidden rounded-[var(--radius-small)] border border-line bg-bg">
          {showVideo ? (
            <video src={value} controls playsInline className="max-h-56 w-full bg-black object-contain" />
          ) : showImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="max-h-56 w-full object-contain" />
          ) : (
            <p className="break-all p-3 font-mono text-xs">{value}</p>
          )}
          <div className="flex items-center justify-between gap-2 border-t border-line px-3 py-2">
            <span className="truncate font-mono text-[11px] text-body">{value}</span>
            <button
              type="button"
              onClick={() => setValue("")}
              className="shrink-0 text-xs text-accent underline"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="flex min-h-28 items-center justify-center rounded-[var(--radius-small)] border border-dashed border-line bg-bg px-4 py-6 text-center text-xs text-body">
          No media yet — upload a file below
        </div>
      )}

      <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded bg-bg-2 px-3 py-2 text-xs font-medium text-heading ring-1 ring-line hover:border-accent">
        <span>{busy ? "Uploading…" : value ? "Replace file" : "Upload file"}</span>
        <input
          type="file"
          accept={accept}
          disabled={busy}
          className="sr-only"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
      </label>
      {error && <span className="text-xs text-accent">{error}</span>}
    </div>
  );
}
