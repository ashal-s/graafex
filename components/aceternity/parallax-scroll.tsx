"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Aceternity "Parallax Scroll" (added with `shadcn add @aceternity/parallax-scroll`),
 * adapted for this site:
 *  - scrolls with the page instead of an inner fixed-height scroll box
 *  - every image keeps its own aspect ratio (no fixed 400x400 crop)
 *  - images are dealt across the columns left-to-right
 *  - columns start level as the section enters the screen, alternate columns
 *    pull ahead mid-scroll, then settle level again as the section's bottom
 *    reaches the bottom of the screen (so there is no gap above the footer)
 */
export type ParallaxImage = { src: string; alt: string; width?: number; height?: number };

export const ParallaxScroll = ({
  images,
  columns = 3,
  distance = 120,
  className,
}: {
  images: ParallaxImage[];
  columns?: number;
  /** Peak extra upward travel in px of the moving columns, reached mid-scroll. */
  distance?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const d = reduceMotion ? 0 : distance;
  // Level at both ends of the pass, peak travel in the middle.
  const up = useTransform(scrollYProgress, [0, 0.5, 1], [0, -d, 0]);

  const parts = Array.from({ length: columns }, () => [] as ParallaxImage[]);
  images.forEach((img, i) => parts[i % columns].push(img));

  return (
    <div
      ref={ref}
      className={cn("grid items-start gap-4", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {parts.map((part, c) => (
        <motion.ul key={c} style={c % 2 ? undefined : { y: up }} className="grid gap-4">
          {part.map((img, i) => (
            <li key={`${img.src}-${i}`}>
              <figure className="relative overflow-hidden rounded-[var(--radius-small)] bg-bg-2 ring-1 ring-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  className="block h-auto w-full"
                />
              </figure>
            </li>
          ))}
        </motion.ul>
      ))}
    </div>
  );
};
