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
                      {/* Play icon — fades out while the tile is hovered or focused */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-300 ease-[var(--ease-out)] group-hover:scale-90 group-hover:opacity-0 group-focus-within:opacity-0"
                      >
                        <span className="grid h-14 w-14 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md md:h-16 md:w-16">
                          {/* Triangle's centroid sits on the viewBox centre, so it reads as optically centred */}
                          <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7" fill="currentColor">
                            <path d="M8 5 20 12 8 19Z" />
                          </svg>
                        </span>
                      </span>
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
                    className="group relative flex h-28 items-center justify-center overflow-hidden border-b border-r border-line px-4 text-center md:h-36"
                  >
                    {/* Two colour layers sweep up from the bottom on hover */}
                    <span
                      aria-hidden
                      className="absolute inset-0 translate-y-full bg-accent-deep transition-transform duration-500 ease-[var(--ease)] group-hover:translate-y-0"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 translate-y-full bg-accent transition-transform delay-75 duration-500 ease-[var(--ease)] group-hover:translate-y-0"
                    />
                    <span className="t-h5 relative font-semibold tracking-tight text-heading opacity-60 transition-[opacity,color,transform] duration-500 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:text-bg-2 group-hover:opacity-100">
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
