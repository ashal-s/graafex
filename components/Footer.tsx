"use client";

import { navLinks, site } from "@/lib/content";
import { Logo, Media } from "./ui";

const footerLinks = navLinks;

const icons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.4 2.6 2 4.2 5 4.5" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
      <path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V8.5z" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.8v.01M12 16v-5.5M12 13c0-1.7 1.1-2.5 2.3-2.5S16 11.3 16 13v3" />
    </svg>
  ),
};

const linkCls = "t-small block text-heading transition-colors hover:text-accent";

export default function Footer() {
  return (
    <footer id="contact" className="theme-violet relative z-[2] overflow-hidden">
      <Media seed={7} palette={["#5c4a78", "#8a74b0"]} className="!absolute inset-0 opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--bg)_0%,#241c32cc_42%,transparent_100%)]" />

      <div className="container-x relative py-[clamp(2rem,3.5vw,3rem)]">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <h2 className="ink-fade t-h5 max-w-[34rem] font-semibold">
            The best results start with a good conversation. Let’s have ours.
          </h2>
        </div>

        <div className="mt-8 grid gap-6 border-t border-line pt-6 md:grid-cols-3 md:items-center">
          <Logo className="t-h6" />
          <ul className="flex gap-6 md:justify-center">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkCls}>{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-4 md:justify-end">
            <a href={`mailto:${site.email}`} className={linkCls}>{site.email}</a>
            <div className="flex gap-1">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center text-white transition-opacity hover:opacity-70"
                >
                  {icons[s.label]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
