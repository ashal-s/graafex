import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CaseStudyDetail, seedFor } from "@/components/CaseStudy";
import PortfolioVideo from "@/components/PortfolioVideo";
import { Reveal } from "@/components/ui";
import { caseStudies } from "@/lib/case-studies";

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  return { title: study ? study.name : "Case study" };
}

export default async function CaseStudyPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const index = caseStudies.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();
  const study = caseStudies[index];

  return (
    <>
      <Nav />
      <main id="main">
        <section className="relative z-[2] overflow-hidden">
          {/* Main film first — same container as the content below, nav sits over it */}
          <div className="container-x relative py-[var(--margin)]">
            <div className="relative aspect-video min-h-[20rem] w-full overflow-hidden rounded-[var(--radius-main)] bg-bg-2 md:aspect-auto md:h-[calc(100svh-var(--margin)*2)]">
              <PortfolioVideo
                src={study.video}
                poster={study.poster}
                seed={seedFor(index)}
                label={`${study.name} main film`}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(12_8_7/0.55)_0%,transparent_22%)]"
              />
            </div>
          </div>

          <div className="container-x relative pb-[clamp(1.5rem,2.5vw,2.5rem)] pt-[clamp(1.5rem,3vw,2.5rem)]">
            {/* Logo, name and description on the left; services and year on the right */}
            <Reveal
              className="grid gap-10 font-[family-name:var(--font-body)] md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:gap-16"
            >
              <div>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                  {study.logo && (
                    <div className="inline-flex h-16 shrink-0 items-center self-start rounded-[var(--radius-small)] bg-white px-5 sm:self-auto md:h-20 md:px-6">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={study.logo} alt={`${study.name} logo`} className="h-8 w-auto max-w-[12rem] object-contain md:h-10" />
                    </div>
                  )}
                  <h1 className="t-h2 max-w-[22ch] font-[family-name:var(--font-primary)] font-semibold text-heading">
                    {study.name}
                  </h1>
                </div>
                <p className="t-large mt-6 max-w-[40rem] tracking-[-0.005em]">{study.description}</p>
              </div>
              <dl className="grid gap-8">
                <div>
                  <dt className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-accent">Services</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {study.services.map((service) => (
                        <li
                          key={service}
                          className="t-small rounded-full border border-accent bg-accent/15 px-4 py-2 font-medium text-heading"
                        >
                          {service}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-accent">Year</dt>
                  <dd className="t-h2 font-semibold tabular-nums text-heading">{study.year}</dd>
                </div>
              </dl>
            </Reveal>

            <CaseStudyDetail study={study} index={index} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
