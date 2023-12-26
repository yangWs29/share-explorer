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
}

module.exports = nextConfig
