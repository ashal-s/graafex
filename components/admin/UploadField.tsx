"use client";

import { useState } from "react";

export default function UploadField({
  name,
  label,
  folder,
  defaultValue = "",
  accept,
  multiline = false,
}: {
  name: string;
  label: string;
  folder: string;
  defaultValue?: string;
  accept?: string;
  multiline?: boolean;
}) {
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setValue((prev) => (multiline && prev ? `${prev}\n${data.url}` : data.url!));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <label className="flex flex-col gap-1 text-sm text-body">
      {label}
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
          className="rounded-[var(--radius-small)] border border-line bg-bg-2 px-3 py-2 font-mono text-xs text-heading outline-none focus:border-accent"
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="rounded-[var(--radius-small)] border border-line bg-bg-2 px-3 py-2 font-mono text-xs text-heading outline-none focus:border-accent"
        />
      )}
      <input
        type="file"
        accept={accept}
        disabled={busy}
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        className="text-xs"
      />
      {busy && <span className="text-xs text-body">Uploading…</span>}
      {error && <span className="text-xs text-accent">{error}</span>}
    </label>
  );
}
