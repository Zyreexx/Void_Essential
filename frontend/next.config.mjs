/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // GSAP timelines work smoothly
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://127.0.0.1:5001/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
