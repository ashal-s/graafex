"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/lib/content";
import { Logo, Media } from "./ui";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(0);
  const [onLight, setOnLight] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);

  // Flip the logo to dark ink while it sits over a light band (.section-light / .section-white).
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const el = logoRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const under = document
        .elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2)
        .find((n) => !n.closest("header"));
      setOnLight(!!under?.closest(".section-light, .section-white"));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const palettes = [
    ["#ff4d00", "#3a1208"],
    ["#ff7a33", "#2a0f06"],
    ["#ff9a5c", "#1a0c08"],
  ];

  return (
    <header>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-3 focus:py-2 focus:text-black">
        Skip to main content
      </a>

      <div className="fixed inset-x-0 top-[var(--margin)] z-50 flex items-center justify-between gap-6 px-[calc(var(--margin)*2)] py-5">
        <a ref={logoRef} href="/" aria-label={`${site.name} home`} className="t-h5">
          <Logo className={`transition-colors duration-300 ${onLight ? "!text-[#1c1410]" : "!text-white"}`} />
        </a>
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-menu"
        className="fixed right-[calc(var(--margin)*2)] top-[calc(var(--margin)+1rem)] z-[55] flex cursor-pointer items-center gap-3 rounded-[var(--radius-xs)] !bg-accent !bg-none px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] !text-bg transition-colors hover:!bg-heading"
      >
        <span className="relative block h-[1.2em] overflow-hidden">
          <span className={`block transition-transform duration-500 ${open ? "-translate-y-full" : ""}`}>Menu</span>
          <span className={`absolute inset-0 block transition-transform duration-500 ${open ? "" : "translate-y-full"}`}>Close</span>
        </span>
        <span className="grid grid-cols-2 gap-[3px]" aria-hidden>
          {[0, 1, 2, 3].map((d) => (
            <span
              key={d}
              className={`h-[5px] w-[5px] rounded-full bg-current transition-transform duration-500 ${open ? (d % 3 === 0 ? "rotate-45 scale-125" : "scale-0") : ""}`}
            />
          ))}
        </span>
      </button>

      <nav
        id="site-menu"
        aria-label="Main"
        className={`theme-dark fixed inset-0 z-50 transition-[clip-path] duration-700 ease-[var(--ease)] ${open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"}`}
        inert={!open}
      >
        <div className="absolute inset-0 bg-bg/60" />
        {palettes.map((p, i) => (
          <Media
            key={i}
            palette={p}
            seed={i + 3}
            className={`!absolute inset-0 transition-opacity duration-700 ${hovered === i ? "opacity-40" : "opacity-0"}`}
          />
        ))}

        <div className="relative flex h-full flex-col justify-between pt-28">
          <ul className="border-t border-line">
            {navLinks.map((l, i) => (
              <li key={l.href} className="border-b border-line">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setHovered(i)}
                  className="group flex items-start gap-4 px-[var(--margin)] py-5"
                >
                  <span className="t-h4 pt-2 text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`t-display font-bold text-heading transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-4 ${open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
                    style={{ transitionDelay: open ? `${150 + i * 80}ms` : "0ms", transitionProperty: "transform, opacity" }}
                  >
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-end gap-6 px-[var(--margin)] py-8">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} className="t-h6 text-heading underline-offset-4 hover:text-accent hover:underline">
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
