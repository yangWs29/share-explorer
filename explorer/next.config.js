/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: { ssr: true },
  },
  images: {
    deviceSizes: [750],
    imageSizes: [384],
  },
  output: 'standalone',
  reactStrictMode: false,
  swcMinify: false,
  transpilePackages: [],
}

module.exports = nextConfig
