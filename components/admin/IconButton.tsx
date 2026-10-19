import Link from "next/link";
import type { ReactNode } from "react";

const iconBase =
  "group relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-small)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50";

const variants = {
  ghost: "bg-bg-2 text-heading ring-1 ring-line hover:bg-bg hover:text-accent",
  accent: "bg-accent text-bg-2 hover:brightness-110",
  danger: "bg-bg-2 text-heading ring-1 ring-line hover:bg-accent/15 hover:text-accent hover:ring-accent",
} as const;

/** Tooltip renders above the control so card overflow doesn't clip it. */
function Tooltip({ label }: { label: string }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute bottom-[calc(100%+0.35rem)] left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded bg-heading px-2 py-1 text-[11px] font-medium text-bg-2 opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      {label}
    </span>
  );
}

export function IconLink({
  href,
  label,
  children,
  variant = "ghost",
}: {
  href: string;
  label: string;
  children: ReactNode;
  variant?: keyof typeof variants;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      aria-label={label}
      title={label}
      className={`${iconBase} ${variants[variant]}`}
    >
      {children}
      <Tooltip label={label} />
    </Link>
  );
}

export function IconButton({
  label,
  children,
  variant = "ghost",
  type = "button",
  className = "",
  onClick,
}: {
  label: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`${iconBase} ${variants[variant]} ${className}`}
    >
      {children}
      <Tooltip label={label} />
    </button>
  );
}

/** Primary action: icon + visible label (e.g. Save). */
export function LabelButton({
  label,
  children,
  variant = "accent",
  type = "button",
  className = "",
}: {
  label: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      className={`inline-flex h-10 items-center gap-2 rounded-[var(--radius-small)] px-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${variants[variant]} ${className}`}
    >
      {children}
      <span>{label}</span>
    </button>
  );
}
