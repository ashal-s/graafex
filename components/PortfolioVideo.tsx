"use client";

import { useEffect, useRef, useState } from "react";
import { Media } from "./ui";

const DEFAULT_PALETTE = ["#ff4d00", "#7a2a0a"];

/**
 * Muted looping video. `trigger="view"` plays while on screen; `trigger="hover"`
 * plays while the pointer is over the nearest `[data-hover-play]` ancestor
 * (tap toggles on touch). Never plays under reduced-motion. Without a `src` it
 * shows the animated gradient placeholder.
 *
 * When `toggleOnClick` is set, a click (or Enter/Space) pauses/plays with no
 * visible control — only the aria-label updates.
 */
export default function PortfolioVideo({
  src,
  poster,
  palette = DEFAULT_PALETTE,
  seed = 0,
  label,
  className = "",
  trigger = "view",
  toggleOnClick = false,
}: {
  src?: string;
  poster?: string;
  palette?: string[];
  seed?: number;
  label: string;
  className?: string;
  trigger?: "view" | "hover";
  toggleOnClick?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

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
    let userPaused = false;
    const sync = () => {
      if (!visible || reduce.matches) {
        video.pause();
        return;
      }
      if (!userPaused) void video.play().catch(() => {});
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) userPaused = false;
        sync();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    reduce.addEventListener("change", sync);

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    const onToggle = (e: Event) => {
      if (!toggleOnClick) return;
      e.preventDefault();
      if (reduce.matches) return;
      if (video.paused) {
        userPaused = false;
        void video.play().catch(() => {});
      } else {
        userPaused = true;
        video.pause();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (!toggleOnClick) return;
      if (e.key === "Enter" || e.key === " ") onToggle(e);
    };
    if (toggleOnClick) {
      video.addEventListener("click", onToggle);
      video.addEventListener("keydown", onKeyDown);
    }

    return () => {
      io.disconnect();
      reduce.removeEventListener("change", sync);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      if (toggleOnClick) {
        video.removeEventListener("click", onToggle);
        video.removeEventListener("keydown", onKeyDown);
      }
    };
  }, [src, trigger, toggleOnClick]);

  if (!src) {
    return <Media palette={palette} seed={seed} className={`!absolute inset-0 ${className}`} />;
  }

  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover ${toggleOnClick ? "cursor-pointer" : ""} ${className}`}
      src={trigger === "hover" ? `${src}#t=0.1` : src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      tabIndex={toggleOnClick ? 0 : undefined}
      role={toggleOnClick ? "button" : undefined}
      aria-label={toggleOnClick ? `${playing ? "Pause" : "Play"} ${label}` : label}
      aria-pressed={toggleOnClick ? playing : undefined}
    />
  );
}
