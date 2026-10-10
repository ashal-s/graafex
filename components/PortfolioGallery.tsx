import type { CaseStudyData } from "@/lib/content";
import { imageSize, type Size } from "@/lib/image-size";
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

function Columns({
  items,
  n,
  seed,
  sizes,
  className,
}: {
  items: Item[];
  n: number;
  seed: number;
  sizes: (Size | null)[];
  className: string;
}) {
  return (
    <div className={`gap-4 ${className}`}>
      {split(items, n).map((col, c) => (
        <ul key={c} className="flex min-w-0 flex-1 flex-col gap-4">
          {col.map(({ item: g, i }) => (
            <li key={g.title}>
              <figure className="relative overflow-hidden rounded-[var(--radius-small)] ring-1 ring-line">
                {g.src ? (
                  // Natural proportions: width/height reserve the right space before the image loads.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={g.src}
                    alt={g.title}
                    width={sizes[i]?.width}
                    height={sizes[i]?.height}
                    loading="lazy"
                    className="block h-auto w-full"
                  />
                ) : (
                  <div className={`relative ${ratios[g.ratio ?? "landscape"]}`}>
                    <Media palette={g.palette} seed={seed + i} className="!absolute inset-0" />
                  </div>
                )}
              </figure>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

/**
 * Masonry of explicit flex columns, with every image at its own aspect ratio.
 * No CSS multi-column (it can drop a column's paint while an ancestor animates).
 * One layout per breakpoint; the others are display:none, so their lazy images
 * are never fetched.
 */
export default function PortfolioGallery({ items, seed = 0 }: { items: Item[]; seed?: number }) {
  const sizes = items.map((g) => (g.src ? imageSize(g.src) : null));
  return (
    <>
      <Columns items={items} n={1} seed={seed} sizes={sizes} className="flex sm:hidden" />
      <Columns items={items} n={2} seed={seed} sizes={sizes} className="hidden sm:flex lg:hidden" />
      <Columns items={items} n={3} seed={seed} sizes={sizes} className="hidden lg:flex" />
    </>
  );
}
