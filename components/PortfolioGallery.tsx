import type { CaseStudyData } from "@/lib/content";
import { Media } from "./ui";

const ratios = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
} as const;

export default function PortfolioGallery({
  items,
  seed = 0,
}: {
  items: CaseStudyData["gallery"];
  seed?: number;
}) {
  return (
    <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
      {items.map((g, i) => (
        <li key={g.title} className="break-inside-avoid">
          <figure className="relative overflow-hidden rounded-[var(--radius-small)] ring-1 ring-line">
            <div className={`relative ${ratios[g.ratio]}`}>
              {g.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={g.src} alt={g.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <Media palette={g.palette} seed={seed + i} className="!absolute inset-0" />
              )}
            </div>
          </figure>
        </li>
      ))}
    </ul>
  );
}
