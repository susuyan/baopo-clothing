import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "img.k3cdn.com",
      },
      {
        protocol: "http",
        hostname: "shop10612182776.juyi5.cn",
      },
    ],
  },
};

export default nextConfig;
