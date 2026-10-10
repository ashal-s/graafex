import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollParallax from "@/components/ScrollParallax";
import { CaseStudyDetail } from "@/components/CaseStudy";
import { Eyebrow, Media, Reveal, SwooshButton } from "@/components/ui";
import { caseStudies, site } from "@/lib/content";

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

          <div className="container-x relative pb-[clamp(3.5rem,7vw,6.5rem)] pt-[clamp(8rem,14vw,12rem)]">
            <Reveal className="mb-12 md:mb-16">
              <Link href="/portfolio#case-studies" className="t-small mb-8 inline-flex items-center gap-2 text-heading hover:text-accent">
                <span aria-hidden>←</span> Back to portfolio
              </Link>
              <div className="grid gap-6 md:grid-cols-[1fr_minmax(0,24rem)] md:items-end md:gap-16">
                <div>
                  <Eyebrow>{`Case study ${String(index + 1).padStart(2, "0")}`}</Eyebrow>
                  <h1 className="ink-fade t-h1 font-semibold">{study.title}</h1>
                </div>
                <p className="t-small">{study.summary}</p>
              </div>
            </Reveal>

            <CaseStudyDetail study={study} index={index} />

            <Reveal className="mt-20 flex flex-col gap-8 border-t border-line pt-12 md:flex-row md:items-end md:justify-between">
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
