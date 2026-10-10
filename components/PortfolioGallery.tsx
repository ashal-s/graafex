import type { CaseStudyData } from "@/lib/content";
import { Media } from "./ui";

const ratios = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
} as const;

type Item = CaseStudyData["gallery"][number];

/** Deal items out left-to-right so reading order is row by row. */
function split(items: Item[], n: number) {
  const cols: { item: Item; i: number }[][] = Array.from({ length: n }, () => []);
  items.forEach((item, i) => cols[i % n].push({ item, i }));
  return cols;
}

function Columns({ items, n, seed, className }: { items: Item[]; n: number; seed: number; className: string }) {
  return (
    <div className={`gap-4 ${className}`}>
      {split(items, n).map((col, c) => (
        <ul key={c} className="flex min-w-0 flex-1 flex-col gap-4">
          {col.map(({ item: g, i }) => (
            <li key={g.title}>
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
      ))}
    </div>
  );
}

/**
 * Masonry built from explicit flex columns (no CSS multi-column, which can drop
 * a column's paint while an ancestor animates). One layout per breakpoint; the
 * others are display:none, so their lazy images are never fetched.
 */
export default function PortfolioGallery({ items, seed = 0 }: { items: Item[]; seed?: number }) {
  return (
    <>
      <Columns items={items} n={1} seed={seed} className="flex sm:hidden" />
      <Columns items={items} n={2} seed={seed} className="hidden sm:flex lg:hidden" />
      <Columns items={items} n={3} seed={seed} className="hidden lg:flex" />
    </>
  );
}
