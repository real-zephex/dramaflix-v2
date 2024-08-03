"use server";

import {
  TrendingPopularTopAiringTV,
  TVSearch,
  TVCredits,
  TVImages,
  TVInfo,
  TVSeasonInfo,
  TVEpisodeInfo,
} from "../types";

const api_key = process.env.TMDB_API_KEY;
const parent_url = `https://api.themoviedb.org/3`;
const NEXT_CACHE_DURATION = 21600;

const requestHandler = async (url: string) => {
  const res = await fetch(url, { next: { revalidate: NEXT_CACHE_DURATION } });
  return await res.json();
};

export const TopPopularAiringTV = async ({
  type = "popular",
}: {
  type: "airing_today" | "top_rated" | "popular";
}) => {
  const url = `${parent_url}/tv/${type}?api_key=${api_key}`;
  return (await requestHandler(url)) as TrendingPopularTopAiringTV;
};

export const InfoImagesCreditsTV = async ({
  type,
  id,
}: {
  type: "info" | "images" | "credits";
  id: number;
}) => {
  const urlMap: Record<string, string> = {
    info: `${parent_url}/tv/${id}?api_key=${api_key}`,
    images: `${parent_url}/tv/${id}/images?api_key=${api_key}`,
    credits: `${parent_url}/tv/${id}/credits?api_key=${api_key}`,
  };

  const url = urlMap[type];

  if (!url) {
    throw new Error("Invalid type provided");
  }

  const response = await requestHandler(url);

  switch (type) {
    case "credits":
      return response as TVCredits;
    case "images":
      return response as TVImages;
    case "info":
    default:
      return response as TVInfo;
  }
};

export const SearchTV = async ({ title }: { title: string }) => {
  const url = `${parent_url}/search/tv?query=${encodeURIComponent(
    title
  )}&api_key=${api_key}`;
  return (await requestHandler(url)) as TVSearch;
};

export const TrendingTV = async ({
  time_window = "day",
}: {
  time_window: "day" | "week";
}) => {
  const url = `${parent_url}/trending/tv/${time_window}?api_key=${api_key}`;
  return (await requestHandler(url)) as TrendingPopularTopAiringTV;
};

export const SeasonInfo = async ({
  id,
  season,
}: {
  id: number;
  season: number;
}) => {
  const url = `${parent_url}/tv/${id}/season/${season}?api_key=${api_key}`;
  return (await requestHandler(url)) as TVSeasonInfo;
};

export const EpisodeInfo = async ({
  id,
  season,
  episode,
}: {
  id: string;
  season: string;
  episode: string;
}) => {
  const url = `${parent_url}/tv/${id}/season/${season}/episode/${episode}?api_key=${api_key}`;
  return (await requestHandler(url)) as TVEpisodeInfo;
};
