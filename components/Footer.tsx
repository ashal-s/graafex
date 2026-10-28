"use client";

import { navLinks, site } from "@/lib/content";
import { Logo, Media } from "./ui";

const footerLinks = navLinks;

const linkCls = "t-small block text-heading transition-colors hover:text-accent";

function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="theme-dark relative z-[2] overflow-hidden border-t border-line">
      <Media seed={7} palette={["#ff4d00", "#ff7a33"]} className="media--band !absolute inset-0 opacity-90" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0f0a08_0%,rgb(26_12_8/0.8)_42%,rgb(15_10_8/0)_100%)]" />

      <div className="container-x relative py-[clamp(2rem,3.5vw,3rem)]">
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          <Logo className="t-h6" />
          <ul className="flex gap-6 md:justify-center">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkCls}>{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-4 md:justify-end">
            <a
              href={`mailto:${site.email}`}
              className={`${linkCls} inline-flex items-center gap-2`}
            >
              <MailIcon />
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
