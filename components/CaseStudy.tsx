import type { CaseStudyData } from "@/lib/content";
import { Eyebrow, Reveal } from "./ui";
import PortfolioVideo from "./PortfolioVideo";
import PortfolioGallery from "./PortfolioGallery";

function Label({ children }: { children: string }) {
  return <p className="mb-5 text-xs font-medium uppercase tracking-[0.12em] text-accent">{children}</p>;
}

export default function CaseStudy({ study, index }: { study: CaseStudyData; index: number }) {
  const seed = 20 + index * 40;
  return (
    <article
      id={study.slug}
      className="container-x relative border-t border-line py-[clamp(3.5rem,7vw,6.5rem)]"
      aria-labelledby={`${study.slug}-title`}
    >
      <Reveal className="mb-10 grid gap-6 md:mb-14 md:grid-cols-[1fr_minmax(0,24rem)] md:items-end md:gap-16">
        <div>
          <Eyebrow>{`Case study ${String(index + 1).padStart(2, "0")}`}</Eyebrow>
          <h2 id={`${study.slug}-title`} className="t-h2 font-semibold text-heading">
            {study.title}
          </h2>
        </div>
        <p className="t-small">{study.summary}</p>
      </Reveal>

      {/* Main film */}
      <Reveal>
        <div className="relative aspect-video overflow-hidden rounded-[var(--radius-main)] bg-bg-2 ring-1 ring-line">
          <PortfolioVideo
            src={study.video.src}
            poster={study.video.poster}
            palette={study.palette}
            seed={seed}
            label={`${study.client} main film`}
          />
        </div>
      </Reveal>

      <Reveal as="dl" className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-b border-line pb-8 lg:grid-cols-4">
        {study.meta.map((m) => (
          <div key={m.label}>
            <dt className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-accent">{m.label}</dt>
            <dd className="t-small text-heading">{m.value}</dd>
          </div>
        ))}
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-12">
        {study.narrative.map((n, i) => (
          <Reveal key={n.label} delay={i * 90}>
            <h3 className="t-h5 mb-3 flex items-baseline gap-3 font-semibold text-heading">
              <span className="t-small text-accent">{String(i + 1).padStart(2, "0")}</span>
              {n.label}
            </h3>
            <p className="t-small">{n.body}</p>
          </Reveal>
        ))}
      </div>

      {/* Vertical reels, one line */}
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
    </article>
  );
}
