import { DramaInfo, DramaSearchRecentPopular } from "@/utils/types";

import Link from "next/link";
import Image from "next/image";

const KdramaHomecard = async ({
  dramaData,
}: {
  dramaData: DramaSearchRecentPopular;
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 p-2 my-4">
      {dramaData.results &&
        dramaData.results.slice(0, 20).map((item, index) => (
          <Link
            href={`/kdramas/${item.id?.split("/drama-detail/")[1]}`}
            key={index}
            className="rounded-md group bg-[#2e3440]/20"
          >
            <Image
              src={item.image ? item.image : "/placeholder.svg"}
              width={200}
              height={300}
              alt={`${item.title} poster`}
              className="w-full h-72 xl:h-80 2xl:h-[23.5rem]  group-hover:opacity-80 transition-opacity rounded-t-md"
              placeholder="blur"
              blurDataURL="/placeholder.svg"
              quality={100}
            />
            <h3 className="mt-2 text-md font-medium pb-2 px-2">{item.title}</h3>
          </Link>
        ))}
    </div>
  );
};

export default KdramaHomecard;
