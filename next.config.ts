import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.dealbeater.co.uk",
          },
        ],
        destination: "https://dealbeater.co.uk/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;