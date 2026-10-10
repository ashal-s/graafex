import type { CSSProperties, ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollParallax from "@/components/ScrollParallax";
import PortfolioVideo from "@/components/PortfolioVideo";
import PortfolioGallery from "@/components/PortfolioGallery";
import { Eyebrow, Media, Reveal, SwooshButton } from "@/components/ui";
import { caseStudy, clientLogos, portfolioVideos, site } from "@/lib/content";

export const metadata = { title: "Portfolio" };

function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <Reveal className="mb-10 grid gap-6 md:mb-14 md:grid-cols-[1fr_minmax(0,24rem)] md:items-end md:gap-16">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="t-h2 font-semibold text-heading">{title}</h2>
      </div>
      {children && <p className="t-small">{children}</p>}
    </Reveal>
  );
}

const sectionPad = "container-x relative py-[clamp(3.5rem,7vw,6.5rem)]";

export default function Portfolio() {
  return (
    <>
      <Nav />
      <ScrollParallax />
      <main id="main">
        <section className="theme-violet relative z-[2] overflow-hidden">
          <div className="parallax absolute inset-x-0 -inset-y-[20%]" style={{ "--y": "-140px" } as CSSProperties}>
            <Media seed={5} palette={["#5c4a78", "#8a74b0"]} className="!absolute inset-0 opacity-50" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,var(--bg)_70%)]" />

          {/* 3x2 video grid — plays on hover */}
          <h1 className="sr-only">Portfolio</h1>
          <div className="container-x relative pb-[clamp(3.5rem,7vw,6.5rem)] pt-28 md:pt-36" id="films">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {portfolioVideos.map((v, i) => (
                <li key={v.title}>
                  <Reveal delay={(i % 3) * 90}>
                    <div
                      data-hover-play
                      className="group relative aspect-video overflow-hidden rounded-[var(--radius-small)] bg-bg-2 ring-1 ring-line"
                    >
                      <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]">
                        <PortfolioVideo trigger="hover" src={v.src} poster={v.poster} palette={v.palette} seed={i + 1} label={v.title} />
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          {/* Clients */}
          <div className={`${sectionPad} border-t border-line`} id="clients">
            <SectionHead eyebrow="Clients" title="Trusted by organisations we admire">
              From cultural institutions to growing brands, these are some of the teams we have worked with.
            </SectionHead>
            <Reveal>
              <ul className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-5">
                {clientLogos.map((c) => (
                  <li
                    key={c}
                    className="flex h-28 items-center justify-center border-b border-r border-line px-4 text-center md:h-36"
                  >
                    <span className="t-h5 font-semibold tracking-tight text-heading opacity-60 transition-opacity duration-300 hover:opacity-100">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Case study */}
          <div className={`${sectionPad} border-t border-line`} id="case-study">
            <SectionHead eyebrow="Case study" title={caseStudy.title}>
              {caseStudy.summary}
            </SectionHead>

            <Reveal>
              <div className="relative aspect-video overflow-hidden rounded-[var(--radius-main)] bg-bg-2 ring-1 ring-line">
                <PortfolioVideo
                  src={caseStudy.video.src}
                  poster={caseStudy.video.poster}
                  palette={caseStudy.palette}
                  seed={21}
                  label={`${caseStudy.client} launch film`}
                />
              </div>
            </Reveal>

            <Reveal as="dl" className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-b border-line pb-8 lg:grid-cols-4">
              {caseStudy.meta.map((m) => (
                <div key={m.label}>
                  <dt className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-accent">{m.label}</dt>
                  <dd className="t-small text-heading">{m.value}</dd>
                </div>
              ))}
            </Reveal>

            <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-12">
              {caseStudy.narrative.map((n, i) => (
                <Reveal key={n.label} delay={i * 90}>
                  <h3 className="t-h5 mb-3 flex items-baseline gap-3 font-semibold text-heading">
                    <span className="t-small text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {n.label}
                  </h3>
                  <p className="t-small">{n.body}</p>
                </Reveal>
              ))}
            </div>

            {/* 4 vertical reels in one line */}
            <Reveal className="mt-14">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.12em] text-accent">Vertical reels</p>
              <ul className="-mx-[var(--margin)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--margin)] pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0">
                {caseStudy.reels.map((r, i) => (
                  <li key={r.title} className="w-[58%] shrink-0 snap-start sm:w-[38%] md:w-auto">
                    <figure>
                      <div className="relative aspect-[9/16] overflow-hidden rounded-[var(--radius-small)] bg-bg-2 ring-1 ring-line">
                        <PortfolioVideo src={r.src} palette={r.palette} seed={i + 31} label={`${caseStudy.client} reel — ${r.title}`} />
                      </div>
                      <figcaption className="t-small mt-3 text-heading">{r.title}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Photography + graphic design */}
          <div className={`${sectionPad} border-t border-line`} id="stills">
            <SectionHead eyebrow="Stills" title="Photography & graphic design">
              Image-making and identity work, from studio portraits to full brand systems.
            </SectionHead>
            <PortfolioGallery />
          </div>

          {/* CTA */}
          <div className={`${sectionPad} border-t border-line`}>
            <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <Eyebrow>Start a project</Eyebrow>
                <h2 className="t-h2 max-w-[18ch] font-semibold text-heading">Have a story worth telling?</h2>
              </div>
              <SwooshButton href={`mailto:${site.email}`}>Get in touch</SwooshButton>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
