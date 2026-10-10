import Link from "next/link";
import type { CaseStudyData } from "@/lib/content";
import { Reveal } from "./ui";
import PortfolioVideo from "./PortfolioVideo";
import PortfolioGallery from "./PortfolioGallery";

export const seedFor = (index: number) => 20 + index * 40;

/** Portfolio-page teaser: cover film, title and summary, linking to the full case study. */
export function CaseStudyCard({ study, index }: { study: CaseStudyData; index: number }) {
  return (
    <Reveal>
      <Link
        href={`/portfolio/${study.slug}`}
        data-hover-play
        className="group grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-end md:gap-12"
      >
        <div className="relative aspect-video overflow-hidden rounded-[var(--radius-main)] bg-bg-2 ring-1 ring-line">
          <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]">
            <PortfolioVideo
              trigger="hover"
              src={study.video.src}
              poster={study.video.poster}
              palette={study.palette}
              seed={seedFor(index)}
              label={`${study.client} case study`}
            />
          </div>
        </div>
        <div>
          <h3 className="t-h3 font-semibold text-heading">{study.title}</h3>
          <p className="t-small mt-6 flex items-center gap-2 font-semibold text-heading">
            View case study
            <span aria-hidden>→</span>
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

function Label({ children }: { children: string }) {
  return <p className="mb-5 text-xs font-medium uppercase tracking-[0.12em] text-accent">{children}</p>;
}

/** Case study body below the main film: details, vertical reels, photography and graphic design. */
export function CaseStudyDetail({ study, index }: { study: CaseStudyData; index: number }) {
  const seed = seedFor(index);
  return (
    <>
      <Reveal as="dl" className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 border-b border-line pb-8 sm:grid-cols-3">
        {study.meta.map((m) => (
          <div key={m.label}>
            <dt className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-accent">{m.label}</dt>
            <dd className="t-small text-heading">{m.value}</dd>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-14">
        <Label>Vertical reels</Label>
        <ul className="-mx-[var(--margin)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--margin)] pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0">
          {study.reels.map((r, i) => (
            <li key={r.title} className="w-[58%] shrink-0 snap-start sm:w-[38%] md:w-auto">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[var(--radius-small)] bg-bg-2 ring-1 ring-line">
                <PortfolioVideo src={r.src} palette={r.palette} seed={seed + 1 + i} label={`${study.client} reel — ${r.title}`} />
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      {study.photos.length > 0 && (
        <Reveal className="mt-14">
          <Label>Photography</Label>
          <PortfolioGallery items={study.photos} seed={seed + 10} />
        </Reveal>
      )}

      {study.designs.length > 0 && (
        <Reveal className="mt-14">
          <Label>Graphic design</Label>
          <PortfolioGallery items={study.designs} seed={seed + 20} />
        </Reveal>
      )}
    </>
  );
}
