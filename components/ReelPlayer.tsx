"use client";

import { useEffect, useRef, useState } from "react";
import { Media } from "./ui";

const DEFAULT_PALETTE = ["#ff4d00", "#7a2a0a"];

/**
 * Click-to-play vertical reel. The play button shows while paused and hides
 * while playing; starting one reel pauses any other on the page.
 */
export default function ReelPlayer({
  src,
  poster,
  palette = DEFAULT_PALETTE,
  seed = 0,
  label,
}: {
  src?: string;
  poster?: string;
  palette?: string[];
  seed?: number;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const onPlay = () => {
      setPlaying(true);
      document.querySelectorAll<HTMLVideoElement>("video[data-reel]").forEach((v) => {
        if (v !== video) v.pause();
      });
    };
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  if (!src) return <Media palette={palette} seed={seed} className="!absolute inset-0" />;

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`${playing ? "Pause" : "Play"} ${label}`}
      aria-pressed={playing}
      className="group absolute inset-0 block h-full w-full cursor-pointer"
    >
      <video
        ref={ref}
        data-reel
        className="absolute inset-0 h-full w-full object-cover"
        src={`${src}#t=0.1`}
        poster={poster}
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-300 ease-[var(--ease-out)] ${playing ? "scale-90 opacity-0" : ""}`}
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md md:h-16 md:w-16">
          <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7" fill="currentColor">
            <path d="M8 5 20 12 8 19Z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
