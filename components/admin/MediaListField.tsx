"use client";

import { useState } from "react";

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
  /** Newline-separated URLs */
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

  function removeAt(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="grid gap-2 text-sm text-body">
      <span className="font-medium text-heading">{label}</span>
      <input type="hidden" name={name} value={items.join("\n")} />

      {items.length === 0 ? (
        <div className="flex min-h-24 items-center justify-center rounded-[var(--radius-small)] border border-dashed border-line bg-bg px-4 py-6 text-center text-xs">
          No items yet
        </div>
      ) : (
        <ul
          className={
            kind === "video"
              ? "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
              : "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
          }
        >
          {items.map((url, i) => (
            <li key={`${url}-${i}`} className="group relative overflow-hidden rounded-[var(--radius-small)] border border-line bg-bg">
              {kind === "video" ? (
                <video src={url} muted playsInline preload="metadata" className="aspect-[9/16] w-full object-cover" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={url} alt="" className="aspect-square w-full object-cover" />
              )}
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute right-1.5 top-1.5 rounded bg-black/70 px-2 py-1 text-[11px] font-medium text-white"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded bg-bg-2 px-3 py-2 text-xs font-medium text-heading ring-1 ring-line">
        <span>{busy ? "Uploading…" : "Add files"}</span>
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
      {error && <span className="text-xs text-accent">{error}</span>}
    </div>
  );
}
