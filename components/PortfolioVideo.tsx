"use client";

import { useEffect, useRef } from "react";
import { Media } from "./ui";

/**
 * Muted looping video that only plays while on screen (and never under
 * reduced-motion). Without a `src` it shows the animated gradient placeholder.
 */
export default function PortfolioVideo({
  src,
  poster,
  palette,
  seed = 0,
  label,
  className = "",
}: {
  src?: string;
  poster?: string;
  palette: string[];
  seed?: number;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (visible && !reduce.matches) void video.play().catch(() => {});
      else video.pause();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    reduce.addEventListener("change", sync);
    return () => {
      io.disconnect();
      reduce.removeEventListener("change", sync);
    };
  }, [src]);

  if (!src) {
    return <Media palette={palette} seed={seed} className={`!absolute inset-0 ${className}`} />;
  }

  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
