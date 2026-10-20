"use client";

import { useEffect, useRef, useState } from "react";

/** Shows a real frame from a video (browsers often leave metadata-only videos black). */
export default function VideoThumb({
  src,
  poster,
  className = "",
  fit = "cover",
  aspect,
}: {
  src: string;
  poster?: string | null;
  className?: string;
  fit?: "cover" | "contain";
  /** Fixed CSS aspect-ratio, e.g. "16 / 9". If omitted, uses natural video ratio once loaded. */
  aspect?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ratio, setRatio] = useState(aspect ?? "16 / 9");

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reveal = () => {
      try {
        if (video.videoWidth > 0 && video.videoHeight > 0 && !aspect) {
          setRatio(`${video.videoWidth} / ${video.videoHeight}`);
        }
        if (video.readyState >= 1 && video.currentTime < 0.05) {
          video.currentTime = Math.min(0.1, (video.duration || 1) * 0.01 || 0.1);
        }
      } catch {
        /* ignore seek errors */
      }
    };

    video.addEventListener("loadedmetadata", reveal);
    video.addEventListener("loadeddata", reveal);
    video.addEventListener("seeked", reveal);
    if (video.readyState >= 1) reveal();

    return () => {
      video.removeEventListener("loadedmetadata", reveal);
      video.removeEventListener("loadeddata", reveal);
      video.removeEventListener("seeked", reveal);
    };
  }, [src, aspect]);

  return (
    <div className={`relative overflow-hidden bg-bg-2 ${className}`} style={{ aspectRatio: ratio }}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={ref}
        src={`${src}#t=0.1`}
        poster={poster || undefined}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"}`}
      />
    </div>
  );
}
