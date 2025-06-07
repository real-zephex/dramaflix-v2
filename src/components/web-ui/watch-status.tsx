"use client";

import React, { useEffect, useState } from "react";
import { storeIntoLocal, watchStatusRetriever } from "@/utils/localStorage";
import Link from "next/link";

interface WebSeriesWatchStatusProps {
  id: string;
  season: string;
  episode: string;
  posterPath: string | null;
  title: string;
}

const WebSeriesWatchStatus: React.FC<WebSeriesWatchStatusProps> = ({
  id,
  season,
  episode,
  posterPath,
  title,
}) => {
  const [watchStatus, setWatchStatus] = useState<string>("Not found");

  useEffect(() => {
    const status = watchStatusRetriever(id);
    setWatchStatus(status);
  }, [id]);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    const watchOperationStatus = storeIntoLocal({
      movieData: {
        id,
        title,
        poster_path: posterPath,
        overview: `Season ${season}, Episode ${episode}`,
      } as any,
      status: value as "Completed" | "Plan to Watch" | "Watching",
    });
    if (watchOperationStatus) {
      setWatchStatus(value);
      alert(`You have marked ${title} S${season}E${episode} as ${value}.`);
    } else {
      alert(
        "An error occurred while trying to save your watch status. Please try again."
      );
    }
  }

  return (
    <div className="flex flex-row items-center justify-between py-2 ">
      <span className="font-semibold xl:text-lg lg:text-md md:text-sm text-xs">
        Watching: <span className="text-orange-300">{title}</span>{" "}
        <span className="text-xs mr-1">
          (S{season}E{episode})
        </span>
        on{" "}
        <span className="text-cyan-300 underline underline-offset-4">
          <Link href={"https://free-media.netlify.app"}>Dramaflix</Link>
        </span>
      </span>
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={handleSelectChange}
      >
        <option disabled selected={watchStatus === "Not found"}>
          Mark as?
        </option>
        <option selected={watchStatus === "Completed"}>Completed</option>
        <option selected={watchStatus === "Plan to Watch"}>
          Plan to Watch
        </option>
        <option selected={watchStatus === "Watching"}>Watching</option>
      </select>
    </div>
  );
};

export default WebSeriesWatchStatus;
