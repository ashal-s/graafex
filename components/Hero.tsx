"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/content";
import { LogoMark } from "./ui";

/** Web MP4 (browsers do not reliably play .mov, so keep the source file out of the repo). */
const HERO_VIDEO = "/videos/hero_video.mp4";

export default function Hero() {
  const wrap = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const [playing, setPlaying] = useState(true);

  // Video stays full size; scrolling fades in a light overlay and lifts the headline from the bottom.
  useEffect(() => {
    let raf = 0;
    const clamp = (n: number) => Math.min(1, Math.max(0, n));
    const update = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const runway = el.offsetHeight - window.innerHeight;
      const p = clamp(runway > 0 ? -el.getBoundingClientRect().top / runway : 0);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const t = reduce ? 1 : clamp((p - 0.15) / 0.4);
      if (overlay.current) overlay.current.style.opacity = String(clamp(p / 0.4) * 0.35);
      if (text.current) {
        text.current.style.opacity = String(t);
        text.current.style.transform = `translateY(${(1 - t) * 60}%)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduce.matches) {
        video.pause();
        return;
      }
      if (!userPausedRef.current) void video.play().catch(() => {});
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    sync();
    reduce.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (video.paused) {
      userPausedRef.current = false;
      void video.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  };

  return (
    <section ref={wrap} className="relative z-[2] h-[280svh]">
      {/* Intro loader */}
      <div className="loader fixed inset-0 z-[70] flex items-center justify-center bg-bg">
        <div className="t-h3 flex items-center gap-5 font-semibold text-heading">
          <LogoMark className="h-[1.7em] w-[1.7em] shrink-0 text-heading" />
          <div className="overflow-hidden leading-tight">
            {hero.loader.map((line, i) => (
              <span key={line} className="loader__line" style={{ animationDelay: `${200 + i * 150}ms` }}>
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky hero — padded so page bg shows around the rounded frame */}
      <div className="theme-dark theme-dark-hero sticky top-0 flex h-[100svh] items-stretch overflow-hidden p-[var(--margin)]">
        <div className="relative h-full w-full overflow-hidden rounded-[var(--radius-main)] bg-[#0c0807]">
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={`${playing ? "Pause" : "Play"} Studiofex brand video`}
            aria-pressed={playing}
            className="absolute inset-0 block h-full w-full cursor-pointer"
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={HERO_VIDEO}
              poster="/videos/hero-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              aria-hidden
            />
          </button>
          <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />
          <div ref={overlay} className="pointer-events-none absolute inset-0 bg-[#0c0807] opacity-0" aria-hidden />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden p-[var(--margin)] pb-[calc(var(--margin)*2)] md:px-[calc(var(--margin)*2)]">
            <div ref={text} className="opacity-0 will-change-transform">
              <h1 className="ink-fade t-h2 max-w-[22ch] font-semibold">{hero.heading}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
