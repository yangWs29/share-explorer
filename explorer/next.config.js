/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: { ssr: true },
  },
  output: 'standalone',
  reactStrictMode: false,
}

module.exports = nextConfig
