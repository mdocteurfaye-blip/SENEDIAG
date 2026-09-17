/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com'],
  },
  experimental: {
    instrumentationHook: true,
  },
}
module.exports = nextConfig
