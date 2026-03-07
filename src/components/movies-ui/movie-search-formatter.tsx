import Image from "next/image";
import Link from "next/link";

import { MoviesHomepageResults } from "@/utils/types";

const MoviesSearch = ({
  data,
}: {
  data: MoviesHomepageResults | undefined;
}) => {
  return (
    <div className="flex flex-col mt-4">
      {data && data.results.length > 0 ? (
        data.results.map((item) => (
          <Link href={`/movies/${item.id}`} key={item.id} className="group">
            <span className="sr-only">View {item.title}</span>
            <section
              className="flex flex-row items-center mb-3 bg-white/5 border border-white/10 rounded-2xl transition-all duration-300 group-hover:bg-white/10 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/5 overflow-hidden"
            >
              <div className="relative h-24 w-16 md:h-32 md:w-20 shrink-0 overflow-hidden">
                <Image
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w185${item.poster_path}`
                      : "/placeholder.svg"
                  }
                  fill
                  alt={`${item.title} poster`}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
              <div className="flex flex-col ml-4 pr-4 py-2 gap-1.5">
                <p className="text-base md:text-lg font-display font-bold leading-tight group-hover:text-primary transition-colors">{item.title}</p>
                {item.release_date && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                      {item.release_date.split("-")[0]}
                    </span>
                  </div>
                )}
              </div>
            </section>
          </Link>
        ))
      ) : (
        <p className="py-1 text-center">No results found</p>
      )}
    </div>
  );
};

export default MoviesSearch;
