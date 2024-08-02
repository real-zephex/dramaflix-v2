"use server";

import Image from "next/image";
import Link from "next/link";

import { DramaSearchRecentPopular } from "@/utils/types";

const DramaSearchFormatter = async ({
  data,
}: {
  data: DramaSearchRecentPopular;
}) => {
  return (
    <div className="flex flex-col mt-4">
      {data.results &&
        data.results.map((item) => (
          <Link
            href={`/kdramas/${item.id?.split("drama-detail/")[1]}`}
            key={item.id}
          >
            <span className="sr-only">View {item.title}</span>
            <section
              key={item.id}
              className="flex flex-row items-center mb-2 bg-base-300 rounded-xl transition delay-50 ease-in-out hover:bg-base-200"
            >
              <Image
                src={item.image ? item.image : "/placeholder.svg"}
                width={100}
                height={150}
                alt={`${item.title} poster`}
                className="rounded-xl border-4 border-zinc-700"
                priority
              />
              <div className="flex-col ml-2">
                <p className="text-xl">{item.title}</p>
              </div>
            </section>
          </Link>
        ))}
    </div>
  );
};

export default DramaSearchFormatter;
