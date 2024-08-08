import { AnimeRequestHandler } from "@/utils/anime-requests/request";
import { AnimeInfo, GogoanimeInfo } from "@/utils/types";
import AnimeVideoPage from "@/components/anime-ui/video-player";
import AnimeInfoComponent from "@/components/anime-ui/anime-info";

const AnimeInfoPage = async ({ params }: { params: { id: string } }) => {
  const data: GogoanimeInfo = await AnimeRequestHandler({
    info: true,
    animeId: params.id,
  });

  return (
    <main className="bg-gradient-to-b from-base-300 to-base-100">
      <AnimeVideoPage data={data} />
      <AnimeInfoComponent animeInfo={data} />
    </main>
  );
};

export default AnimeInfoPage;
