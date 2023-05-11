/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['127.0.0.1', 'res.cloudinary.com', 'media.graphassets.com'],
  },
};

module.exports = nextConfig;
