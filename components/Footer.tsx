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

const linkCls = "t-h6 block text-heading transition-colors hover:text-accent";

export default function Footer() {
  return (
    <footer id="contact" className="relative z-[2] overflow-hidden">
      <Media seed={7} palette={["#ff4d00", "#ff7a33"]} className="!absolute inset-0 opacity-75" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--bg)_0%,#100c0acc_40%,transparent_100%)]" />

      <div className="container-x relative pb-8 pt-[clamp(5rem,10vw,10rem)]">
        <Reveal className="max-w-[56rem]">
          <Eyebrow>Ready to move forward?</Eyebrow>
          <h2 className="t-h2 mb-10 font-semibold text-heading">
            The best results start with a good conversation. Let’s have ours.
          </h2>
          <SwooshButton href={`mailto:${site.email}`}>Start a conversation</SwooshButton>
        </Reveal>

        <div className="mt-[clamp(5rem,10vw,10rem)] grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="t-small mb-4 uppercase tracking-[0.12em] text-heading/60">Navigate</p>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkCls}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-small mb-4 uppercase tracking-[0.12em] text-heading/60">Get in touch</p>
            <a href={`mailto:${site.email}`} className={linkCls}>{site.email}</a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={linkCls}>{site.phone}</a>
          </div>
          <div>
            <p className="t-small mb-4 uppercase tracking-[0.12em] text-heading/60">Come see us</p>
            <p className="t-h6 text-heading">
              {site.address[0]}
              <br />
              {site.address[1]}
            </p>
          </div>
          <div>
            <p className="t-small mb-4 uppercase tracking-[0.12em] text-heading/60">Socials</p>
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} className={linkCls}>{s.label}</a>
            ))}
          </div>
        </div>

        <p aria-hidden className="mt-16 select-none text-[clamp(4rem,19vw,22rem)] font-bold leading-[0.8] tracking-[-0.05em] text-heading/[0.06]">
          graafex
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <Logo className="t-h6" />
          <span className="t-small">©{new Date().getFullYear()} {site.name}. All rights reserved</span>
          <Clock />
        </div>
      </div>
    </footer>
  );
}
