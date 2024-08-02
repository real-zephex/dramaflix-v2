import MoviePlayer from "@/components/movies-ui/movie-players";
import { MovieInfo } from "@/utils/movie-requests/request";
import MoreMovieInfo from "@/components/movies-ui/movie-info-tabs";

import Image from "next/image";

const MovieInfoPage = async ({ params }: { params: { id: string } }) => {
  const data = await MovieInfo(params.id);
  const recommendations: any = await MovieInfo(params.id, true);

  return (
    <main className="lg:w-11/12 mx-auto w-full">
      <div className="py-2">
        <MoviePlayer id={params.id} />
      </div>

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
          className="rounded-xl border-2 border-zinc-700"
        />
        <div className="ml-2">
          <p className="font-semibold text-xl md:text-2xl">
            {data.title}{" "}
            {data.title === data.original_title
              ? ""
              : `| ${data.original_title}`}
          </p>
          {data.tagline && (
            <span className="bg-zinc-700 rounded-xl px-2">{data.tagline}</span>
          )}
          <p className="hidden md:flex">{data.overview}</p>
        </div>
      </div>
      <MoreMovieInfo data={data} recommendation_data={recommendations} />
    </main>
  );
};

export default MovieInfoPage;
