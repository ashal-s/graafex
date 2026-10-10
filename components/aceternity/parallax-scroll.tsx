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
 *  - alternate columns travel in opposite directions and line up mid-screen
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
  /** Max travel in px, up or down, across the section's pass through the viewport. */
  distance?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const d = reduceMotion ? 0 : distance;
  const up = useTransform(scrollYProgress, [0, 1], [d, -d]);
  const down = useTransform(scrollYProgress, [0, 1], [-d, d]);

  const parts = Array.from({ length: columns }, () => [] as ParallaxImage[]);
  images.forEach((img, i) => parts[i % columns].push(img));

  return (
    <div
      ref={ref}
      className={cn("grid items-start gap-4", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, paddingBottom: d }}
    >
      {parts.map((part, c) => (
        <motion.ul key={c} style={{ y: c % 2 ? down : up }} className="grid gap-4">
          {part.map((img, i) => (
            <li key={`${img.src}-${i}`}>
              <figure className="group relative overflow-hidden rounded-[var(--radius-small)] bg-bg-2 ring-1 ring-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  className="block h-auto w-full transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                />
              </figure>
            </li>
          ))}
        </motion.ul>
      ))}
    </div>
  );
};
