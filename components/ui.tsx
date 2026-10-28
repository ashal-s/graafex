"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { site } from "@/lib/content";

/** Adds `is-in` once the element scrolls into view. */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

export function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  threshold = 0.2,
  children,
}: {
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Fraction of the element that must be visible before it reveals. Use a low value for tall sections. */
  threshold?: number;
  children: ReactNode;
}) {
  const ref = useInView<HTMLElement>(threshold);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function SwooshButton({ href, children, className = "" }: { href: string; children: string; className?: string }) {
  return (
    <a href={href} className={`swoosh t-small ${className}`}>
      <span className="swoosh__bg" aria-hidden>
        <span className="swoosh__layer swoosh__layer--1" />
        <span className="swoosh__layer swoosh__layer--2" />
      </span>
      <span className="swoosh__inner">{children}</span>
    </a>
  );
}

/** Animated gradient block standing in for an image or video. */
export function Media({
  className = "",
  palette = ["#ff4d00", "#ff7a33"],
  seed = 0,
  children,
}: {
  className?: string;
  palette?: [string, string] | string[];
  seed?: number;
  children?: ReactNode;
}) {
  const style = {
    "--c1": palette[0],
    "--c2": palette[1],
    "--x1": `${20 + ((seed * 37) % 50)}%`,
    "--y1": `${15 + ((seed * 53) % 60)}%`,
    "--x2": `${40 + ((seed * 29) % 50)}%`,
    "--y2": `${30 + ((seed * 41) % 60)}%`,
  } as CSSProperties;
  return (
    <div className={`media ${className}`} style={style}>
      {children}
    </div>
  );
}

/** Framed S monogram — reads as a mark, not a letter floating beside type. */
export function LogoMark({ className = "h-[1em] w-[1em]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden>
      <rect
        x="1.25"
        y="1.25"
        width="37.5"
        height="37.5"
        rx="11"
        stroke="currentColor"
        strokeWidth="1.75"
        opacity="0.55"
      />
      <path
        d="M27.2 10.2H16.4A4.7 4.7 0 0 0 11.7 14.9 4.7 4.7 0 0 0 16.4 19.6H23.6A4.7 4.7 0 0 1 28.3 24.3 4.7 4.7 0 0 1 23.6 29H11.8"
        stroke="currentColor"
        strokeWidth="3.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Brand lockup: framed monogram + wordmark. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.7em] leading-none text-white ${className}`}>
      <LogoMark className="h-[1.55em] w-[1.55em] shrink-0" />
      <span className="pt-[0.02em] text-[0.92em] font-semibold tracking-[-0.06em]">{site.name}</span>
    </span>
  );
}

export function Eyebrow({ children, dot = true }: { children: ReactNode; dot?: boolean }) {
  return (
    <p className="t-small mb-4 flex items-center gap-2 font-medium uppercase tracking-[0.12em] text-accent">
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
      {children}
    </p>
  );
}
