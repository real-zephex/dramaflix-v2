"use server";

// Movies Related Request

import {
  MoviesHomepageResults,
  MovieInfoType,
  TVCredits,
  TVImages,
  FlixHQResults,
  FlixHQMovieLinks,
} from "../types";

// Constants
const BASE_URL = "https://api.themoviedb.org/3";
const CONSUMET = process.env.CONSUMET_API_URL;
const API_KEY = process.env.TMDB_API_KEY;
const CACHE_DURATION = 21600; // Cache duration in seconds (6 hours)

if (!API_KEY) {
  throw new Error("TMDB_API_KEY is not defined.");
}

// Utility function to construct URL
function constructUrl(
  endpoint: string,
  queryParams: Record<string, string> = {}
) {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.set("api_key", API_KEY!);
  Object.keys(queryParams).forEach((key) =>
    url.searchParams.set(key, queryParams[key])
  );
  return url.toString();
}

// Discover movies based on type and time window
export async function MoviesDiscover(
  type: string,
  timeWindow: "day" | "week" = "day"
) {
  const endpoint =
    type === "trending" ? `trending/movie/${timeWindow}` : `movie/${type}`;

  const url = constructUrl(endpoint);

  try {
    const response = await fetch(url, { next: { revalidate: CACHE_DURATION } });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data: MoviesHomepageResults = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}

// Search for movies based on query
export async function MoviesSearchRequest(query: string) {
  const url = constructUrl("search/movie", { query });

  try {
    const response = await fetch(url, { next: { revalidate: CACHE_DURATION } });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data: MoviesHomepageResults = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}

// Fetch movie details or recommendations
export async function MovieInfo(
  id: string,
  recommendations: boolean = false
): Promise<MovieInfoType> {
  const endpoint = recommendations
    ? `movie/${id}/recommendations`
    : `movie/${id}`;

  const url = constructUrl(endpoint);

  try {
    const response = await fetch(url, {
      next: { revalidate: CACHE_DURATION * 4 },
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data: MovieInfoType = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie info:", error);
    throw error;
  }
}

export async function MovieCredits({
  id,
  type = "credits",
}: {
  id: string;
  type: "credits" | "images";
}) {
  const url = `${BASE_URL}/movie/${id}/${type}?api_key=${API_KEY}`;
  const res = await fetch(url, { cache: "force-cache" });
  // return (await res.json()) as TVCredits;
  if (type === "credits") {
    return (await res.json()) as TVCredits;
  } else {
    return (await res.json()) as TVImages;
  }
}

export const FlixHQResultsHandler = async ({
  movieId,
}: {
  movieId: string;
}) => {
  const url = `${CONSUMET}/meta/tmdb/info/${movieId}?type=movie`;
  const res = await fetch(url, { cache: "force-cache" });
  const data: FlixHQResults = await res.json();
  const { id, episodeId, title, cover } = data;

  const linksData: FlixHQMovieLinks = await fetch(
    `${CONSUMET}/meta/tmdb/watch/${episodeId}?id=${id}`,
    { cache: "force-cache" }
  ).then((response) => response.json());

  const movieLink = linksData.sources?.find(
    (element) => element.quality === "auto"
  );
  const subtitle = linksData.subtitles?.find(
    (element) => element.lang === "English"
  );

  return {
    movieLink,
    subtitle,
    title,
    cover,
  };
};
