"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HomepageCards = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {generateCards(
        "Movies",
        "Discover a vast collection of captivating movies from around the world.",
        "movies",
        "/movie.jpg"
      )}
      {generateCards(
        "Web Series",
        "Explore the latest and greatest in the world of web-based entertainment.",
        "web-series",
        "/series.jpg"
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
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        href={`${redirect}`}
        className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card/50 shadow-sm transition-all hover:shadow-md hover:bg-accent/10"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            width={400}
            height={300}
            alt={`${title} poster`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            priority
            quality={100}
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold tracking-tight">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{message}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default HomepageCards;
