import { work } from "@/lib/content";
import { Media, Reveal, SwooshButton } from "./ui";

export default function WorkCards() {
  return (
    <section id="work" className="relative z-[2] py-[clamp(4rem,8vw,8rem)]">
      <h2 className="sr-only">Our work</h2>
      <div className="container-x flex flex-col gap-4">
        {work.map((w, i) => (
          <Reveal key={w.name} className="md:w-3/4" delay={i * 60}>
            <a
              href="#"
              className="group relative flex aspect-[4/5] items-end overflow-clip rounded-t-[var(--radius-small)] rounded-bl-[var(--radius-small)] p-[clamp(1.25rem,3vw,3rem)] sm:aspect-video md:rounded-t-[var(--radius-main)] md:rounded-bl-[var(--radius-main)]"
            >
              <Media
                seed={i + 5}
                palette={w.palette}
                className="!absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(35deg,#100c0acc_0%,#ff4d0040_55%,#100c0a33_100%)]" />
              <div className="relative flex w-full flex-col items-center gap-1 text-center md:items-start md:text-left">
                <h3 className="t-h3 mb-2 font-semibold text-white">{w.name}</h3>
                <p className="t-h5 text-white/85">{w.tagline}</p>
              </div>
              <span className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-accent text-bg opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100">
                ↑
              </span>
            </a>
          </Reveal>
        ))}
        <div className="mt-8 md:w-3/4">
          <SwooshButton href="#work">Explore more work</SwooshButton>
        </div>
      </div>
    </section>
  );
}
