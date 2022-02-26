/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return []
  },
  async rewrites() {
    return [
    ]
  },
  experimental: {
    reactMode: 'concurrent',
    concurrentFeatures: true,
    serverComponents: true,
  }
}

module.exports = nextConfig
