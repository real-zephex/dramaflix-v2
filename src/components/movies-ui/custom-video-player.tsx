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

export default function CustomVideoPlayer({
  movieTitle,
  subtitle,
  source,
  cover,
}: {
  movieTitle: string;
  subtitle: string;
  source: string;
  cover: string;
}) {
  const player = useRef<MediaPlayerInstance>(null);

  return (
    <MediaPlayer
      title={movieTitle}
      className="h-[240px] md:h-[480px] lg:h-[720px]"
      src={`https://m3u8.justchill.workers.dev/?url=${source}`}
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
        if (qualities) {
          const preferredQuality = qualities[qualities?.length! - 1];
          preferredQuality!.selected = true;
        }
      }}
    >
      <MediaProvider>
        <Track
          src={subtitle}
          kind="subtitles"
          label="English"
          lang="en-US"
          type="vtt"
          default
        />
        <Poster
          className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
          src={cover}
          alt="Movie poster"
        />
      </MediaProvider>
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
}
