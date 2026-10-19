"use client";

export default function PublishToggle({
  name = "published",
  defaultChecked = true,
  label = "Published",
  description = "Visible on the public site when enabled.",
}: {
  name?: string;
  defaultChecked?: boolean;
  label?: string;
  description?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-[var(--radius-small)] border border-line bg-bg-2 px-4 py-3">
      <span className="grid gap-0.5">
        <span className="text-sm font-medium text-heading">{label}</span>
        <span className="text-xs text-body">{description}</span>
      </span>
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input name={name} type="checkbox" defaultChecked={defaultChecked} className="peer sr-only" />
        <span className="h-6 w-11 rounded-full bg-line transition-colors peer-checked:bg-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent" />
        <span className="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-bg-2 shadow transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
