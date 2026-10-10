import type { CSSProperties, ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollParallax from "@/components/ScrollParallax";
import PortfolioVideo from "@/components/PortfolioVideo";
import { CaseStudyCard } from "@/components/CaseStudy";
import { Eyebrow, Media, Reveal, SwooshButton } from "@/components/ui";
import { caseStudies, clientLogos, portfolioVideos, site } from "@/lib/content";

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

          {/* Case studies — each card opens its own page with reels, photography and graphic design */}
          <div className={`${sectionPad} border-t border-line`} id="case-studies">
            <SectionHead eyebrow="Case studies" title="In depth">
              A closer look at selected projects, from the main film to the reels, photography and design around it.
            </SectionHead>
            <div className="flex flex-col gap-16 md:gap-24">
              {caseStudies.map((study, i) => (
                <CaseStudyCard key={study.slug} study={study} index={i} />
              ))}
            </div>
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
