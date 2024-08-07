import React from "react";

const MoviePlayer = async ({ id }: { id: string }) => {
  const vidLinksArray = [
    // { title: "vidsrc.to", link: `https://vidsrc.to/embed/movie/${id}` },
    { title: "vidsrc.pro", link: `https://vidsrc.pro/embed/movie/${id}` },
    {
      title: "multiembed",
      link: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`,
    },
    // { title: "vidsrc.net", link: `https://vidsrc.in/embed/movie?tmdb=${id}` },
    { title: "vidsrc.vip", link: `https://vidsrc.vip/embed/movie/${id}` },
    // {
    //   title: "autoembed",
    //   link: `https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=https://stable-one.autoembed.cc/movie/${id}`,
    // },
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
            defaultChecked={items.title === "vidsrc.pro"}
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-2 "
          >
            {items.title === "multiembed" || items.title === "vidsrc.vip" ? (
              <iframe
                src={items.link}
                allowFullScreen
                height={720}
                className="w-full h-[240px] md:h-[480px] lg:h-[720px] rounded-lg"
              ></iframe>
            ) : (
              <iframe
                src={items.link}
                allowFullScreen
                height={720}
                className="w-full h-[240px] md:h-[480px] lg:h-[720px] rounded-lg"
                sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
              ></iframe>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MoviePlayer;
