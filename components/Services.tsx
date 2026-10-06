import { services } from "@/lib/content";
import { Eyebrow, Media, Reveal } from "./ui";

export default function Services() {
  return (
    <section className="relative z-[2] py-[clamp(4rem,8vw,8rem)]">
      <div className="container-x">
        <div className="mb-[clamp(3rem,6vw,6rem)] grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <Eyebrow>What we do</Eyebrow>
            <h2 className="t-h2 font-semibold text-heading">Our capabilities</h2>
          </Reveal>
          <Reveal className="t-large self-end md:col-span-4 md:col-start-9" delay={100}>
            Strategy, design and film under one roof — clear thinking paired with serious craft to move your
            organisation forward.
          </Reveal>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {services.map((s, i) => (
              // Each item sticks a little lower than the last, so they stack as you scroll.
              <article
                key={s.title}
                className="sticky border-t border-line bg-bg/90 pb-10 backdrop-blur-sm"
                style={{ top: `calc(5rem + ${i * 5.5}rem)` }}
              >
                <header className="flex items-center justify-between gap-10 py-8">
                  <h3 className="t-h3 flex items-baseline gap-4 font-semibold text-heading">
                    <span className="t-h4 text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h3>
                  <svg viewBox="0 0 24 24" className="w-8 shrink-0 text-accent" aria-hidden>
                    <path d="M5 19 19 5M8 5h11v11" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </header>
                <div className="max-w-[42rem]">
                  <p className="t-large mb-8">{s.body}</p>
                  <p className="t-small mb-4 font-medium uppercase tracking-[0.12em] text-heading/60">Services include</p>
                  <ul className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-[var(--radius-xs)] border border-accent/25 bg-[linear-gradient(125deg,#ff4d0033,#ff7a3314_50%,transparent)] px-4 py-2.5 text-heading/90"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <Media seed={11} className="sticky top-24 aspect-square rounded-[var(--radius-main)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
