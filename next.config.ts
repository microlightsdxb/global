import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    dangerouslyAllowSVG:true,
    domains: ["dl.dropboxusercontent.com"],
    unoptimized: true // Add Dropbox domain here
  },
};

export default nextConfig;
