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
  children,
}: {
  as?: ElementType;
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  const ref = useInView<HTMLElement>();
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

export function LogoMark({ className = "h-[1em] w-[1em]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <path
        d="M22.5 7.4H12.8A4.3 4.3 0 0 0 8.5 11.7 4.3 4.3 0 0 0 12.8 16H19.2A4.3 4.3 0 0 1 23.5 20.3 4.3 4.3 0 0 1 19.2 24.6H9.5"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.42em] font-semibold tracking-[-0.065em] text-white ${className}`}>
      <LogoMark />
      {site.name}
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
