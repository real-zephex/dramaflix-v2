"use server";

const parent_url = process.env.CONSUMET_API_URL;

import {
  AnimeInfo,
  AnimeSearch,
  AnimeLinks,
  GogoanimeSearch,
  GogoanimeInfo,
  GogoEpisode,
} from "../types";

export const AnimeRequestHandler = async ({
  search = false,
  searchQuery = "",
  info = false,
  animeId = "",
  watch = false,
  episodeId = "",
  trending = false,
  popular = false,
  recent = false,
  cacheDuration = 21600,
}: {
  search?: boolean;
  searchQuery?: string;
  info?: boolean;
  animeId?: string;
  watch?: boolean;
  episodeId?: string;
  trending?: boolean;
  popular?: boolean;
  recent?: boolean;
  cacheDuration?: number;
}): Promise<AnimeSearch | AnimeInfo | AnimeLinks | any> => {
  const url =
    search && searchQuery
      ? `${parent_url}/anime/gogoanime/${encodeURIComponent(searchQuery)}`
      : info && animeId
      ? `${parent_url}/anime/gogoanime/info/${animeId}`
      : watch && episodeId
      ? `${parent_url}/anime/gogoanime/watch/${episodeId}`
      : trending
      ? `${parent_url}/anime/gogoanime/top-airing`
      : recent
      ? `${parent_url}/anime/gogoanime/recent-episodes`
      : "";

  try {
    const res = await fetch(url, { next: { revalidate: cacheDuration } });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    return search || trending
      ? (data as GogoanimeSearch)
      : info
      ? (data as GogoanimeInfo)
      : watch
      ? (data as AnimeLinks)
      : data;
  } catch (error) {
    console.log("Some Error occuredL ", error);
    throw error;
  }
};

export async function animeLinksCacher(
  data: GogoEpisode[],
  start: number,
  end: number
) {
  const array = data.slice(start, end);
  try {
    const fetchPromise = array.map(async (element) => {
      await fetch(`${parent_url}/anime/gogoanime/watch/${element.id}`, {
        cache: "force-cache",
      });
    });
    await Promise.all(fetchPromise);
    return true;
  } catch (error) {
    console.error("Error: ", error);
    return false;
  }
}
