"use client";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useState, useEffect, useMemo, useCallback } from "react";

import { AnimeInfo, AnimeLinks, Episode } from "@/utils/types";

import { AnimeRequestHandler } from "@/utils/anime-requests/request";

const AnimeVideoPage = ({ data }: { data: AnimeInfo }) => {
  const [videoPlayer, setVideoPlayer] = useState<JSX.Element>(
    <div className="flex flex-col gap-4 justify-center mb-2">
      <div
        className="skeleton h-64 2xl:h-[47rem] md:h-[27rem] xl:h-[37rem] w-full"
        aria-label="Loading video player"
      ></div>
    </div>
  );
  const [currentPlaying, setCurrentPlaying] = useState<string>("");
  const [buttonGroups, setButtonGroups] = useState<JSX.Element>(<></>);
  const [accordionStatus, setAccordionStatus] = useState<"shrink" | "expand">(
    "shrink"
  );

  const memoizedData = useMemo(() => data, [data]);
  const groups = createGroups(data.episodes!, 100);

  const first_id: any = useMemo(
    () => (data.episodes?.length! > 0 ? data.episodes![0] : []),
    [data]
  );

  useEffect(() => {
    const init = async () => {
      await videoFormatter(first_id.id);
      setCurrentPlaying(first_id.title);
    };

    init();
  }, []);

  useEffect(() => {
    setButtonGroups(createButtonGroups(0, 100));
  }, []);

  const createButtonGroups = (
    start: number | undefined,
    end: number | undefined
  ) => {
    return (
      <div className="grid grid-cols-5 2xl:grid-cols-5 gap-2 md:grid-cols-10 lg:grid-cols-12 my-2">
        {data.episodes &&
          data.episodes.slice(start, end).map((item, index) => (
            <button
              key={index}
              className="btn btn-sm w-[75px] md:w-[70px] md:btn-xs bg-zinc-800 font-normal"
              id={item.id}
              type="button"
              onClick={(event) => {
                event.currentTarget.style.backgroundColor = "gray";
                videoFormatter(item.id!);
                setCurrentPlaying(item.title!);
              }}
            >
              {item.number}
            </button>
          ))}
      </div>
    );
  };

  const vidLinksFetcher = async (id: string) => {
    const res: AnimeLinks = await AnimeRequestHandler({
      watch: true,
      episodeId: id,
    });

    if (!res) {
      console.log("No data found");
      return null;
    }

    const sourcesArray: string[] = Array.from(
      res.sources!,
      (item) => item.url!
    );
    return sourcesArray[sourcesArray.length - 2];
  };

  const videoFormatter = useCallback(
    async (id: string) => {
      setVideoPlayer(
        <div className="flex flex-col gap-4 justify-center mb-2">
          <div
            className="skeleton h-64 2xl:h-[47rem] md:h-[27rem] xl:h-[37rem]"
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

  function handleSelectChange(item: Episode[]) {
    // console.log(item[item.length - 1].number);
    console.log(item);
    setButtonGroups(<></>);
    const start_index = item[0].number;
    const end_index = item[item.length - 1].number;
    setButtonGroups(createButtonGroups(start_index! - 1, end_index));
  }

  const toggleAccordion = () => {
    setAccordionStatus((prevStatus) =>
      prevStatus === "shrink" ? "expand" : "shrink"
    );
  };

  return (
    <main>
      <div className="flex 2xl:flex-row flex-col w-full">
        <div className="w-full">{videoPlayer}</div>
        <div className="2xl:w-1/4 w-full">
          <div
            className="collapse bg-gradient-to-b from-base-300 to-base-200/75 rounded-none p-0"
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
            <div className="collapse-content">
              {memoizedData.episodes && (
                <div className="w-full">
                  <select
                    className="select select-bordered w-full"
                    onChange={(event) => {
                      // Get the selected option
                      const selectedOption =
                        event.target.options[event.target.selectedIndex];
                      // Retrieve the data-value from the selected option
                      const target = selectedOption.getAttribute("data-value");
                      if (!target) {
                        return;
                      }
                      handleSelectChange(JSON.parse(target!));
                      // handleSelectChange(target);
                    }}
                  >
                    <option disabled>Episode Group</option>
                    {groups.length > 0 ? (
                      groups.map((item, index) => (
                        <option key={index} data-value={JSON.stringify(item)}>
                          {item[0].number} - {item[item.length - 1].number}
                        </option>
                      ))
                    ) : (
                      <option defaultChecked>No episodes found</option>
                    )}
                  </select>
                </div>
              )}
              {buttonGroups}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AnimeVideoPage;

function createGroups(array: Episode[], size: number) {
  const groups = [];
  for (let i = 0; i < array.length; i += size) {
    groups.push(array.slice(i, i + size));
  }
  return groups;
}
