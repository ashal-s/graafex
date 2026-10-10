"use client";

import { navLinks, site } from "@/lib/content";
import { Logo, Media } from "./ui";
import { socialIcons } from "./social-icons";

const footerLinks = navLinks;

const linkCls = "t-small block text-heading transition-colors hover:text-accent";

export default function Footer() {
  return (
    <footer id="contact" className="theme-dark relative z-[2] overflow-hidden border-t border-line">
      <Media seed={7} palette={["#ff4d00", "#ff7a33"]} className="!absolute inset-0 opacity-90" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0f0a08_0%,#1a0c08cc_38%,transparent_100%)]" />

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
            <a href={`mailto:${site.email}`} className={linkCls}>{site.email}</a>
            <div className="flex gap-1">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center text-white transition-opacity hover:opacity-70"
                >
                  {socialIcons[s.label]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
