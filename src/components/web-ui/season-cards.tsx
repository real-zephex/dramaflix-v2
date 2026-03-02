import { SeasonInfo } from "@/utils/tv-requests/request";
import Image from "next/image";
import Link from "next/link";
import { Star, PlayCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TVSeriesSeasonCardGen = async ({
  id,
  seasonNumber,
}: {
  id: number;
  seasonNumber: number;
}) => {
  const data = await SeasonInfo({ id: id, season: seasonNumber });

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {data && data.episodes && data.episodes!.length > 0 ? (
        data.episodes?.map((item, index) => (
          <Link
            key={index}
            href={`/web-series/watch/${item.season_number}/${item.episode_number}/${id}`}
            className="group block"
          >
            <Card className="overflow-hidden border-border/50 bg-muted/30 hover:bg-muted/50 transition-all duration-300 hover:shadow-xl group">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={
                    item.still_path
                      ? `${process.env.NEXT_PUBLIC_PROXY}https://image.tmdb.org/t/p/original${item.still_path}`
                      : "/placeholder.svg"
                  }
                  fill
                  placeholder="blur"
                  blurDataURL="/placeholder.svg"
                  alt={`Episode ${item.episode_number}`}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <PlayCircle className="h-12 w-12 text-white/90" />
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-black/60 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white px-2 py-0.5 rounded-full border border-white/10">
                    EP {item.episode_number}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-sm font-bold line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-bold">{item.vote_average?.toFixed(1)}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">
                    Stream Now
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      ) : (
        <div className="col-span-full py-20 text-center bg-muted/20 border-2 border-dashed rounded-2xl">
           <p className="text-muted-foreground font-bold italic">No episodes found for this season.</p>
        </div>
      )}
    </div>
  );
};

export default TVSeriesSeasonCardGen;
