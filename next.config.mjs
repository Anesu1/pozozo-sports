import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  turbopack: {
    root: import.meta.dirname,
    resolveAlias: {
      // @sanity/workbench's "development" export condition points at raw
      // .ts source (meant for its own Vite monorepo build), which breaks
      // Turbopack dev. Force resolution to the compiled dist build instead.
      '@sanity/workbench': './node_modules/@sanity/workbench/dist/index.js',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;

// Gives `next dev` access to local Cloudflare bindings (none currently used
// beyond plain env vars, but this is required by @opennextjs/cloudflare
// regardless) — only initializes the dev platform, never runs in production.
initOpenNextCloudflareForDev();
