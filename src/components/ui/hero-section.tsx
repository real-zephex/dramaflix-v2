"use client";

import { motion } from "framer-motion";
import { Play, Sparkles, Tv, MonitorPlay } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden w-full">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-background overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]" />
        <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] rounded-full bg-purple-600/20 blur-[100px] mix-blend-screen animate-pulse duration-[6000ms]" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 inline-flex flex-row items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 backdrop-blur-md"
        >
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-xs sm:text-sm font-bold tracking-widest text-primary uppercase">
            The Ultimate Streaming Experience
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="space-y-4 max-w-5xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-balance">
            Unlimited Entertainment,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary/50 animate-gradient-x">
              Zero Boundaries.
            </span>
          </h1>
          <p className="mx-auto max-w-[42rem] text-lg sm:text-xl text-muted-foreground/80 leading-relaxed font-medium mt-6">
            Dive into a meticulously crafted universe of blockbuster movies, binge-worthy series, and breathtaking anime. Your premium cinematic journey starts here.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/movies" className="w-full sm:w-auto group">
            <Button size="lg" className="w-full h-14 rounded-full px-8 gap-3 font-black text-lg bg-primary text-primary-foreground hover:scale-105 transition-all shadow-[0_0_40px_rgba(2,235,244,0.3)] hover:shadow-[0_0_60px_rgba(2,235,244,0.5)] border border-primary/50">
              <Play className="h-5 w-5 fill-current" />
              Start Watching
            </Button>
          </Link>
          <div className="flex gap-4 w-full sm:w-auto">
            <Link href="/web-series" className="w-full group">
              <Button variant="secondary" size="lg" className="w-full h-14 rounded-full px-6 gap-3 font-bold text-base bg-secondary/50 backdrop-blur-md border border-border/50 hover:bg-secondary/80 transition-all hover:scale-105">
                <Tv className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                Web Series
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </section>
  );
};
