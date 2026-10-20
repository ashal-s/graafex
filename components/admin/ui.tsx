import type { ReactNode } from "react";

export const adminFieldClass =
  "rounded-[var(--radius-small)] border border-line bg-[color-mix(in_srgb,var(--bg-2)_88%,black)] px-3.5 py-2.5 text-sm text-heading outline-none transition-[border-color,box-shadow] placeholder:text-body/50 focus:border-accent/50 focus:shadow-[0_0_0_3px_rgb(255_77_0_/0.12)]";

export const adminLabelClass = "flex flex-col gap-1.5 text-[13px] font-medium text-body";

export const adminPanelClass =
  "rounded-[calc(var(--radius-main)-0.25rem)] border border-line bg-[color-mix(in_srgb,var(--bg-2)_90%,black)] shadow-[inset_0_1px_0_rgb(255_245_237_/0.04)]";

export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
      <div className="min-w-0">
        <h1 className="text-[1.75rem] font-semibold tracking-[-0.03em] text-heading sm:text-[2rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-body">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function AdminStatusBadge({
  published,
  extra,
}: {
  published: boolean;
  extra?: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-body">
      <span
        className={`h-1.5 w-1.5 rounded-full ${published ? "bg-accent shadow-[0_0_8px_rgb(255_77_0_/0.65)]" : "bg-body/40"}`}
        aria-hidden
      />
      <span className={published ? "text-heading/80" : "text-body"}>
        {published ? "Published" : "Draft"}
        {extra ? ` · ${extra}` : ""}
      </span>
    </span>
  );
}

export function AdminEmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className={`${adminPanelClass} grid place-items-center px-6 py-16 text-center`}>
      <div className="max-w-sm">
        <p className="text-base font-medium tracking-[-0.01em] text-heading">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-body">{description}</p>
        {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
      </div>
    </div>
  );
}

export function AdminPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${adminPanelClass} ${className}`}>{children}</div>;
}

export function AdminSection({
  title,
  description,
  children,
  tone = "default",
}: {
  title: string;
  description?: string;
  children: ReactNode;
  tone?: "default" | "danger";
}) {
  return (
    <section
      className={`${adminPanelClass} p-5 ${tone === "danger" ? "border-accent/25" : ""}`}
    >
      <div className="mb-4 border-b border-line pb-3">
        <h2
          className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
            tone === "danger" ? "text-accent" : "text-accent"
          }`}
        >
          {title}
        </h2>
        {description ? <p className="mt-1 text-xs text-body">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function AdminNotice({
  children,
  tone = "info",
}: {
  children: ReactNode;
  tone?: "info" | "success" | "error";
}) {
  const styles =
    tone === "success"
      ? "border-accent/30 bg-[rgb(255_77_0_/0.08)] text-heading"
      : tone === "error"
        ? "border-accent/40 bg-[rgb(255_77_0_/0.1)] text-accent"
        : "border-line bg-bg-2 text-body";
  return (
    <p className={`rounded-[var(--radius-small)] border px-3.5 py-2.5 text-sm leading-relaxed ${styles}`}>
      {children}
    </p>
  );
}
