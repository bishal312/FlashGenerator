import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "u43okacez0.ufs.sh" }],
  },
};

export default nextConfig;
