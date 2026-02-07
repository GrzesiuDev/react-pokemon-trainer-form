import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'standalone',
  // Webpack config for Docker hot reload (only used when --webpack flag is passed)
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
  // Empty turbopack config to allow production builds with Turbopack
  turbopack: {},
}

export default nextConfig
