"use server";

import Image from "next/image";
import Link from "next/link";

import { AnimeSearch } from "@/utils/types";

const AnimesSearchFormatter = async ({ data }: { data: AnimeSearch }) => {
  return (
    <div className="flex flex-col mt-4">
      {data.results &&
        data.results.map((item) => (
          <Link href={`/animes/${item.id}`} key={item.id}>
            <span className="sr-only">
              View {item.title?.english || item.title?.romaji}
            </span>
            <section
              key={item.id}
              className="flex flex-row items-center mb-2 bg-base-300 rounded-xl transition delay-50 ease-in-out hover:bg-base-200"
            >
              <Image
                src={item.image ? item.image : "/placeholder.svg"}
                width={100}
                height={150}
                alt={`${item.title?.native} poster`}
                className="rounded-l-xl"
                priority
              />
              <div className="flex-col ml-2">
                <p className="text-xl">
                  {item.title?.english || item.title?.userPreferred}
                </p>
                <div className="flex flex-row items-center">
                  {item.releaseDate && (
                    <div className="badge badge-accent badge-outline">
                      {item.releaseDate}
                    </div>
                  )}
                  {item.genres &&
                    item.genres.map((item, _) => (
                      <div
                        className="badge badge-primary badge-outline ml-1"
                        key={_}
                      >
                        {item}
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </Link>
        ))}
    </div>
  );
};

export default AnimesSearchFormatter;
