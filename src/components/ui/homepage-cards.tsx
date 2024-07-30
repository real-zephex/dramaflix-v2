"use client";

import Image from "next/image";
import Link from "next/link";
import { getRandomMovie } from "@/utils/request";
import { useEffect, useState } from "react";

const HomepageCards = () => {
  const [randomImage, setRandomImage] = useState<string>("/placeholder.svg");

  useEffect(() => {
    // Fetch the initial random image
    const fetchImage = async () => {
      const image: any = await getRandomMovie(true);
      setRandomImage(image);
    };

    fetchImage(); // Fetch image on component mount

    // Set up interval to fetch a new image every 10 seconds
    const intervalId = setInterval(fetchImage, 10000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mx-auto p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:w-10/12 w-full">
      {generateCards(
        "Anime",
        "Dive into the captivating world of anime, from classic masterpieces to the latest hits.",
        "animes"
      )}
      {generateCards(
        "K-Dramas",
        "Immerse yourself in the addictive and emotionally-charged stories of Korean dramas.",
        "kdramas"
      )}
      {generateCards(
        "Movies",
        "Discover a vast collection of captivating movies from around the world.",
        "movies",
        randomImage
      )}
      {generateCards(
        "Web Series",
        "Explore the latest and greatest in the world of web-based entertainment.",
        "web-series"
      )}
    </div>
  );
};

const generateCards = (
  title: string,
  message: string,
  redirect: string,
  image: string = "/placeholder.svg"
) => {
  return (
    <Link
      href={`/${redirect}`}
      className="transition duration-300 ease-in-out hover:bg-zinc-200/50 p-2 rounded-xl hover:-translate-y-1 hover:shadow-xl"
    >
      <Image
        src={image}
        width={400}
        height={300}
        alt="Web Series"
        className="h-72 rounded-xl object-cover"
      />
      <h3 className="text-2xl font-bold mt-4">{title}</h3>
      <p className="text-muted-foreground mt-2">{message}</p>
    </Link>
  );
};

export default HomepageCards;
