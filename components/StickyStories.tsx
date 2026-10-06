import { stickyWords } from "@/lib/content";
import { Media } from "./ui";

// Column placement + aspect ratio for each floating tile (12-col grid).
const tiles = [
  { col: "col-start-2 col-span-3", ratio: "aspect-square" },
  { col: "col-start-8 col-span-4", ratio: "aspect-video" },
  { col: "col-start-1 col-span-4", ratio: "aspect-[3/2]" },
  { col: "col-start-9 col-span-3", ratio: "aspect-[2/3]" },
  { col: "col-start-4 col-span-3", ratio: "aspect-[3/2]" },
  { col: "col-start-10 col-span-3", ratio: "aspect-video" },
  { col: "col-start-2 col-span-2", ratio: "aspect-square" },
  { col: "col-start-7 col-span-4", ratio: "aspect-[3/2]" },
  { col: "col-start-3 col-span-4", ratio: "aspect-video" },
  { col: "col-start-9 col-span-2", ratio: "aspect-[2/3]" },
];

const palettes = [
  ["#ff4d00", "#5c1a00"],
  ["#ff7a33", "#3a1208"],
  ["#ff9a5c", "#1a0c08"],
  ["#ff5a1f", "#2a1008"],
];

export default function StickyStories() {
  return (
    <section aria-label="Selected moments" className="relative -mt-[30vh] min-h-screen">
      <div className="sticky top-0 z-0 flex h-screen flex-col items-center justify-center px-[var(--margin)]">
        <div className="pointer-events-none select-none text-center">
          <h2 className="t-h1 whitespace-nowrap font-bold text-heading">{stickyWords[0]}</h2>
          <h2 className="t-h1 whitespace-nowrap font-bold text-transparent [-webkit-text-stroke:2px_var(--accent)]">
            {stickyWords[1]}
          </h2>
        </div>
      </div>

      <div className="container-x relative z-[1] -mt-[60vh] grid grid-cols-12 gap-x-4 gap-y-[clamp(4rem,10vw,8rem)] pb-[30vh]">
        {tiles.map((t, i) => (
          <Media
            key={i}
            seed={i}
            palette={palettes[i % palettes.length]}
            className={`${t.col} ${t.ratio} rounded-t-[var(--radius-xs)] rounded-bl-[var(--radius-xs)] max-md:col-span-6 max-md:odd:col-start-1 max-md:even:col-start-7 ${i % 3 === 2 ? "max-md:hidden" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}
