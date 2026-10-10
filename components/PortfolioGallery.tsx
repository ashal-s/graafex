import { ParallaxScroll } from "@/components/aceternity/parallax-scroll";
import { imageSize, type Size } from "@/lib/image-size";

type Item = { src: string; alt: string };

/** Deal items out left-to-right so reading order is row by row. */
function split(items: Item[], n: number) {
  const cols: { item: Item; i: number }[][] = Array.from({ length: n }, () => []);
  items.forEach((item, i) => cols[i % n].push({ item, i }));
  return cols;
}

/** Plain stacked columns for phones and tablets, where parallax would make columns collide. */
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
                {/* Natural proportions: width/height reserve the right space before the image loads. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  width={sizes[i]?.width}
                  height={sizes[i]?.height}
                  loading="lazy"
                  className="block h-auto w-full transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                />
              </figure>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

/**
 * Case study photos. Desktop: Aceternity parallax-scroll (3 columns drifting in
 * opposite directions). Smaller screens: simple 1/2 column stacks.
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
      <div className="hidden lg:block">
        <ParallaxScroll
          images={items.map((item, i) => ({ ...item, width: sizes[i]?.width, height: sizes[i]?.height }))}
        />
      </div>
    </>
  );
}
