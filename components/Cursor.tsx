"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

/** Circle cursor that inverts whatever is beneath it (mix-blend-mode: difference). */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = dot.current;
    if (!el) return;

    let x = -100, y = -100, cx = x, cy = y, scale = 1, target = 1, raf = 0;

    const tick = () => {
      cx += (x - cx) * 0.25;
      cy += (y - cy) * 0.25;
      scale += (target - scale) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = "1";
      target = (e.target as Element | null)?.closest?.(INTERACTIVE) ? 1.8 : 1;
    };
    const onLeave = () => (el.style.opacity = "0");

    document.documentElement.classList.add("has-cursor");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] h-6 w-6 rounded-full bg-white opacity-0 mix-blend-difference"
    />
  );
}
