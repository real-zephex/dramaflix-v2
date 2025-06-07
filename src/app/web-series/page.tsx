import { TopPopularAiringTV, TrendingTV } from "@/utils/tv-requests/request";
import { Metadata } from "next";

import WebHomepageCards from "@/components/web-ui/homepage-cards";

export async function generateMetadata(): Promise<Metadata> {
  try {
    // Fetch trending show to use as featured content
    const trending = await TrendingTV({ time_window: "day" });
    const featuredShow = trending?.results?.[0];

    const title = "TV Shows & Web Series - Dramaflix";
    const description =
      "Discover and watch the best TV shows and web series. Browse popular, top-rated, and trending series all in one place on Dramaflix.";

    // Use featured show image or fallback
    const imageUrl = featuredShow?.backdrop_path
      ? `${process.env.NEXT_PUBLIC_PROXY}https://image.tmdb.org/t/p/original${featuredShow.backdrop_path}`
      : featuredShow?.poster_path
      ? `${process.env.NEXT_PUBLIC_PROXY}https://image.tmdb.org/t/p/original${featuredShow.poster_path}`
      : "/placeholder.svg";

    // Create keywords from trending shows
    const keywords =
      trending?.results
        ?.slice(0, 5)
        .map((show) => show.name)
        .join(", ") || "TV shows, web series, streaming";

    return {
      title,
      description,
      keywords: `TV shows, web series, streaming, popular shows, trending series, ${keywords}`,
      openGraph: {
        title,
        description,
        type: "website",
        images: [
          {
            url: imageUrl,
            width: 1920,
            height: 1080,
            alt: "Discover TV Shows and Web Series on Dramaflix",
          },
        ],
        siteName: "Dramaflix",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "TV Shows & Web Series - Dramaflix",
      description:
        "Discover and watch the best TV shows and web series on Dramaflix.",
    };
  }
}

const WebSeriesHomepage = async () => {
  const popular = await TopPopularAiringTV({ type: "popular" });
  const top = await TopPopularAiringTV({ type: "top_rated" });
  const airing = await TopPopularAiringTV({ type: "airing_today" });
  const trending = await TrendingTV({ time_window: "day" });

  return (
    <main className="bg-gradient-to-b from-base-300 to-base-100s">
      <div className="container mx-auto py-2 px-1">
        <h1 className="text-2xl md:text-4xl  font-semibold">
          Discover the Best TV Shows
        </h1>
        <section className="py-4">
          <h2 className="text-3xl  my-2">Top Shows</h2>
          <WebHomepageCards data={top} />
        </section>
        <section className="py-4">
          <h2 className="text-3xl my-2">Popular Shows</h2>
          <WebHomepageCards data={popular} />
        </section>
        <section className="py-4">
          <h2 className="text-3xl  my-2">Airing Now</h2>
          <WebHomepageCards data={airing} />
        </section>
        <section className="py-4">
          <h2 className="text-3xl  my-2">Trending Now</h2>
          <WebHomepageCards data={trending} />
        </section>
      </div>
    </main>
  );
};

export default WebSeriesHomepage;
