import Link from "next/link";
import Image from "next/image";
import { MdOutlineStar } from "react-icons/md";

import { MoviesDiscover } from "@/utils/request";

const MoviesGridConstructor = async ({ type }: { type: string }) => {
  const data = await MoviesDiscover(type);

  return (
    <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.results &&
        data.results.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl bg-base-300"
          >
            <Link href={`/movies/${item.id}`} className="absolute inset-0 z-10">
              <span className="sr-only">View {item.title}</span>
            </Link>
            <Image
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt={item.title}
              width={500}
              height={750}
              className="w-full"
            />
            <div className="p-4 bg-background">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.overview}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {/* <StarIcon className="h-5 w-5 fill-primary" /> */}
                  <span className="text-base flex items-center">
                    <MdOutlineStar size={20} />
                    {item.vote_average.toString()}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {item.release_date}
                </span>
              </div>
            </div>
          </div>
        ))}
    </main>
  );
};

export default MoviesGridConstructor;
