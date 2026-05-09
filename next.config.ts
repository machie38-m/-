import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@consumet/extensions'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'got-scraping': 'got-scraping/dist/index.js',
    };
    return config;
  },
};

export default nextConfig;
