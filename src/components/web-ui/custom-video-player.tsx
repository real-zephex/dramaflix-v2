"use client";

import { useRef } from "react";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  Poster,
  Track,
} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

interface VideoData {
  title?: string;
  cover?: string;
  videoURL?: vidUrls;
  subs?: subs[];
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

  return (
    <MediaPlayer
      title={`${data.title} - S${season} E${episode}`}
      src={
        data.videoURL?.url
          ? `https://m3u8.justchill.workers.dev/?url=${data.videoURL!.url}`
          : "/not_found.mp4"
      }
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
              key={item.lang}
            />
          ))}

        <Poster
          className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
          src={data.cover}
          alt="Movie poster"
        />
      </MediaProvider>
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
};

export default SeriesCustomVideoPlayer;
