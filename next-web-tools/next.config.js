/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'], // 添加你需要的图片域名
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
