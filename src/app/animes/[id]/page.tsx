import { AnimeRequestHandler } from "@/utils/anime-requests/request";
import { AnimeInfo } from "@/utils/types";
import AnimeVideoPage from "@/components/anime-ui/video-player";
import AnimeInfoComponent from "@/components/anime-ui/anime-info";

const AnimeInfoPage = async ({ params }: { params: { id: string } }) => {
  const data: AnimeInfo = await AnimeRequestHandler({
    info: true,
    animeId: params.id,
  });

  return (
    <main>
      <AnimeVideoPage data={data} />
      <AnimeInfoComponent animeInfo={data} />
    </main>
  );
};

export default AnimeInfoPage;
