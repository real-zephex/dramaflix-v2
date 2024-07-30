import React from "react";

const MoviePlayer = async ({ id }: { id: string }) => {
  const vidLinksArray = [
    // { title: "vidsrc.to", link: `https://vidsrc.to/embed/movie/${id}` },
    { title: "vidsrc.pro", link: `https://vidsrc.pro/embed/movie/${id}` },
    // {
    //   title: "multiembed",
    //   link: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`,
    // },
    // { title: "vidsrc.net", link: `https://vidsrc.net/embed/movie?tmdb=${id}` },
    { title: "2embed.cc", link: `https://www.2embed.cc/embed/${id}` },
    {
      title: "autoembed",
      link: `https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://stable-one.autoembed.cc/movie/${id}`,
    },
    // {
    //   title: "playsrc",
    //   link: `https://playsrc.streamscripts.xyz/embed/movie/${id}`,
    // },
  ];
  return (
    <div role="tablist" className="tabs tabs-boxed">
      {vidLinksArray.map((items, index) => (
        <React.Fragment key={items.title}>
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            id={`tab${index}`}
            className="tab"
            aria-label={items.title}
            defaultChecked={items.title === "autoembed"}
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-2 "
          >
            <iframe
              src={items.link}
              allowFullScreen
              referrerPolicy="origin"
              height={720}
              className="w-full h-[240px] md:h-[480px] lg:h-[720px] rounded-lg"
              sandbox="allow-same-origin allow-scripts"
            ></iframe>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MoviePlayer;
