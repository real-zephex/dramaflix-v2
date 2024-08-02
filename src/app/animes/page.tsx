import AnimeHomepageCards from "@/components/anime-ui/homepage-cards";

import { AnimeRequestHandler } from "@/utils/anime-requests/request";

const AnimeHomepage = async () => {
  const popular = await AnimeRequestHandler({ popular: true });
  const trending = await AnimeRequestHandler({ trending: true });
  const recent = await AnimeRequestHandler({ recent: true });

  return (
    <main className="container mx-auto">
      <div className="divider divider-primary py-4 text-2xl lg:text-3xl font-bold">
        Popular Animes
      </div>

      <AnimeHomepageCards data={popular} />
      <div className="divider divider-primary py-4 text-2xl lg:text-3xl font-bold">
        Trending Animes
      </div>
      <AnimeHomepageCards data={trending} />
    </main>
  );
};

export default AnimeHomepage;
