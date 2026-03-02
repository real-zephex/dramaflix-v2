"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Play, History, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MovieInfo } from "@/utils/movie-requests/request";
import { InfoImagesCreditsTV } from "@/utils/tv-requests/request";
import { MovieInfoType, TVInfo } from "@/utils/types";

interface WatchHistoryItem {
  id: string | number;
  title: string;
  poster: string | null;
  description: string;
  watch_status: "Completed" | "Plan to Watch" | "Watching";
  type: "MOVIE" | "TV";
  overview?: string;
}

export default function WatchHistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<WatchHistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState("Watching");
  const [hoverData, setHoverData] = useState<MovieInfoType | TVInfo | null>(null);
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

  const handleMouseEnter = async (e: React.MouseEvent, item: WatchHistoryItem) => {
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
    "Plan to Watch": history.filter((item) => item.watch_status === "Plan to Watch"),
    Completed: history.filter((item) => item.watch_status === "Completed"),
  };

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Watch History</h1>
      
      <div className="flex bg-muted p-1 rounded-lg max-w-lg mb-8 mx-auto">
        {["Watching", "Plan to Watch", "Completed"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === tab 
                ? "bg-background shadow-sm text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4 max-w-4xl mx-auto">
        {(filteredHistory[activeTab as keyof typeof filteredHistory] || []).length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-xl border-muted">
            <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">No items in this category</p>
          </div>
        ) : (
          filteredHistory[activeTab as keyof typeof filteredHistory].map((item) => (
            <Card key={item.id} className="overflow-hidden group hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row">
                <div 
                  className="relative w-full sm:w-[150px] aspect-[2/3] sm:aspect-auto"
                  onMouseEnter={(e) => handleMouseEnter(e, item)}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                >
                  {item.poster && (
                    <Image
                      src={item.poster.startsWith("http") ? item.poster : `https://image.tmdb.org/t/p/w342${item.poster}`}
                      alt={item.title}
                      className="object-cover"
                      fill
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none sm:pointer-events-auto">
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform"
                      onClick={() => handleResume(item)}
                    >
                      <Play className="h-5 w-5 fill-current" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h2 className="text-xl font-bold line-clamp-1">{item.title}</h2>
                      <Badge variant="secondary" className="capitalize">
                        {item.type}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {item.description}
                    </p>

                    {item.overview && (
                      <div className="flex items-center gap-2 text-xs text-primary bg-primary/10 px-2 py-1 rounded w-fit">
                        <Clock className="h-3 w-3" />
                        {item.overview}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end items-center gap-2 mt-6">
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="gap-2 px-6"
                      onClick={() => handleResume(item)}
                    >
                      <Play className="h-4 w-4 fill-current" />
                      {activeTab === "Plan to Watch" ? "Start" : "Resume"}
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))
        )}
      </div>

      {showHoverMenu && (
        <div
          className="fixed z-50 bg-popover text-popover-foreground rounded-lg shadow-2xl p-4 max-w-sm border border-border animate-in fade-in zoom-in duration-200"
          style={{
            left: `${hoverPosition.x + 20}px`,
            top: `${hoverPosition.y + 20}px`,
            transform: hoverPosition.x > (typeof window !== "undefined" ? window.innerWidth - 400 : 800) ? "translateX(-110%)" : "none",
          }}
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-sm font-medium">Loading details...</span>
            </div>
          ) : hoverData ? (
            <div className="space-y-3">
              <h3 className="font-bold text-base leading-tight">
                {"title" in hoverData ? hoverData.title : hoverData.name}
              </h3>

              {hoverData.backdrop_path && (
                <div className="relative w-full aspect-video rounded overflow-hidden shadow-inner">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${hoverData.backdrop_path}`}
                    alt="Backdrop"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <p className="text-xs text-muted-foreground line-clamp-3">
                {hoverData.overview}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-muted-foreground border-t pt-2">
                {hoverData.vote_average && (
                  <div>
                    <span className="font-semibold text-primary">Rating:</span>{" "}
                    {hoverData.vote_average.toFixed(1)}/10
                  </div>
                )}
                {"runtime" in hoverData && hoverData.runtime && (
                  <div>
                    <span className="font-semibold text-primary">Runtime:</span>{" "}
                    {Math.floor(hoverData.runtime / 60)}h {hoverData.runtime % 60}m
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-xs text-destructive">Failed to load details</div>
          )}
        </div>
      )}
    </main>
  );
}
