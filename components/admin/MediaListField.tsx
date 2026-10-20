"use client";

import { useState } from "react";
import { IconButton } from "@/components/admin/IconButton";
import { IconPlus, IconTrash } from "@/components/admin/icons";
import VideoThumb from "@/components/admin/VideoThumb";

export default function MediaListField({
  name,
  label,
  folder,
  defaultValue = "",
  accept,
  kind,
}: {
  name: string;
  label: string;
  folder: string;
  defaultValue?: string;
  accept: string;
  kind: "image" | "video";
}) {
  const [items, setItems] = useState<string[]>(() =>
    defaultValue
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError(null);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.set("file", file);
        body.set("folder", folder);
        body.set("filename", file.name);
        const res = await fetch("/api/admin/upload", { method: "POST", body });
        const data = (await res.json()) as { url?: string; error?: string };
        if (!res.ok || !data.url) throw new Error(data.error || "Upload failed");
        uploaded.push(data.url);
      }
      setItems((prev) => [...prev, ...uploaded]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-2 text-sm text-body">
      <div className="flex items-center justify-between gap-3">
        <span className="font-medium text-heading">{label}</span>
        <label className="group relative inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-accent/30 bg-accent text-[#1a0c06] shadow-[0_8px_20px_rgb(255_77_0_/0.25)] transition-all duration-200 hover:brightness-110">
          <IconPlus />
          <span className="pointer-events-none absolute bottom-[calc(100%+0.4rem)] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-heading px-2 py-1 text-[11px] font-medium text-bg-2 opacity-0 shadow-[0_8px_20px_rgb(0_0_0_/0.35)] transition-opacity group-hover:opacity-100">
            {busy ? "Uploading…" : "Add files"}
          </span>
          <input
            type="file"
            accept={accept}
            multiple
            disabled={busy}
            className="sr-only"
            onChange={(e) => {
              void onFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
      </div>
      <input type="hidden" name={name} value={items.join("\n")} />

      {items.length === 0 ? (
        <div className="flex min-h-24 items-center justify-center rounded-[var(--radius-small)] border border-dashed border-line bg-[color-mix(in_srgb,var(--bg)_70%,transparent)] px-4 py-6 text-center text-xs">
          No items yet
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-3 overflow-visible sm:grid-cols-3 md:grid-cols-4">
          {items.map((url, i) => (
            <li key={`${url}-${i}`} className="relative overflow-visible rounded-[var(--radius-small)] border border-line bg-bg">
              <div className="overflow-hidden rounded-[var(--radius-small)]">
                {kind === "video" ? (
                  <VideoThumb src={url} aspect="9 / 16" className="w-full" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={url} alt="" className="aspect-square w-full object-cover" />
                )}
              </div>
              <div className="absolute right-1.5 top-1.5 z-20">
                <IconButton label="Delete" variant="danger" onClick={() => setItems((prev) => prev.filter((_, j) => j !== i))}>
                  <IconTrash />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      )}
      {error && <span className="text-xs text-accent">{error}</span>}
    </div>
  );
}
