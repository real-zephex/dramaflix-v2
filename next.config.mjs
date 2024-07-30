/** @type {import('next').NextConfig} */
const remotePatterns = ["image.tmdb.org"];

const nextConfig = {
  images: {
    remotePatterns: remotePatterns.map((hostname) => ({
      hostname,
    })),
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
