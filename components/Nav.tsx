"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/lib/content";
import { Logo, Media } from "./ui";
import { SocialLinks } from "./social-icons";

const EASE = "cubic-bezier(0.645, 0.045, 0.355, 1)";
const REVEAL_MS = 900;

// Backdrop glows that crossfade as you move between links.
const palettes = [
  ["#ff4d00", "#3a1208"],
  ["#ff7a33", "#2a0f06"],
  ["#ff9a5c", "#1a0c08"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(0);
  const [onLight, setOnLight] = useState(false);
  const [origin, setOrigin] = useState({ x: "100%", y: "0px" });
  const logoRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

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

  const toggle = () => {
    // The menu grows out of (and shrinks back into) the button.
    const b = buttonRef.current;
    if (b) {
      const r = b.getBoundingClientRect();
      setOrigin({ x: `${r.left + r.width / 2}px`, y: `${r.top + r.height / 2}px` });
    }
    setOpen((o) => !o);
  };

  // Two stacked layers: an orange one leads, the dark menu follows a beat later,
  // so a ring of orange trails the edge of the reveal.
  const layer = (openDelay: number, closeDelay: number): CSSProperties => ({
    clipPath: `circle(${open ? "150vmax" : "0px"} at ${origin.x} ${origin.y})`,
    transition: `clip-path ${REVEAL_MS}ms ${EASE} ${open ? openDelay : closeDelay}ms`,
  });

  // Content slides up from behind a mask, staggered, once the menu is open.
  const rise = (i: number): CSSProperties => ({
    transform: open ? "translateY(0)" : "translateY(110%)",
    transition: `transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${open ? 380 + i * 80 : 0}ms`,
  });
  const fade = (delay: number): CSSProperties => ({
    opacity: open ? 1 : 0,
    transform: open ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 700ms ease ${open ? delay : 0}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${open ? delay : 0}ms`,
  });

  return (
    <header>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-accent focus:px-3 focus:py-2 focus:text-black">
        Skip to main content
      </a>

      {/* Logo stays above the menu; it doesn't catch clicks outside itself */}
      <div className="pointer-events-none fixed inset-x-0 top-[var(--margin)] z-[56] flex items-center justify-between gap-6 px-[calc(var(--margin)*2)] py-5">
        <Link ref={logoRef} href="/" aria-label={`${site.name} home`} className="pointer-events-auto t-h5">
          <Logo
            className={`transition-colors duration-300 ${onLight && !open ? "!text-[#1c1410]" : "!text-white"}`}
          />
        </Link>
      </div>

      {/* Menu button: label pill + icon disc that morphs into a cross */}
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="group fixed right-[calc(var(--margin)*2)] top-[calc(var(--margin)+1rem)] z-[57] flex cursor-pointer items-center gap-3 rounded-full bg-[#c23a00] py-1.5 pl-5 pr-1.5 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-heading hover:text-bg"
      >
        {/* Both words share one grid cell so the pill is always as wide as the longer one */}
        <span className="grid h-[1.2em] overflow-hidden" aria-hidden>
          <span
            className={`col-start-1 row-start-1 block transition-transform duration-500 ${open ? "-translate-y-full" : ""}`}
            style={{ transitionTimingFunction: EASE }}
          >
            Menu
          </span>
          <span
            className={`col-start-1 row-start-1 block transition-transform duration-500 ${open ? "" : "translate-y-full"}`}
            style={{ transitionTimingFunction: EASE }}
          >
            Close
          </span>
        </span>
        <span
          className="relative grid h-9 w-9 place-items-center rounded-full bg-bg text-white transition-[transform,background-color] duration-500 group-hover:scale-110 group-hover:bg-accent"
          aria-hidden
        >
          <span className="relative block h-[10px] w-[16px]">
            <span
              className={`absolute left-0 top-0 block h-[2px] w-full rounded-full bg-current transition-transform duration-500 ${open ? "translate-y-[4px] rotate-45" : ""}`}
              style={{ transitionTimingFunction: EASE }}
            />
            <span
              className={`absolute bottom-0 left-0 block h-[2px] w-full rounded-full bg-current transition-transform duration-500 ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
              style={{ transitionTimingFunction: EASE }}
            />
          </span>
        </span>
      </button>

      <nav
        id="site-menu"
        aria-label="Main"
        className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
        inert={!open}
      >
        {/* Leading orange layer */}
        <div aria-hidden className="absolute inset-0 bg-accent" style={layer(0, 140)} />

        {/* Dark menu layer */}
        <div className="theme-dark absolute inset-0" style={layer(140, 0)}>
          {palettes.map((p, i) => (
            <Media
              key={i}
              palette={p}
              seed={i + 3}
              className={`!absolute inset-0 transition-opacity duration-700 ${hovered === i ? "opacity-30" : "opacity-0"}`}
            />
          ))}

          <div className="relative flex h-full flex-col overflow-y-auto px-[calc(var(--margin)*2)] pb-[calc(var(--margin)*1.25)] pt-28 md:pt-32">
            <div className="grid flex-1 content-center gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
              <ul className="group/list">
                {navLinks.map((l, i) => {
                  const active = pathname === l.href;
                  return (
                    <li key={l.href} className="overflow-hidden pb-1">
                      <div style={rise(i)}>
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          onMouseEnter={() => setHovered(i % palettes.length)}
                          onFocus={() => setHovered(i % palettes.length)}
                          aria-current={active ? "page" : undefined}
                          className="group/link block py-1 transition-opacity duration-300 group-hover/list:opacity-35 hover:!opacity-100 focus-visible:!opacity-100"
                        >
                          <span className="text-[clamp(2.75rem,9vw,7rem)] font-bold leading-[1.02] tracking-[-0.03em] text-heading transition-transform duration-500 ease-[var(--ease-out)] group-hover/link:translate-x-3">
                            {l.label}
                          </span>
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div style={fade(650)} className="lg:pb-3">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-accent">Get in touch</p>
                <a
                  href={`mailto:${site.email}`}
                  className="t-h4 font-semibold text-heading underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
                <p className="mb-4 mt-8 text-xs font-medium uppercase tracking-[0.12em] text-accent">Follow</p>
                <SocialLinks />
              </div>
            </div>

            <p style={fade(800)} className="t-small mt-10 text-xs opacity-70">
              © {new Date().getFullYear()} {site.name}
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
}
