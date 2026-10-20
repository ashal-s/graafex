"use client";

import { useState } from "react";
import { adminFieldClass } from "@/components/admin/ui";

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
    <label className="flex flex-col gap-1.5 text-[13px] font-medium text-body">
      <span className="text-heading">{label}</span>
      <span className="flex items-center gap-2">
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#ff4d00"}
          onChange={(e) => setValue(e.target.value)}
          className="h-10 w-12 cursor-pointer overflow-hidden rounded-[var(--radius-small)] border border-line bg-transparent p-0"
          aria-label={`${label} picker`}
        />
        <input
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`${adminFieldClass} min-w-0 flex-1 font-mono text-xs uppercase`}
          pattern="^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$"
        />
      </span>
    </label>
  );
}
