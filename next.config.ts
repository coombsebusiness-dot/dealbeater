import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ebayimg.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "images.currys.biz",
      },
      {
        protocol: "https",
        hostname: "media.4rgos.it",
      },
      {
        protocol: "https",
        hostname: "johnlewis.scene7.com",
      },
    ],
  },
};

export default nextConfig;