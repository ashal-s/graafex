"use client";

import { useEffect, useState } from "react";
import { clientLogos, testimonials } from "@/lib/content";
import { Eyebrow, Reveal } from "./ui";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const count = testimonials.length;

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % count), 7000);
    return () => clearInterval(id);
  }, [active, count]);

  return (
    <section className="section-light relative z-[2] overflow-hidden py-[clamp(4rem,8vw,8rem)]">
      <div className="container-x">
        <div className="mb-[clamp(3rem,6vw,5rem)] grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="t-h2 font-semibold text-heading">Trusted by teams who care about impact</h2>
          </Reveal>
          <Reveal className="t-large self-end md:col-span-4 md:col-start-9" delay={100}>
            We plug into your team, bringing strategic thinking, creative craft and a real understanding of what you
            need to achieve.
          </Reveal>
        </div>

        <div className="rounded-t-[var(--radius-main)] rounded-bl-[var(--radius-main)] border border-line bg-[linear-gradient(145deg,#ffffffcc,#ff5a1f14)] p-[clamp(1.5rem,4vw,4rem)] shadow-[0_20px_60px_-30px_rgb(255_77_0_/_0.35)]">
          <div className="grid">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                aria-hidden={i !== active}
                className={`col-start-1 row-start-1 transition-all duration-700 ease-[var(--ease-out)] ${i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
              >
                <blockquote className="t-h4 max-w-[48ch] font-medium text-heading">“{t.quote}”</blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-accent font-semibold text-white">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="t-h5 block text-heading">{t.name}</span>
                    <span className="t-small">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between gap-6">
            <div className="flex gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Show testimonial from ${t.name}`}
                  onClick={() => setActive(i)}
                  className="relative h-1 w-10 cursor-pointer overflow-hidden rounded-full bg-heading/15"
                >
                  {i === active && (
                    <span key={active} className="absolute inset-y-0 left-0 w-full origin-left animate-[progress_7s_linear] bg-accent" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  aria-label={d < 0 ? "Previous testimonial" : "Next testimonial"}
                  onClick={() => setActive((a) => (a + d + count) % count)}
                  className="grid h-12 w-12 cursor-pointer place-items-center rounded-[var(--radius-xs)] border border-line text-heading transition-colors hover:border-accent hover:bg-accent hover:text-white"
                >
                  {d < 0 ? "←" : "→"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[clamp(3rem,6vw,6rem)] [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <div className="marquee gap-16 pr-16">
          {[...clientLogos, ...clientLogos].map((name, i) => (
            <span key={i} aria-hidden={i >= clientLogos.length} className="t-h4 flex-none font-bold tracking-tight text-heading/35">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
