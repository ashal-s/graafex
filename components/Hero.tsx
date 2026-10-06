"use client";

import { useEffect, useRef } from "react";
import { hero } from "@/lib/content";
import { BlurText, LogoMark, Reveal } from "./ui";

/** Web MP4 derived from public/videos/hero_video.mov (browsers do not reliably play .mov). */
const HERO_VIDEO = "/videos/hero_video.mp4";

export default function Hero() {
  const wrap = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Inset video shrinks toward the bottom-left as you scroll past it.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!wrap.current || !media.current) return;
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, window.scrollY / vh));
      const scale = 1 - p * 0.55;
      media.current.style.transform = `scale(${scale})`;
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
      if (reduce.matches) video.pause();
      else void video.play().catch(() => {});
    };
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  return (
    <section ref={wrap} className="relative z-[2]">
      {/* Intro loader */}
      <div className="loader fixed inset-0 z-[70] flex items-center justify-center bg-bg">
        <div className="t-h3 flex items-center gap-5 font-semibold text-heading">
          <LogoMark className="h-[2.4em] w-[2.4em]" />
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
      <div className="sticky top-0 flex h-[100svh] items-stretch overflow-hidden p-[var(--margin)]">
        <div
          ref={media}
          className="relative h-full w-full origin-bottom-left overflow-hidden rounded-[var(--radius-main)] bg-black will-change-transform"
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
            aria-label="Graafex showreel"
          />
          <div className="pointer-events-none absolute bottom-[var(--margin)] left-[var(--margin)] z-[2] flex items-center gap-3 text-sm uppercase tracking-[0.12em] text-heading/80">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" /> Showreel
          </div>
        </div>
      </div>

      <div className="container-x relative pb-[clamp(4rem,8vw,8rem)] pt-[clamp(4rem,10vw,10rem)]">
        <div className="mix-blend-difference">
          <BlurText text={hero.heading} className="t-h2 mb-12 max-w-[22ch] font-semibold text-heading" />
        </div>
        <div className="grid gap-8 md:grid-cols-12">
          <Reveal className="t-large md:col-span-4 md:col-start-7 text-heading">{hero.intro}</Reveal>
          <Reveal className="md:col-span-4 md:col-start-7" delay={120}>
            {hero.body}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
