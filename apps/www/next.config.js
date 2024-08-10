/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.freevue.dev',
      },
    ],
  },
}

module.exports = nextConfig
