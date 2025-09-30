/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/w9-studios-landing-page',
  assetPrefix: '/w9-studios-landing-page/',
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export
    domains: ['localhost', 'jgtolentino.github.io'],
  },
  // Enable SWC minification for better performance
  swcMinify: true,
  // Optimize for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
