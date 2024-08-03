/** @type {import('next').NextConfig} */
const remotePatterns = [
  "image.tmdb.org",
  "s4.anilist.co",
  "media.kitsu.io",
  "artworks.thetvdb.com",
  "asianimg.pro",
  "img.freepik.com",
  "i.pinimg.com",
  "cdn.myanimelist.net",
];

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
