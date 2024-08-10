"use client";

import { useRef, useState } from "react";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  Poster,
  RadioGroup,
  Track,
} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { CheckIcon } from "@vidstack/react/icons";

interface VideoData {
  title?: string;
  cover?: string;
  videoURL?: vidUrls;
  subs?: subs[];
  link2?: string;
  link3?: string;
}

interface vidUrls {
  url?: string;
  isM3U8?: boolean;
  quality?: string;
}

interface subs {
  url?: string;
  lang?: string;
}

const SeriesCustomVideoPlayer = ({
  data,
  season,
  episode,
}: {
  data: VideoData;
  season: string;
  episode: string;
}) => {
  const player = useRef<MediaPlayerInstance>(null);
  const [src, setSrc] = useState<string>(
    data.videoURL
      ? `${process.env.NEXT_PUBLIC_M3U8_PROXY as string}${data.videoURL.url!}`
      : "/not_found.mp4"
  );
  return (
    <MediaPlayer
      title={`${data.title} - S${season} E${episode}`}
      src={{
        src: src,
        type: "application/x-mpegurl",
      }}
      load="eager"
      aspectRatio="16/9"
      playsInline
      volume={0.5}
      crossOrigin
      keyTarget="player"
      streamType="on-demand"
      ref={player}
      onCanPlay={() => {
        const qualities = player.current?.qualities!;
        if (qualities && data.videoURL?.url) {
          const preferredQuality = qualities[qualities?.length! - 1];
          preferredQuality!.selected = true;
        }
      }}
    >
      <MediaProvider>
        {data.subs &&
          data.subs.map((item) => (
            <Track
              src={item.url}
              kind="subtitles"
              label={item.lang}
              // lang="en-US"
              type="vtt"
              key={item.url}
            />
          ))}

        <Poster
          className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
          src={data.cover ? `${process.env.NEXT_PUBLIC_PROXY_2 as string}${data.cover}` : "/placeholder.svg"}
          alt="Movie poster"
        />
      </MediaProvider>
      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        slots={{
          afterPlaybackMenuItemsEnd: (
            <RadioGroup.Root
              className="vds-radio-group mt-2"
              aria-label="Custom Options"
            >
              <RadioGroup.Item
                className="vds-radio"
                value="check 1"
                key="check 1"
                onClick={() =>
                  setSrc(
                    `${process.env.NEXT_PUBLIC_M3U8_PROXY as string}${
                      data.videoURL?.url
                    }`
                  )
                }
              >
                {src ===
                  `${process.env.NEXT_PUBLIC_M3U8_PROXY as string}${
                    data.videoURL?.url
                  }` && <CheckIcon className="vds-icon" />}
                <span className="vds-radio-label">Default</span>
              </RadioGroup.Item>
              {data.link2 && (
                <RadioGroup.Item
                  className="vds-radio"
                  value="check 2"
                  key="check 2"
                  onClick={() => {
                    setSrc(data.link2!);
                  }}
                >
                  {src === data.link2 && <CheckIcon className="vds-icon" />}
                  <span className="vds-radio-label">Source 2</span>
                </RadioGroup.Item>
              )}
              {data.link3 && (
                <RadioGroup.Item
                  className="vds-radio"
                  value="check 3"
                  key="check 3"
                  onClick={() => {
                    setSrc(data.link3!);
                  }}
                >
                  {src === data.link3 && <CheckIcon className="vds-icon" />}
                  <span className="vds-radio-label">Source 3</span>
                </RadioGroup.Item>
              )}
            </RadioGroup.Root>
          ),
        }}
      />
    </MediaPlayer>
  );
};

export default SeriesCustomVideoPlayer;
