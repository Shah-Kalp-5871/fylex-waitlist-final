import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  basePath: "/fylex-waitlist",
  images: { unoptimized: true },
};

export default nextConfig;
