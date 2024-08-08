"use client";

import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  MediaProviderAdapter,
  MediaProviderChangeEvent,
  type MediaPlayerInstance,
  useMediaRemote,
  Poster,
} from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { FaDownload } from "react-icons/fa";

import { AnimeLinks, Episode, GogoanimeInfo } from "@/utils/types";
import {
  AnimeRequestHandler,
  animeLinksCacher,
} from "@/utils/anime-requests/request";

const HLS_PROXY = "https://m3u8.justchill.workers.dev/?url=";

const AnimeVideoPage = ({ data }: { data: GogoanimeInfo }) => {
  const [currentPlaying, setCurrentPlaying] = useState<string>("");
  const [buttonGroups, setButtonGroups] = useState<JSX.Element>(<></>);
  const [accordionStatus, setAccordionStatus] = useState<"shrink" | "expand">(
    "shrink"
  );
  const player = useRef<MediaPlayerInstance>(null);
  const [cacheConfirmation, setCacheConfirmation] = useState<JSX.Element>(
    <></>
  );
  const [src, setSrc] = useState<string>("");
  const [episodeTitle, setEpisodeTitle] = useState<string>("");
  const [download, setDownload] = useState<string>("");
  const [loading, setLoading] = useState<JSX.Element>(<></>);
  const [backup, setBackup] = useState<string>("");

  const memoizedData = useMemo(() => data, [data]);
  const groups = createGroups(data.episodes!, 100);

  const first_id: any = useMemo(
    () => (data.episodes?.length! > 0 ? data.episodes![0] : []),
    [data]
  );
  const vidLoadingIndicator = (
    <div className="absolute top-0 right-0 left-0 bg-black/75 z-10 w-full h-full flex justify-center items-center">
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );

  useEffect(() => {
    const init = async () => {
      await videoFormatter(first_id.id);

      setCurrentPlaying(first_id.number.toString()!);
    };

    init();
  }, []);

  useEffect(() => {
    setButtonGroups(createButtonGroups(0, 100));
    cacheInit(0, data.episodes?.length! < 100 ? data.episodes?.length! : 100);
  }, []);

  const cacheInit = async (start: number, end: number) => {
    const cacheConfirmation = await animeLinksCacher(
      data.episodes!,
      start,
      end
    );
    if (cacheConfirmation) {
      setCacheConfirmation(cacheMessage(start, end));
    }
    setTimeout(() => {
      setCacheConfirmation(<></>);
    }, 3000);
  };

  const cacheMessage = (start: number, end: number) => {
    return (
      <div className="toast z-50">
        <div className="alert alert-info">
          <span>
            Links for Episodes {start.toString()} - {end.toString()} fetched
            successfully
          </span>
        </div>
      </div>
    );
  };

  const createButtonGroups = (
    start: number | undefined,
    end: number | undefined
  ) => {
    return (
      <div
        className="grid grid-cols-5 2xl:grid-cols-5 gap-2 md:grid-cols-10 lg:grid-cols-12 my-2"
        onClick={(e) => e.stopPropagation()}
      >
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
                setCurrentPlaying(item.number?.toString()!);
              }}
            >
              {item.number}
            </button>
          ))}
      </div>
    );
  };

  const vidLinksFetcher = async (id: string) => {
    setLoading(vidLoadingIndicator);

    const res: AnimeLinks = await AnimeRequestHandler({
      watch: true,
      episodeId: id,
    });

    if (!res) {
      console.log("No data found");
      return null;
    }
    const temp = res.sources?.find((source) => source.quality === "backup");
    const defaultUrl = res.sources?.find(
      (source) => source.quality === "default"
    );
    const download = res.download;
    // Backup source will be used first

    if (download) {
      setDownload(download);
    }
    if (defaultUrl) {
      setBackup(defaultUrl.url!);
    }
    const tempRes = await fetch(`${HLS_PROXY}${temp?.url}`, {
      cache: "no-cache",
    });
    setLoading(<></>);

    if (!tempRes.ok) {
      return `${HLS_PROXY}${defaultUrl?.url}`;
    } else {
      return `${HLS_PROXY}${temp?.url}`;
    }
  };

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    _nativeEvent: MediaProviderChangeEvent
  ) {
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  const videoFormatter = useCallback(
    async (id: string) => {
      let url;
      try {
        url = await vidLinksFetcher(id);
      } catch (error) {
        url = "/not_found.mp4";
      }

      setSrc(url!);
      setEpisodeTitle(getEpisodeNumber(id));
    },
    [memoizedData]
  );

  function getEpisodeNumber(id: string): string {
    const parts = id.split("-");
    return parts[parts.length - 1];
  }

  function handleSelectChange(item: Episode[]) {
    const start_index = item[0].number;
    const end_index = item[item.length - 1].number;
    setButtonGroups(createButtonGroups(start_index! - 1, end_index));
    if (start_index && end_index) {
      cacheInit(start_index, end_index);
    }
  }

  const toggleAccordion = () => {
    setAccordionStatus((prevStatus) =>
      prevStatus === "shrink" ? "expand" : "shrink"
    );
  };

  return (
    <main>
      {cacheConfirmation}
      <div className="flex 2xl:flex-row flex-col w-full">
        <div className="w-full relative">
          {loading}
          <MediaPlayer
            title={`${data.title} - Episode ${episodeTitle}`}
            src={src}
            aspectRatio="16/9"
            load="eager"
            playsInline
            ref={player}
            volume={0.5}
            crossOrigin
            keyTarget="player"
            onProviderChange={onProviderChange}
            streamType="on-demand"
            onCanPlay={() => {
              const qualities = player.current?.qualities!;
              const preferredQuality = qualities[qualities?.length! - 1];
              preferredQuality!.selected = true;
            }}
          >
            <MediaProvider>
              <Poster
                className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
                src={`${HLS_PROXY}${data.image}`}
                alt={`${data.title} Poster`}
              />
            </MediaProvider>
            <DefaultAudioLayout icons={defaultLayoutIcons} />
            <DefaultVideoLayout
              icons={defaultLayoutIcons}
              slots={{
                beforeSettingsMenu: (
                  <button
                    className="btn btn-sm btn-ghost"
                    type="button"
                    onClick={() => window.open(download, "_blank")}
                  >
                    <FaDownload color="white" size={20} />
                  </button>
                ),
              }}
            />
          </MediaPlayer>
        </div>
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
                    onClick={(e) => e.stopPropagation()}
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
