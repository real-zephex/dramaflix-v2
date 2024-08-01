import { AnimeSearch } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";

import { BsStar } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import React from "react";

const AnimeHomepageCards = async ({ data }: { data: AnimeSearch }) => {
  return (
    <main>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-3 p-2">
        {data.results?.map((item) => (
          <Link
            key={item.id}
            href={`/animes/${item.id}`}
            className="relative bg-muted rounded-lg  group bg-base-300 shadow-md"
            title={item.title?.english || item.title?.romaji}
          >
            <Image
              src={item.image ? item.image : "/placeholder.svg"}
              alt={`Anime ${item.malId}`}
              width={500}
              height={700}
              className="w-full h-72 lg:h-96 object-cover group-hover:opacity-80 transition-opacity rounded-t-md"
              quality={100}
              placeholder="blur"
              blurDataURL="/placeholder.svg"
            />
            <div className="absolute top-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-2 bg-neutral-800/90 rounded-bl-xl">
              {item.rating && (
                <div className="flex flex-row items-center">
                  <BsStar className="w-4 h-4 mr-1" />
                  <span>{item.rating! / 10}</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-muted-foreground line-clamp-1">
                {item.title?.english || item.title?.romaji}
              </h3>
            </div>

            <div className="absolute top-0 left-0 right-0 bg-gradient-to-t from-black/40 to-black/90 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-80 h-full flex justify-center items-center">
              <FaPlay size={30} />
            </div>

            <div className="absolute bottom-0 left-0 translate-y-[50%] translate-x-1/3 right-0 bg-zinc-900/90 text-white p-4 hidden transition-opacity duration-300 group-hover:lg:flex z-10 overflow-auto rounded-xl flex-col w-full h-72">
              <h1 className="font-bold text-primary text-xl">
                {item.title?.english || item.title?.romaji}
              </h1>
              <div className="flex flex-row items-center">
                {item.totalEpisodes && (
                  <div className="badge badge-outline badge-md badge-accent">
                    {item.totalEpisodes?.toString()} episodes
                  </div>
                )}
              </div>
              {item.description && (
                <p
                  className="line-clamp-5 text-sm mt-2 overflow-auto"
                  dangerouslySetInnerHTML={{ __html: `${item.description}` }}
                ></p>
              )}
              {item.genres && (
                <p className="mt-1 text-gray-400 font-semibold">
                  Genres:{" "}
                  {item.genres &&
                    item.genres.map((items, index) => (
                      <React.Fragment key={index}>
                        <span className="text-neutral-500 font-normal">
                          {items}
                        </span>
                        {index < item.genres!.length - 1 && ", "}
                      </React.Fragment>
                    ))}
                </p>
              )}
              {item.status && (
                <p className="text-gray-400 font-semibold">
                  Status:{" "}
                  <span className="text-neutral-500 font-normal">
                    {item.status}
                  </span>
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default AnimeHomepageCards;
