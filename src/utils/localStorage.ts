import { MovieInfoType } from "./types";

function storeIntoLocal({
  movieData,
  status,
}: {
  movieData: MovieInfoType;
  status: "Completed" | "Plan to Watch" | "Watching";
}) {
  try {
    const watchData = localStorage.getItem("watchHistory") || "[]";
    const parsed = JSON.parse(watchData);

    const existingItemIndex = parsed.findIndex(
      (item: { id: number }) => item.id === movieData.id
    );

    if (existingItemIndex !== -1) {
      parsed[existingItemIndex].watch_status = status;
    } else {
      const items = {
        id: movieData.id,
        title: movieData.title,
        poster: movieData.poster_path,
        description: movieData.overview,
        watch_status: status,
      };
      parsed.push(items);
    }
    localStorage.setItem("watchHistory", JSON.stringify(parsed));
    return true;
  } catch (error) {
    console.error(
      "Error occured while trying to save information to local storage."
    );
    return false;
  }
}

function watchStatusRetriever(id: string): string {
  const items = localStorage.getItem("watchHistory") || "[]";
  const parsedItems = JSON.parse(items);

  if (parsedItems.length == 0) {
    return "Not found";
  }

  const index = parsedItems.findIndex((item: { id: string }) => item.id === id);
  if (index !== -1) {
    return parsedItems[index].watch_status as string;
  } else {
    return "Not found";
  }
}

export { storeIntoLocal, watchStatusRetriever };
