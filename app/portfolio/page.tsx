import type { CSSProperties } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollParallax from "@/components/ScrollParallax";
import PortfolioVideo from "@/components/PortfolioVideo";
import { CaseStudyCard } from "@/components/CaseStudy";
import { Eyebrow, Media, Reveal } from "@/components/ui";
import { caseStudies, clientLogos, portfolioVideos } from "@/lib/content";

export const metadata = { title: "Portfolio" };

const sectionPad = "container-x relative py-[clamp(1.75rem,3.5vw,3rem)]";

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
          <div className="container-x relative pb-[clamp(1.75rem,3.5vw,3rem)] pt-28 md:pt-36" id="films">
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
          <div className={`${sectionPad}`} id="clients">
            <Reveal className="mb-10 md:mb-14">
              <Eyebrow dot={false}>Clients</Eyebrow>
            </Reveal>
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
          <div className={`${sectionPad}`} id="case-studies">
            <div className="flex flex-col gap-16 md:gap-24">
              {caseStudies.map((study, i) => (
                <CaseStudyCard key={study.slug} study={study} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
