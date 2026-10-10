"use client";

import { useEffect, useRef } from "react";
import { Media } from "./ui";

/**
 * Muted looping video. `trigger="view"` plays while on screen; `trigger="hover"`
 * plays while the pointer is over the nearest `[data-hover-play]` ancestor
 * (tap toggles on touch). Never plays under reduced-motion. Without a `src` it
 * shows the animated gradient placeholder.
 */
export default function PortfolioVideo({
  src,
  poster,
  palette,
  seed = 0,
  label,
  className = "",
  trigger = "view",
}: {
  src?: string;
  poster?: string;
  palette: string[];
  seed?: number;
  label: string;
  className?: string;
  trigger?: "view" | "hover";
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (trigger === "hover") {
      const host = video.closest<HTMLElement>("[data-hover-play]") ?? video;
      const play = () => {
        if (!reduce.matches) void video.play().catch(() => {});
      };
      const stop = () => {
        video.pause();
        video.currentTime = 0;
      };
      const toggle = (e: PointerEvent) => {
        if (e.pointerType === "mouse") return;
        if (video.paused) play();
        else stop();
      };
      const onEnter = (e: PointerEvent) => e.pointerType === "mouse" && play();
      const onLeave = (e: PointerEvent) => e.pointerType === "mouse" && stop();
      host.addEventListener("pointerenter", onEnter);
      host.addEventListener("pointerleave", onLeave);
      host.addEventListener("pointerup", toggle);
      host.addEventListener("focusin", play);
      host.addEventListener("focusout", stop);
      return () => {
        host.removeEventListener("pointerenter", onEnter);
        host.removeEventListener("pointerleave", onLeave);
        host.removeEventListener("pointerup", toggle);
        host.removeEventListener("focusin", play);
        host.removeEventListener("focusout", stop);
      };
    }

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
  }, [src, trigger]);

  if (!src) {
    return <Media palette={palette} seed={seed} className={`!absolute inset-0 ${className}`} />;
  }

  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      src={trigger === "hover" ? `${src}#t=0.1` : src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
