import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Velite는 Turbopack 비호환 → 빌드는 `velite build && next build` 순서 고정 (설계서 10.3)
  reactStrictMode: true,
};

export default nextConfig;
