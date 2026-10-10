"use client";

import { useState } from "react";
import { gallery, galleryFilters } from "@/lib/content";
import { Media } from "./ui";

const ratios = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
} as const;

export default function PortfolioGallery() {
  const [filter, setFilter] = useState<(typeof galleryFilters)[number]>("All");
  const items = gallery.filter((g) => filter === "All" || g.kind === filter);

  return (
    <div>
      <div role="group" aria-label="Filter gallery" className="mb-10 flex flex-wrap gap-2">
        {galleryFilters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`t-small cursor-pointer rounded-full border px-5 py-2 font-medium transition-colors ${
              filter === f
                ? "border-accent bg-accent text-bg"
                : "border-line text-heading hover:border-accent"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {items.map((g, i) => (
          <li key={g.title} className="break-inside-avoid">
            <figure className="group relative overflow-hidden rounded-[var(--radius-small)]">
              <div className={`relative ${ratios[g.ratio]}`}>
                {g.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={g.src} alt={g.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <Media palette={g.palette} seed={i + 11} className="!absolute inset-0" />
                )}
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#141018]/85 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 max-md:opacity-100">
                <span className="t-small font-medium text-heading">{g.title}</span>
                <span className="text-xs uppercase tracking-[0.12em] text-accent">{g.kind}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
