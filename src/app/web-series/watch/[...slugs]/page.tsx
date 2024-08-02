type Params = {
  season: string; // or number, depending on your use case
  episode: string; // or number
  id: string; // or whatever type id should be
};

const SeriesPlayer = async ({ params }: { params: { slugs: string[] } }) => {
  // Now you can use season, episode, and id as expected
  return (
    <main>
      <div className="container mx-auto">
        <iframe
          src={`https://vidsrc.pro/embed/tv/${params.slugs[2]}/${params.slugs[0]}/${params.slugs[1]}`}
          allowFullScreen
          height={720}
          className="w-full h-[240px] md:h-[480px] lg:h-[720px] rounded-lg"
          sandbox="allow-same-origin allow-scripts"
        ></iframe>
      </div>
    </main>
  );
};

export default SeriesPlayer;
