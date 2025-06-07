"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MovieInfo } from "@/utils/movie-requests/request";
import { InfoImagesCreditsTV } from "@/utils/tv-requests/request";
import { MovieInfoType, TVInfo } from "@/utils/types";
import Link from "next/link";

interface WatchHistoryItem {
  id: string | number;
  title: string;
  poster: string | null;
  description: string;
  watch_status: "Completed" | "Plan to Watch" | "Watching";
  type: "MOVIE" | "TV";
  // For TV shows, the overview contains season and episode info in format "Season X, Episode Y"
  overview?: string;
}

export default function WatchHistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<WatchHistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState("Watching");
  const [hoverData, setHoverData] = useState<MovieInfoType | TVInfo | null>(
    null
  );
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [showHoverMenu, setShowHoverMenu] = useState(false);

  useEffect(() => {
    try {
      const data = localStorage.getItem("watchHistory") || "[]";
      setHistory(JSON.parse(data));
    } catch (error) {
      console.error("Error loading watch history:", error);
      setHistory([]);
    }
  }, []);
  // New hover functionality
  const handleMouseEnter = async (
    e: React.MouseEvent,
    item: WatchHistoryItem
  ) => {
    setHoverPosition({ x: e.clientX, y: e.clientY });
    setShowHoverMenu(true);
    setIsLoading(true);

    try {
      let data;
      if (item.type === "MOVIE") {
        data = await MovieInfo(item.id.toString());
      } else {
        data = await InfoImagesCreditsTV({
          type: "info",
          id: parseInt(item.id.toString()),
        });
      }
      setHoverData(data || null);
    } catch (error) {
      console.error("Error fetching hover data:", error);
      setHoverData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseLeave = () => {
    setHoverData(null);
    setShowHoverMenu(false);
    setIsLoading(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (showHoverMenu) {
      setHoverPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleDelete = (id: string | number) => {
    const newHistory = history.filter((item) => item.id !== id);
    try {
      localStorage.setItem("watchHistory", JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.error("Error saving watch history:", error);
    }
  };
  const handleResume = (item: WatchHistoryItem) => {
    if (item.type === "MOVIE") {
      router.push(`/movies/${item.id}`);
    } else {
      // For TV shows, extract season and episode from overview if available
      let season = "1",
        episode = "1";
      if (item.overview) {
        const match = item.overview.match(/Season (\d+), Episode (\d+)/);
        if (match) {
          season = match[1];
          episode = match[2];
        }
      }
      router.push(`/web-series/watch/${season}/${episode}/${item.id}`);
    }
  };

  const filteredHistory = {
    Watching: history.filter((item) => item.watch_status === "Watching"),
    "Plan to Watch": history.filter(
      (item) => item.watch_status === "Plan to Watch"
    ),
    Completed: history.filter((item) => item.watch_status === "Completed"),
  };

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Watch History</h1>
      {/* DaisyUI Tab Navigation */}
      <div role="tablist" className="tabs tabs-boxed max-w-lg mb-6">
        <a
          role="tab"
          className={`tab ${activeTab === "Watching" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("Watching")}
        >
          Watching
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === "Plan to Watch" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("Plan to Watch")}
        >
          Plan to Watch
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === "Completed" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("Completed")}
        >
          Completed
        </a>
      </div>{" "}
      {/* Content Section */}
      <div className="space-y-4">
        {filteredHistory[activeTab as keyof typeof filteredHistory].length ===
        0 ? (
          <p className="text-center text-gray-500">No items in this category</p>
        ) : (
          filteredHistory[activeTab as keyof typeof filteredHistory].map(
            (item) => (
              <div
                key={item.id}
                className="card lg:card-side bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300"
                onMouseEnter={(e) => handleMouseEnter(e, item)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
              >
                <Link
                  href={`${
                    item.type === "MOVIE"
                      ? `/movies/${item.id}`
                      : `/web-series/${item.id}`
                  }`}
                  className="flex w-full h-full"
                >
                  {item.poster && (
                    <figure className="w-[120px] h-[180px] flex-shrink-0 relative overflow-hidden">
                      <Image
                        src={
                          item.poster.startsWith("http")
                            ? item.poster
                            : `https://image.tmdb.org/t/p/w185${item.poster}`
                        }
                        alt={item.title}
                        className="object-cover rounded-l-lg"
                        fill
                        sizes="120px"
                        priority={false}
                      />
                    </figure>
                  )}
                  <div className="card-body flex-row justify-between items-center p-4">
                    <div className="flex-1">
                      <h2 className="card-title text-lg">{item.title}</h2>
                      <div className="badge badge-primary my-2">
                        {item.watch_status}
                      </div>
                      <p className="text-gray-400 line-clamp-2 text-sm">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        onClick={() => handleResume(item)}
                        className="btn btn-primary btn-sm"
                      >
                        {item.watch_status === "Plan to Watch"
                          ? "Start"
                          : "Resume"}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            )
          )
        )}{" "}
      </div>
      {/* Hover Menu */}
      {showHoverMenu && (
        <div
          className="fixed z-50 bg-base-300 rounded-lg shadow-xl p-4 max-w-sm border border-base-content/20"
          style={{
            left: `${hoverPosition.x + 10}px`,
            top: `${hoverPosition.y + 10}px`,
            transform:
              hoverPosition.x >
              (typeof window !== "undefined" ? window.innerWidth - 400 : 800)
                ? "translateX(-100%)"
                : "none",
          }}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              <span>Loading details...</span>
            </div>
          ) : hoverData ? (
            <div className="space-y-2">
              <h3 className="font-bold text-lg">
                {"title" in hoverData ? hoverData.title : hoverData.name}
              </h3>

              {hoverData.backdrop_path && (
                <div className="relative w-full h-24 rounded overflow-hidden">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${hoverData.backdrop_path}`}
                    alt="Backdrop"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <p className="text-sm text-gray-400 line-clamp-3">
                {hoverData.overview}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {hoverData.vote_average && (
                  <div>
                    <span className="font-semibold">Rating:</span>{" "}
                    {hoverData.vote_average.toFixed(1)}/10
                  </div>
                )}

                {"release_date" in hoverData && hoverData.release_date && (
                  <div>
                    <span className="font-semibold">Released:</span>{" "}
                    {new Date(hoverData.release_date).getFullYear()}
                  </div>
                )}

                {"first_air_date" in hoverData && hoverData.first_air_date && (
                  <div>
                    <span className="font-semibold">First Aired:</span>{" "}
                    {new Date(hoverData.first_air_date).getFullYear()}
                  </div>
                )}

                {"runtime" in hoverData && hoverData.runtime && (
                  <div>
                    <span className="font-semibold">Runtime:</span>{" "}
                    {Math.floor(hoverData.runtime / 60)}h{" "}
                    {hoverData.runtime % 60}m
                  </div>
                )}

                {"number_of_seasons" in hoverData &&
                  hoverData.number_of_seasons && (
                    <div>
                      <span className="font-semibold">Seasons:</span>{" "}
                      {hoverData.number_of_seasons}
                    </div>
                  )}
              </div>

              {hoverData.genres && hoverData.genres.length > 0 && (
                <div className="text-xs">
                  <span className="font-semibold">Genres:</span>{" "}
                  {hoverData.genres
                    .slice(0, 3)
                    .map((genre: any) => genre.name)
                    .join(", ")}
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-gray-500">Failed to load details</div>
          )}
        </div>
      )}
    </main>
  );
}
