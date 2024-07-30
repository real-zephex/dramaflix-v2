import React from "react";
import MoviesGridConstructor from "@/components/movies-ui/movies-formatter";

const MovieHomepage = async () => {
  const arrayType = [
    {
      title: "Popular",
      type: "popular",
    },
    {
      title: "Trending",
      type: "trending",
    },
    {
      title: "Top",
      type: "top_rated",
    },
    {
      title: "NowPlaying",
      type: "now_playing",
    },
  ];

  return (
    <main className="lg:w-11/12 w-full mx-auto p-2">
      <h1 className="font-extrabold text-2xl md:text-4xl">Movies</h1>
      <div role="tablist" className="tabs tabs-boxed mt-2">
        {arrayType.map((items) => (
          <React.Fragment key={items.title}>
            <input
              type="radio"
              name="boom"
              role="tab"
              className="tab"
              aria-label={items.title}
              defaultChecked={items.title === "Popular"}
            />
            <div role="tabpanel" className="tab-content p-4">
              <MoviesGridConstructor type={items.type} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </main>
  );
};

export default MovieHomepage;
