import MoviePlayer from "@/components/movies-ui/movie-players";
import { MovieInfo, MovieCredits } from "@/utils/movie-requests/request";
import MoreMovieInfo from "@/components/movies-ui/movie-info-tabs";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const data = await MovieInfo(params.id);

    if (!data) {
      return {
        title: "Movie Not Found",
        description: "The requested movie could not be found.",
      };
    }

    return {
      title: data.title,
      description: data.overview || `Watch ${data.title} on Dramaflix`,
      openGraph: {
        title: data.title,
        description: data.overview || `Watch ${data.title} on Dramaflix`,
        images: [
          {
            url: data.poster_path
              ? `${
                  process.env.NEXT_PUBLIC_PROXY
                }https://image.tmdb.org/t/p/original${
                  data.backdrop_path || data.poster_path
                }`
              : "/placeholder.svg",
            width: 800,
            height: 600,
            alt: `${data.title} poster`,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Error",
      description: "Failed to load movie information",
    };
  }
}

const MovieInfoPage = async ({ params }: { params: { id: string } }) => {
  const data = await MovieInfo(params.id);
  const recommendations: any = await MovieInfo(params.id, true);
  const movieCast = await MovieCredits({ id: params.id, type: "credits" });
  const imagesData = await MovieCredits({ id: params.id, type: "images" });

  return (
    <main className="bg-gradient-to-b from-base-300 to-base-100">
      <div className="container mx-auto">
        <div className="py-2 flex flex-col ">
          <MoviePlayer id={params.id} movieData={data!} />
        </div>
        {data && (
          <div className="flex flex-row items-center bg-base-200/50 rounded-xl">
            <Image
              src={
                data.poster_path
                  ? `https://image.tmdb.org/t/p/original${data.poster_path}`
                  : "/placeholder.svg"
              }
              width={150}
              height={200}
              alt={`${data.title} poster`}
              className="rounded-l-xl"
            />
            <div className="ml-2">
              <p className="font-semibold text-xl md:text-2xl">
                {data.title}{" "}
                {data.title === data.original_title
                  ? ""
                  : `| ${data.original_title}`}
              </p>
              {data.tagline && (
                <span className="bg-zinc-700 rounded-xl px-2">
                  {data.tagline}
                </span>
              )}
              <p className="hidden md:flex">{data.overview}</p>
            </div>
          </div>
        )}
        <MoreMovieInfo
          data={data ? data : null}
          recommendation_data={recommendations ? recommendations : null}
          cast_data={movieCast}
          images_data={imagesData}
        />
      </div>
    </main>
  );
};

export default MovieInfoPage;
