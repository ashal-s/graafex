"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

function initialsFrom(name: string, email: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase();
  }
  if (parts.length === 1 && parts[0]!.length > 0) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`h-3.5 w-3.5 text-body transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover/item:translate-x-0.5 group-hover/item:opacity-100"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AdminAccountMenu({
  name,
  email,
  userId,
}: {
  name?: string | null;
  email: string;
  userId?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const displayName = name?.trim() || email;
  const initials = initialsFrom(name?.trim() || "", email);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={userId ? menuId : undefined}
        onClick={() => userId && setOpen((value) => !value)}
        className={`inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-2/80 py-1 pl-1 pr-3 text-left shadow-[inset_0_1px_0_rgb(255_245_237_/0.04)] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          open
            ? "border-accent/40 text-heading"
            : "hover:border-accent/35 hover:text-heading"
        } ${userId ? "" : "cursor-default"}`}
      >
        <span
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[linear-gradient(145deg,rgb(255_77_0_/0.95),rgb(255_122_51_/0.55))] text-[10px] font-semibold tracking-wide text-heading shadow-[0_0_0_1px_rgb(255_77_0_/0.25)]"
          aria-hidden
        >
          {initials}
        </span>
        <span className="max-w-[10rem] truncate text-[13px] font-medium tracking-[-0.01em] text-heading">
          {displayName}
        </span>
        {userId ? <IconChevron open={open} /> : null}
      </button>

      {open && userId ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[100] w-[15.5rem] overflow-hidden rounded-[var(--radius-small)] border border-line bg-[color-mix(in_srgb,var(--bg-2)_92%,black)] shadow-[0_18px_40px_rgb(0_0_0_/0.45),0_0_0_1px_rgb(255_120_50_/0.08)] backdrop-blur-md"
        >
          <div className="border-b border-line px-3.5 py-3">
            <p className="truncate text-sm font-medium tracking-[-0.01em] text-heading">
              {displayName}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-body">{email}</p>
          </div>
          <div className="p-1.5">
            <Link
              href={`/admin/users/${userId}`}
              role="menuitem"
              prefetch={false}
              onClick={() => setOpen(false)}
              className="group/item flex items-center justify-between gap-3 rounded-[calc(var(--radius-small)-0.2rem)] px-2.5 py-2.5 text-sm text-heading transition-colors hover:bg-[rgb(255_77_0_/0.1)] hover:text-accent"
            >
              <span className="font-medium tracking-[-0.01em]">View profile</span>
              <IconArrow />
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
