"use server";

const parent_url = process.env.CONSUMET_API_URL;

import { AnimeInfo, AnimeSearch, AnimeLinks } from "../types";

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
}): Promise<AnimeSearch | AnimeInfo | AnimeLinks | any> => {
  const url =
    search && searchQuery
      ? `${parent_url}/meta/anilist/${encodeURIComponent(searchQuery)}`
      : info && animeId
      ? `${parent_url}/meta/anilist/info/${animeId}`
      : watch && episodeId
      ? `${parent_url}/meta/anilist/watch/${episodeId}`
      : trending
      ? `${parent_url}/meta/anilist/trending`
      : popular
      ? `${parent_url}/meta/anilist/popular`
      : recent
      ? `${parent_url}/meta/anilist/recent-episodes`
      : "";

  try {
    const res = await fetch(url, { next: { revalidate: 21600 } });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    return search || trending
      ? (data as AnimeSearch)
      : info
      ? (data as AnimeInfo)
      : watch
      ? (data as AnimeLinks)
      : data;
  } catch (error) {
    console.log("Some Error occuredL ", error);
    throw error;
  }
};
