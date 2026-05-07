import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: false,

  compress: true,

  images: {
    dangerouslyAllowSVG: true,
    domains: ["dl.dropboxusercontent.com"],
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    optimizeCss: true,
  },
};

export default withBundleAnalyzer(nextConfig);
