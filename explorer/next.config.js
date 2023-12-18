/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: { ssr: true },
  },
  output: 'standalone',
}

module.exports = nextConfig
