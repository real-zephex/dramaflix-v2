import { MovieInfoType, MoviesHomepageResults } from "@/utils/types";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const MoreMovieInfo = async ({
  data,
  recommendation_data,
}: {
  data: MovieInfoType;
  recommendation_data: MoviesHomepageResults;
}) => {
  return (
    <div role="tablist" className="tabs tabs-lifted mt-2">
      <input
        type="radio"
        name="my_tabs_3"
        role="tab"
        className="tab"
        aria-label="Info"
        defaultChecked
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-2"
      >
        <p className="md:hidden">
          <b>Description</b>: {data.overview}
        </p>
        <p>
          <b>Genres</b>:{" "}
          {data.genres.map((item, index) => (
            <React.Fragment key={item.id}>
              <span>{item.name}</span>
              {index < data.genres.length - 1 && ", "}
            </React.Fragment>
          ))}
        </p>
        <p>
          <b>Homepage</b>:{" "}
          <Link href={data.homepage} target="_blank" className="text-warning">
            {data.homepage}
          </Link>
        </p>
        <p>
          <b>Budget</b>: ${data.budget.toLocaleString()} | <b>Revenue</b> : $
          {data.revenue.toLocaleString()}
        </p>
        <p>
          <b>Runtime</b>: {data.runtime} minutes
        </p>
      </div>

      <input
        type="radio"
        name="my_tabs_3"
        role="tab"
        className="tab"
        aria-label="Recommendations"
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-2"
      >
        {recommendation_data &&
          recommendation_data.results.map((item, index) => (
            <React.Fragment key={item.id}>
              <Link href={`/movies/${item.id}`}>
                <div className="flex flex-row items-center mb-2 bg-base-200 rounded-md transition delay-50 ease-in-out hover:bg-base-100">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    width={120}
                    height={170}
                    alt="Movie Poster"
                    className="rounded-md border-4 border-zinc-800"
                  ></Image>
                  <div className="flex flex-col ml-1">
                    <p className="text-xl font-semibold ">{item.title}</p>
                    <div className="badge badge-info badge-outline">
                      {item.release_date}
                    </div>
                  </div>
                </div>
              </Link>
            </React.Fragment>
          ))}
      </div>

      {/* <input
        type="radio"
        name="my_tabs_3"
        role="tab"
        className="tab"
        aria-label="Tab 3"
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
        Tab content 3
      </div> */}
    </div>
  );
};

export default MoreMovieInfo;
