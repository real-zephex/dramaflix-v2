import { InfoImagesCreditsTV } from "@/utils/tv-requests/request";
import { TVInfo, TVCredits, TVImages } from "@/utils/types";
import { Metadata, ResolvingMetadata } from "next";
import TVSeriesSeasonCardGen from "@/components/web-ui/season-cards";
import SeriesInfoTabs from "@/components/web-ui/series-info-tabs";

import Image from "next/image";
import React from "react";

interface Season {
  seasonNumber: number;
  seasonTitle: string;
}

const SeasonAccordionFormatter = async ({
  data,
  id,
}: {
  data: Season[];
  id: number;
}) => {
  return (
    <div>
      {data && data.length > 0 ? (
        data.map((item, _) => (
          <React.Fragment key={_}>
            <div className="collapse collapse-arrow bg-base-200 rounded-none">
              <input
                type="radio"
                name="my-accordion-2"
                defaultChecked={item.seasonNumber === 1}
              />
              <div className="collapse-title text-xl font-bold">
                {item.seasonTitle}
              </div>
              <div className="collapse-content">
                <TVSeriesSeasonCardGen
                  id={id}
                  seasonNumber={item.seasonNumber}
                />
              </div>
            </div>
          </React.Fragment>
        ))
      ) : (
        <p>No seasons found</p>
      )}
    </div>
  );
};

const WebSeriesInfoPage = async ({ params }: { params: { id: string } }) => {
  const series_info: TVInfo = await InfoImagesCreditsTV({
    type: "info",
    id: parseInt(params.id),
  });
  const credits_data: TVCredits = await InfoImagesCreditsTV({
    type: "credits",
    id: parseInt(params.id),
  });
  const images: TVImages = await InfoImagesCreditsTV({
    type: "images",
    id: parseInt(params.id),
  });

  let tempSeasonInfo = [];
  if (series_info && series_info.number_of_seasons) {
    for (let i = 0; i < series_info.number_of_seasons; i++) {
      let tempData = {
        seasonNumber: i + 1,
        seasonTitle: `Season ${i + 1}`,
      };
      tempSeasonInfo.push(tempData);
    }
  }
  const SeasonInfo = tempSeasonInfo;

  return (
    <main className="">
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${series_info.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", // Ensures the image covers the entire area
          backgroundPosition: "center", // Centers the image
        }}
      >
        <div className="py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 2xl:py-26 px-4 bg-gradient-to-b from-base-300 via-base-100/50 to-base-200 flex flex-row items-center">
          <Image
            src={
              series_info.poster_path
                ? `https://image.tmdb.org/t/p/original${series_info.poster_path}`
                : "/placeholder.svg"
            }
            width={150}
            height={200}
            alt="Series poster"
          />
          <div className="flex flex-col ml-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              {series_info.name}
            </h1>
            <p>{series_info.tagline || ""}</p>
          </div>
        </div>
      </div>
      <SeriesInfoTabs
        data={series_info}
        credits={credits_data}
        artwork={images}
      />      <div className="join join-vertical w-full">
        <SeasonAccordionFormatter data={SeasonInfo} id={parseInt(params.id)} />
      </div>
    </main>
  );
};

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    // Fetch series information
    const seriesInfo = (await InfoImagesCreditsTV({
      type: "info",
      id: parseInt(params.id),
    })) as TVInfo;

    if (!seriesInfo) {
      return {
        title: "Series Not Found",
        description: "The requested series could not be found.",
      };
    }

    // Create title with series name and year
    const releaseYear = seriesInfo.first_air_date
      ? new Date(seriesInfo.first_air_date).getFullYear()
      : "";
    const title = `${seriesInfo.name}${
      releaseYear ? ` (${releaseYear})` : ""
    } - TV Series | Dramaflix`;

    // Use series overview as description
    const description =
      seriesInfo.overview ||
      `Watch ${seriesInfo.name} TV series on Dramaflix. ${seriesInfo.tagline || ""
        }`.trim();

    // Determine the best image to use with proxy
    const imageUrl =
      seriesInfo.backdrop_path
        ? `${process.env.NEXT_PUBLIC_PROXY}https://image.tmdb.org/t/p/original${seriesInfo.backdrop_path}`
        : seriesInfo.poster_path
          ? `${process.env.NEXT_PUBLIC_PROXY}https://image.tmdb.org/t/p/original${seriesInfo.poster_path}`
          : "/placeholder.svg";

    // Create keywords from genres and series info
    const genres =
      seriesInfo.genres?.map((genre: any) => genre.name).join(", ") || "";
    const networks =
      seriesInfo.networks?.map((network: any) => network.name).join(", ") ||
      "";
    const keywords = `${seriesInfo.name}, TV series, ${genres}, ${networks}, streaming, watch online`;

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        type: "video.tv_show",
        images: [
          {
            url: imageUrl,
            width: 1920,
            height: 1080,
            alt: `${seriesInfo.name} TV Series Poster`,
          },
        ],
        siteName: "Dramaflix",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "TV Series - Dramaflix",
      description: "Watch TV series on Dramaflix.",
    };
  }
}

export default WebSeriesInfoPage;
