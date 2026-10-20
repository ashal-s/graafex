"use client";

import { useState } from "react";
import { IconButton } from "@/components/admin/IconButton";
import { IconUpload, IconX } from "@/components/admin/icons";
import VideoThumb from "@/components/admin/VideoThumb";

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
  hint,
  fitAspect = true,
}: {
  name: string;
  label: string;
  folder: string;
  defaultValue?: string;
  accept?: string;
  kind?: "auto" | "image" | "video";
  hint?: string;
  /** When true, video preview uses the file’s natural aspect ratio. */
  fitAspect?: boolean;
}) {
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showVideo = Boolean(value && (kind === "video" || (kind === "auto" && isVideo(value) && !isImage(value))));
  const showImage = Boolean(
    value && (kind === "image" || (kind === "auto" && isImage(value)) || (kind === "auto" && value && !showVideo)),
  );

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
      <div className="flex items-start justify-between gap-3">
        <span className="grid gap-0.5">
          <span className="font-medium text-heading">{label}</span>
          {hint && <span className="text-xs text-body">{hint}</span>}
        </span>
        <div className="flex gap-1">
          {value && (
            <IconButton label="Remove" variant="danger" onClick={() => setValue("")}>
              <IconX />
            </IconButton>
          )}
          <label className="group relative inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line bg-[color-mix(in_srgb,var(--bg-2)_88%,black)] text-heading shadow-[inset_0_1px_0_rgb(255_245_237_/0.04)] transition-all duration-200 hover:border-accent/40 hover:text-accent">
            <IconUpload />
            <span className="pointer-events-none absolute bottom-[calc(100%+0.4rem)] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-heading px-2 py-1 text-[11px] font-medium text-bg-2 opacity-0 shadow-[0_8px_20px_rgb(0_0_0_/0.35)] transition-opacity group-hover:opacity-100">
              {busy ? "Uploading…" : value ? "Replace" : "Upload"}
            </span>
            <input
              type="file"
              accept={accept}
              disabled={busy}
              className="sr-only"
              onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>
      </div>
      <input type="hidden" name={name} value={value} />

      {value ? (
        <div className="overflow-hidden rounded-[var(--radius-small)] border border-line bg-[color-mix(in_srgb,var(--bg)_70%,transparent)]">
          {showVideo ? (
            <VideoThumb src={value} fit="contain" className="w-full max-h-[28rem]" aspect={fitAspect ? undefined : "16 / 9"} />
          ) : showImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="max-h-72 w-full object-contain" />
          ) : (
            <p className="break-all p-3 font-mono text-xs">{value}</p>
          )}
        </div>
      ) : (
        <div className="flex min-h-28 items-center justify-center rounded-[var(--radius-small)] border border-dashed border-line bg-[color-mix(in_srgb,var(--bg)_70%,transparent)] px-4 py-6 text-center text-xs text-body">
          No media yet
        </div>
      )}
      {error && <span className="text-xs text-accent">{error}</span>}
    </div>
  );
}
