"use client";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useState, useEffect, useMemo, useCallback, memo } from "react";

import { DramaInfo, DramaLinks, DramaEpisode } from "@/utils/types";
import { DramaLinksFetcher } from "@/utils/kdrama-requests/request";

const DramaVideoPage = ({ data }: { data: DramaInfo }) => {
  const mediaId: string = data.id!;
  const [videoPlayer, setVideoPlayer] = useState<JSX.Element>(
    <div className="flex flex-col gap-4 justify-center">
      <div
        className="skeleton h-64 2xl:h-[53.5rem] md:h-[27rem] xl:h-[37rem] w-full"
        aria-label="Loading video player"
      ></div>
    </div>
  );
  const [currentPlaying, setCurrentPlaying] = useState<string>("");
  const [accordionStatus, setAccordionStatus] = useState<"shrink" | "expand">(
    "shrink"
  );

  const memoizedData = useMemo(() => data, [data]);

  const first_entry: DramaEpisode | any = useMemo(
    () => (data.episodes?.length! > 0 ? data.episodes![0] : []),
    [data]
  );

  useEffect(() => {
    const init = async () => {
      await videoFormatter(first_entry.id!);
      setCurrentPlaying(first_entry.title!);
    };

    init();
  }, []);

  const vidLinksFetcher = async (id: string) => {
    const res: DramaLinks = await DramaLinksFetcher({
      dramaId: mediaId,
      episodeId: id,
    });

    if (!res) {
      console.log("No data found");
      return null;
    }

    return res.sources![0].url;
  };

  const videoFormatter = useCallback(
    async (id: string) => {
      setVideoPlayer(
        <div className="flex flex-col justify-center">
          <div
            className="skeleton h-64 2xl:h-[53.5rem] md:h-[27rem] xl:h-[37rem]"
            aria-label="Loading video player"
          ></div>
        </div>
      );
      let url;
      try {
        url = await vidLinksFetcher(id);
      } catch (error) {
        url = "/not_found.mp4";
      }

      const formatted = (
        <MediaPlayer
          src={url!}
          aspectRatio="16/9"
          load="eager"
          playsInline
          volume={1}
        >
          <MediaProvider />

          <DefaultVideoLayout icons={defaultLayoutIcons} />
        </MediaPlayer>
      );

      setVideoPlayer(formatted);
    },
    [memoizedData]
  );

  const toggleAccordion = () => {
    setAccordionStatus((prevStatus) =>
      prevStatus === "shrink" ? "expand" : "shrink"
    );
  };

  return (
    <main>
      <div className="flex 2xl:flex-row flex-col w-full">
        <div className="w-full">{videoPlayer}</div>
        <div className="2xl:w-1/4 w-full 2xl:mt-0">
          <div
            className="collapse bg-gradient-to-b from-base-300 to-base-200/40 rounded-none"
            defaultChecked
            onClick={toggleAccordion}
          >
            <input type="checkbox" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              <b>Episodes</b> - click to {accordionStatus}
              <p className="text-sm">
                Currently playing{" "}
                <span className="text-violet-400">{currentPlaying}</span>
              </p>
            </div>
            <div className="collapse-content w-full">
              <div className="grid grid-cols-5 2xl:grid-cols-5 gap-2 md:grid-cols-10 lg:grid-cols-12 max-h-[15rem] md:max-h-[20rem] lg:max-h-[25rem] xl:max-h-[30rem] 2xl:max-h-[35rem] overflow-auto">
                {memoizedData.episodes && memoizedData.episodes.length > 0 ? (
                  memoizedData.episodes.map((item, _) => (
                    <button
                      key={_}
                      className="btn btn-sm md:btn-xs bg-zinc-800 font-normal w-auto transition duration-75 ease-in-out hover:opacity-80"
                      onClick={() => {
                        videoFormatter(item.id!);
                        setCurrentPlaying(item.title!);
                      }}
                    >
                      EP {item.episode}
                    </button>
                  ))
                ) : (
                  <button className="btn-wide btn btn-error btn-outline ">
                    No episodes found.
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DramaVideoPage;
