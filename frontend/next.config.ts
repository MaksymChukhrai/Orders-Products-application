import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    // Позволяет оптимизировать локальные изображения
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Любые другие настройки, которые у вас уже были
};

export default nextConfig;
