import Link from "next/link";
import type { ReactNode } from "react";

const iconBase =
  "group relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50";

const variants = {
  ghost:
    "border border-line bg-[color-mix(in_srgb,var(--bg-2)_88%,black)] text-heading shadow-[inset_0_1px_0_rgb(255_245_237_/0.04)] hover:border-accent/40 hover:text-accent",
  accent:
    "border border-accent/30 bg-accent text-[#1a0c06] shadow-[0_8px_20px_rgb(255_77_0_/0.25)] hover:brightness-110",
  danger:
    "border border-line bg-[color-mix(in_srgb,var(--bg-2)_88%,black)] text-heading shadow-[inset_0_1px_0_rgb(255_245_237_/0.04)] hover:border-accent/50 hover:bg-[rgb(255_77_0_/0.12)] hover:text-accent",
} as const;

/** Tooltip renders above the control so card overflow doesn't clip it. */
function Tooltip({ label }: { label: string }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute bottom-[calc(100%+0.4rem)] left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-md bg-heading px-2 py-1 text-[11px] font-medium text-bg-2 opacity-0 shadow-[0_8px_20px_rgb(0_0_0_/0.35)] transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
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
  disabled,
}: {
  label: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold tracking-[-0.01em] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60 ${variants[variant]} ${className}`}
    >
      {children}
      <span>{label}</span>
    </button>
  );
}
