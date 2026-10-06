"use client";

import { useEffect } from "react";

/** Sets --p (-1 → 1) on every `.parallax` element as it crosses the viewport. */
export default function ScrollParallax() {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>(".parallax").forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = ((r.top + r.height / 2) / vh - 0.5) * 2;
        el.style.setProperty("--p", String(Math.max(-1.5, Math.min(1.5, p))));
      });
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
  return null;
}
