import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollParallax from "@/components/ScrollParallax";
import { CaseStudyDetail, seedFor } from "@/components/CaseStudy";
import PortfolioVideo from "@/components/PortfolioVideo";
import { Media, Reveal } from "@/components/ui";
import { caseStudies } from "@/lib/content";

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  return { title: study ? study.title : "Case study" };
}

export default async function CaseStudyPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const index = caseStudies.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();
  const study = caseStudies[index];

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

          {/* Main film first — same container as the content below, nav sits over it */}
          <div className="container-x relative py-[var(--margin)]">
            <div className="relative aspect-video min-h-[20rem] w-full overflow-hidden rounded-[var(--radius-main)] bg-bg-2 md:aspect-auto md:h-[calc(100svh-var(--margin)*2)]">
              <PortfolioVideo
                src={study.video.src}
                poster={study.video.poster}
                palette={study.palette}
                seed={seedFor(index)}
                label={`${study.client} main film`}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(12_10_18/0.55)_0%,transparent_22%,transparent_65%,rgb(12_10_18/0.7)_100%)]"
              />
              <h1 className="absolute inset-x-0 bottom-0 truncate p-[var(--margin)] text-[clamp(1rem,0.7rem+1.6vw,2.25rem)] font-semibold leading-tight tracking-tight text-heading md:px-[calc(var(--margin)*1.5)] md:pb-[calc(var(--margin)*1.25)]">
                {study.title}
              </h1>
            </div>
          </div>

          <div className="container-x relative pb-[clamp(3.5rem,7vw,6.5rem)] pt-[clamp(1.5rem,3vw,2.5rem)]">
            <Reveal className="mb-12 md:mb-16">
              <p className="t-large max-w-[40rem]">{study.summary}</p>
            </Reveal>

            <CaseStudyDetail study={study} index={index} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
