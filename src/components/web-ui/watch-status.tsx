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
      type: "TV",
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
    } else {
      alert(
        "An error occurred while trying to save your watch status. Please try again."
      );
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-6 gap-4 border-t border-border/50">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-primary/60">Currently Broadcasting</span>
        <h4 className="font-black text-xl italic tracking-tight leading-none">
          {title} <span className="text-muted-foreground text-sm font-bold ml-2">S{season} E{episode}</span>
        </h4>
      </div>
      
      <div className="relative group">
        <select
          className="appearance-none bg-background/60 backdrop-blur-md border border-border/50 rounded-full px-8 py-3 pr-10 text-sm font-black uppercase tracking-widest hover:border-primary/50 transition-all outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-lg"
          onChange={handleSelectChange}
          value={watchStatus === "Not found" ? "" : watchStatus}
        >
          <option value="" disabled>Status Upload?</option>
          <option value="Completed">Mission Complete</option>
          <option value="Plan to Watch">Intel Target</option>
          <option value="Watching">In Progress</option>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </div>
  );
};

export default WebSeriesWatchStatus;
