import type { NextConfig } from "next";

const r2Host = (() => {
  try {
    const url = process.env.R2_PUBLIC_URL;
    if (!url) return null;
    return new URL(url).hostname;
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  // Next 16.3 defaults this on; it has caused unbounded RSC prefetch loops.
  experimental: {
    optimisticRouting: false,
  },
  images: {
    remotePatterns: r2Host
      ? [
          {
            protocol: "https",
            hostname: r2Host,
          },
        ]
      : [],
  },
};

export default nextConfig;
