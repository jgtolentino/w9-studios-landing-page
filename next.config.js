const routes = require('./migration_artifacts/routes-map.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {},
  reactStrictMode: true,
  swcMinify: true,
  experimental: {},
  eslint: {
    dirs: ['app'],
  },
  images: {
    domains: ['static.wixstatic.com'],
    formats: ['image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.wixstatic.com' }
    ]
  },
  async redirects() {
    return routes
      .filter(r => r.status >= 300)
      .map(r => ({
        source: r.from,
        destination: r.to,
        permanent: r.status === 301
      }));
  },
};

module.exports = nextConfig;
