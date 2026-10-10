import type { CSSProperties } from "react";
import { imageSize, type Size } from "@/lib/image-size";

type Item = { src: string; alt: string };

/** Deal items out left-to-right so reading order is row by row. */
function split(items: Item[], n: number) {
  const cols: { item: Item; i: number }[][] = Array.from({ length: n }, () => []);
  items.forEach((item, i) => cols[i % n].push({ item, i }));
  return cols;
}

function Columns({
  items,
  n,
  sizes,
  className,
}: {
  items: Item[];
  n: number;
  sizes: (Size | null)[];
  className: string;
}) {
  return (
    <div className={`gap-4 ${className}`}>
      {split(items, n).map((col, c) => (
        <ul key={c} className="flex min-w-0 flex-1 flex-col gap-4">
          {col.map(({ item, i }) => (
            <li key={`${item.src}-${i}`}>
              <figure className="group relative overflow-hidden rounded-[var(--radius-small)] bg-bg-2 ring-1 ring-line">
                {/*
                  Natural proportions: width/height reserve the right space before the image loads.
                  The photo is scaled slightly past its frame and drifts inside it on scroll
                  (.parallax is driven by <ScrollParallax />). 5% travel x 1.5 clamp stays within
                  the 8% overscan of scale 1.16.
                */}
                <div className="parallax" style={{ "--y": "5%" } as CSSProperties}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={sizes[i]?.width}
                    height={sizes[i]?.height}
                    loading="lazy"
                    className="block h-auto w-full scale-[1.16] transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.22]"
                  />
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
 * Masonry of explicit flex columns, with every image at its own aspect ratio.
 * No CSS multi-column (it can drop a column's paint while an ancestor animates).
 * One layout per breakpoint; the others are display:none, so their lazy images
 * are never fetched.
 */
export default function PortfolioGallery({ items }: { items: Item[] }) {
  const sizes = items.map((g) => imageSize(g.src));
  return (
    <>
      <Columns items={items} n={1} sizes={sizes} className="flex sm:hidden" />
      <Columns items={items} n={2} sizes={sizes} className="hidden sm:flex lg:hidden" />
      <Columns items={items} n={3} sizes={sizes} className="hidden lg:flex" />
    </>
  );
}
