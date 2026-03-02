"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Film, Tv, PlayCircle, HeartPulse } from "lucide-react";

const features = [
  {
    title: "Cinematic Movies",
    description: "Experience blockbusters in stunning HD. From timeless classics to the latest releases.",
    href: "/movies",
    icon: Film,
    image: "/movie.jpg",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1",
    accent: "bg-blue-500/10",
    textAccent: "text-blue-500",
  },
  {
    title: "Trending Web Series",
    description: "Binge-watch the most talked-about shows. Seamless playback, zero interruptions.",
    href: "/web-series",
    icon: Tv,
    image: "/series.jpg",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1",
    accent: "bg-purple-500/10",
    textAccent: "text-purple-500",
  },
];

export const BentoFeatures = () => {
  return (
    <section className="py-24 px-4 container mx-auto relative z-30">
      <div className="flex flex-col space-y-4 mb-16 text-center lg:text-left">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">
          Explore the Ecosystem
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto lg:mx-0 font-medium">
          A truly diverse collection tailored for every mood. Select your portal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[400px]">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative overflow-hidden rounded-3xl border border-border/50 bg-card shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-primary/30 ${feature.colSpan} ${feature.rowSpan}`}
          >
            <Link href={feature.href} className="absolute inset-0 z-20 flex flex-col justify-between p-6 h-full">
              {/* Top Icons */}
              <div className="flex justify-between items-start w-full">
                <div className={`p-3 rounded-2xl backdrop-blur-md border border-white/10 ${feature.accent}`}>
                  <feature.icon className={`h-6 w-6 ${feature.textAccent}`} />
                </div>
                <div className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-500">
                   <ArrowUpRight className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Text Content */}
              <div className="mt-auto z-10 space-y-2 relative">
                {/* Text Gradient Protection */}
                <div className="absolute inset-0 -m-6 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-[-1]" />
                
                <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-300 font-medium line-clamp-2 max-w-md">
                  {feature.description}
                </p>
              </div>
            </Link>

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-background/20 mix-blend-overlay" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
