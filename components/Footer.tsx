"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/content";
import { Eyebrow, Logo, Media, Reveal, SwooshButton } from "./ui";

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="t-small tabular-nums">{time}</span>;
}

const linkCls = "t-small block text-heading transition-colors hover:text-accent";

export default function Footer() {
  return (
    <footer id="contact" className="theme-violet relative z-[2] overflow-hidden">
      <Media seed={7} palette={["#5c4a78", "#8a74b0"]} className="!absolute inset-0 opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--bg)_0%,#241c32cc_42%,transparent_100%)]" />

      <div className="container-x relative pb-5 pt-[clamp(3rem,5vw,4.5rem)]">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[40rem]">
            <Eyebrow>Ready to move forward?</Eyebrow>
            <h2 className="ink-fade t-h4 font-semibold">
              The best results start with a good conversation. Let’s have ours.
            </h2>
          </div>
          <SwooshButton href={`mailto:${site.email}`}>Start a conversation</SwooshButton>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 lg:grid-cols-4">
          <div>
            <p className="t-small mb-2 uppercase tracking-[0.12em] text-heading/60">Navigate</p>
            <ul className="space-y-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkCls}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-small mb-2 uppercase tracking-[0.12em] text-heading/60">Get in touch</p>
            <a href={`mailto:${site.email}`} className={linkCls}>{site.email}</a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={linkCls}>{site.phone}</a>
          </div>
          <div>
            <p className="t-small mb-2 uppercase tracking-[0.12em] text-heading/60">Come see us</p>
            <p className="t-small text-heading">
              {site.address[0]}
              <br />
              {site.address[1]}
            </p>
          </div>
          <div>
            <p className="t-small mb-2 uppercase tracking-[0.12em] text-heading/60">Socials</p>
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} className={linkCls}>{s.label}</a>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <Logo className="t-h6" />
          <span className="t-small">©{new Date().getFullYear()} {site.name}. All rights reserved</span>
          <Clock />
        </div>
      </div>
    </footer>
  );
}
