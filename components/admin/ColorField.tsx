"use client";

import { useState } from "react";

export default function ColorField({
  name,
  label,
  defaultValue = "#ff4d00",
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <label className="flex flex-col gap-1.5 text-sm text-body">
      <span className="font-medium text-heading">{label}</span>
      <span className="flex items-center gap-2">
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#ff4d00"}
          onChange={(e) => setValue(e.target.value)}
          className="h-10 w-12 cursor-pointer overflow-hidden rounded border border-line bg-transparent p-0"
          aria-label={`${label} picker`}
        />
        <input
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="min-w-0 flex-1 rounded border border-line bg-bg-2 px-3 py-2 font-mono text-xs uppercase text-heading"
          pattern="^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$"
        />
      </span>
    </label>
  );
}
