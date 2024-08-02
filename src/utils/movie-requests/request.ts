"use server";

// Movies Related Request

import { MoviesHomepageResults, MovieInfoType } from "../types";

// Constants
const BASE_URL = "https://api.themoviedb.org/3";
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

// Get a random movie from various endpoints
export async function getRandomMovie(imageOnly: boolean = false) {
  const endpoints = ["movie/popular", "movie/top_rated", "movie/upcoming"];

  const randomEndpoint =
    endpoints[Math.floor(Math.random() * endpoints.length)];
  const url = constructUrl(randomEndpoint);

  try {
    const response = await fetch(url, { next: { revalidate: 86400 } });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data: MoviesHomepageResults = await response.json();
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];

    return imageOnly
      ? `https://image.tmdb.org/t/p/original${randomMovie.poster_path}`
      : randomMovie;
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw error;
  }
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
