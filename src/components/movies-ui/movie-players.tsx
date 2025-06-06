import React from "react";
import { FlixHQResultsHandler } from "@/utils/movie-requests/request";
import CustomVideoPlayer from "./custom-video-player";

const MoviePlayer = async ({ id }: { id: string }) => {
  // const data = await FlixHQResultsHandler({ movieId: id });

  const vidLinksArray = [
    // { title: "vidsrc.to", link: `https://vidsrc.to/embed/movie/${id}` },
    { title: "p-1", link: `https://vidsrc.pro/embed/movie/${id}` },
    // { title: "player-2", link: `https://playsrc.streamscripts.xyz/embed/movie/${id}` },
    // {
    //   title: "player-3",
    //   link: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`,
    // },
    {
      title: "p-2",
      link: `https://vidsrc.vip/embed/movie/${id}?autoplay=false`,
    },
    // {
    //   title: "player-3",
    //   link: `https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://stable-one.autoembed.cc/movie/${id}`,
    // },
    {
      title: "p-3",
      link: `https://vidsrc.dev/embed/movie/${id}`,
    },
  ];
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
            defaultChecked={items.title === "p-2" ? true : false}
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
            ></iframe>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MoviePlayer;
