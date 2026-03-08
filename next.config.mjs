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
  "sup-proxy.zephex0-f6c.workers.dev",
  "gogocdn.net",
  "m3u8proxy.zephex0-f6c.workers.dev",
  "m3u8proxy.goodproxy.workers.dev",
  "goodproxy.goodproxy.workers.dev",
  "goodproxy.dramaflix.workers.dev",
  "m3u8proxy.dramaflix.workers.dev",
  "cdn.noitatnemucod.net",
  "i.ytimg.com",
];

const nextConfig = {
  images: {
    remotePatterns: remotePatterns.map((hostname) => ({
      hostname,
    })),
    unoptimized: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
