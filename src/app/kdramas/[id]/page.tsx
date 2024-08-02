import DramaVideoPage from "@/components/kdrama-ui/video-player";
import DramaInfoComponent from "@/components/kdrama-ui/drama-info";
import { DramaInfoFetcher } from "@/utils/kdrama-requests/request";

const KdramaInfoPage = async ({ params }: { params: { id: string } }) => {
  const dramaData = await DramaInfoFetcher({ dramaId: params.id });

  return (
    <main>
      <DramaVideoPage data={dramaData} />
      <DramaInfoComponent data={dramaData} />
    </main>
  );
};

export default KdramaInfoPage;
