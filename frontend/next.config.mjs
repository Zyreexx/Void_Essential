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
};

export default nextConfig;
