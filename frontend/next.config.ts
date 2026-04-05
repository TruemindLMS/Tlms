import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://tims-backend-11dz.onrender.com/api/:path*',
      },
    ]
  },
};

export default nextConfig;
