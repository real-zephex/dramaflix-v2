import { MovieInfoType, MoviesHomepageResults } from "@/utils/types";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { PiThumbsUp } from "react-icons/pi";

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
          recommendation_data.results.slice(0, 10).map((item, _) => (
            <React.Fragment key={item.id}>
              <Link href={`/movies/${item.id}`}>
                <div className="flex flex-row items-center mb-2 bg-base-200 rounded-md transition delay-50 ease-in-out hover:bg-base-100">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    width={80}
                    height={130}
                    alt="Movie Poster"
                    className="rounded-l-md"
                  ></Image>
                  <div className="flex flex-col ml-1">
                    <p className="text-white">{item.title}</p>
                    <div className="text-sm flex flex-row items-center">
                      <span>{item.release_date}</span>
                      <span className="mx-2 font-bold">|</span>
                      <span>{item.vote_average}</span>
                      <span className="ml-1">
                        <PiThumbsUp fontWeight={700} />
                      </span>
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
