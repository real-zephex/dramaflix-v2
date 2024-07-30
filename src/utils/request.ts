"use server";

// Movies Related Request

import { MoviesHomepageResults, MovieInfoType } from "./types";

const parent_url = "https://api.themoviedb.org/3";
const api_key = process.env.TMDB_API_KEY;

function urlConstructor(type: string) {
  return `${parent_url}/movie/${type}?api_key=${api_key}`;
}

export async function getRandomMovie(image_only: boolean = false) {
  const endpoints = [
    `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`,
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`,
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`,
  ];

  // Choose a random endpoint
  const randomEndpoint =
    endpoints[Math.floor(Math.random() * endpoints.length)];

  try {
    const response = await fetch(randomEndpoint, { next: { revalidate: 600 } });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: MoviesHomepageResults = await response.json();
    // Choose a random movie from the results
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];

    if (image_only) {
      return `https://image.tmdb.org/t/p/original${randomMovie.poster_path}`;
    } else {
      return randomMovie;
    }
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw error;
  }
}

// Usage
// getRandomMovie().then((movie) => console.log(movie));

// popular, upcoming, top_rated, now_playing
export async function MoviesDiscover(
  type: string,
  _time_window: "day" | "week" = "day"
) {
  let response;
  try {
    if (type == "trending") {
      response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/${_time_window}?api_key=${api_key}`,
        {
          next: { revalidate: 21600 },
        }
      );
    } else {
      response = await fetch(urlConstructor(type), {
        next: { revalidate: 21600 }, // Cache for 6 hours
      });
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: MoviesHomepageResults = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error; // Rethrow the error for further handling if needed
  }
}

export async function MoviesSearchRequest(query: string) {
  try {
    const response = await fetch(
      `${parent_url}/search/movie?api_key=${api_key}&query=${query}`,
      {
        next: { revalidate: 21600 },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: MoviesHomepageResults = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching search resukts:", error);
    throw error;
  }
}

export async function MovieInfo(
  id: string,
  recommendations: boolean = false
): Promise<MovieInfoType> {
  try {
    const url = recommendations
      ? `${parent_url}/movie/${id}/recommendations?api_key=${api_key}`
      : `${parent_url}/movie/${id}?api_key=${api_key}`;

    const response = await fetch(url, {
      next: { revalidate: 21600 }, // Cache for 6 hours
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: MovieInfoType = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie info:", error);
    throw error;
  }
}
