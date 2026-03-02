"use client";

import React, { useEffect, useState } from "react";
// import { FlixHQResultsHandler } from "@/utils/movie-requests/request";
// import CustomVideoPlayer from "./custom-video-player";
import { MovieInfoType } from "@/utils/types";
import Link from "next/link";
import { storeIntoLocal, watchStatusRetriever } from "@/utils/localStorage";

const MoviePlayer = ({
  id,
  movieData,
}: {
  id: string;
  movieData: MovieInfoType;
}) => {
  // const data = await FlixHQResultsHandler({ movieId: id });

  const [watchStatus, setWatchStatus] = useState<string>("Not found");
  const vidLinksArray = [
    // { title: "vidsrc.to", link: `https://vidsrc.to/embed/movie/${id}` },
    { title: "1", link: `https://embedmaster.link/movie/${id}` },
    // { title: "player-2", link: `https://playsrc.streamscripts.xyz/embed/movie/${id}` },
    // {
    //   title: "2",
    //   link: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`,
    // },
    {
      title: "2",
      link: `https://vidsrc.vip/embed/movie/${id}?autoplay=false`,
    },
    // {
    //   title: "player-3",
    //   link: `https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://stable-one.autoembed.cc/movie/${id}`,
    // },
    {
      title: "3",
      link: `https://vidsrc.icu/embed/movie/${id}`,
    },
  ];

  useEffect(() => {
    const watchStatus = watchStatusRetriever(String(movieData.id));
    setWatchStatus(watchStatus);
  }, []);

  function detectSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    const watchOperationStatus = storeIntoLocal({
      type: "MOVIE",
      movieData,
      status: value as "Completed" | "Plan to Watch" | "Watching",
    });
    if (watchOperationStatus) {
    } else {
      alert(
        "An error occurred while trying to save your watch status. Please try again.",
      );
    }
  }

  return (
    <div role="tablist" className="tabs tabs-boxed">
      {vidLinksArray.map((items, index) => (
        <React.Fragment key={items.title}>
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            id={`tab${index}`}
            className="tab"
            aria-label={items.title}
            defaultChecked={items.title === "1" ? true : false}
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-2 "
          >
            <iframe
              src={items.link}
              allowFullScreen
              height={720}
              className="w-full h-[240px] md:h-[480px] lg:h-[720px] rounded-lg"
            />
            <div className="py-2 flex flex-row items-center justify-between">
              <p className="xl:text-lg lg:text-md md:text-sm text-xs">
                You are watching{" "}
                <span className="text-orange-300">{movieData.title}</span> on{" "}
                <span className="text-cyan-300 underline underline-offset-4">
                  <Link href={"https://free-media.netlify.app"}>Dramaflix</Link>
                </span>
              </p>
              <select
                className="select select-bordered w-full max-w-xs"
                onChange={detectSelectChange}
              >
                <option disabled selected={watchStatus === "Not found"}>
                  Mark as?
                </option>
                <option selected={watchStatus === "Completed"}>
                  Completed
                </option>
                <option selected={watchStatus === "Plan to Watch"}>
                  Plan to Watch
                </option>
                <option selected={watchStatus === "Watching"}>Watching</option>
              </select>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MoviePlayer;
