"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Play, Menu, Film, Tv, History, Search as SearchIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Search from "../global-search";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_ITEMS = [
  { name: "Movies", href: "/movies", icon: Film },
  { name: "Web-Series", href: "/web-series", icon: Tv },
  { name: "Watch-History", href: "/watch-history", icon: History },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none">
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={cn(
          "pointer-events-auto flex items-center gap-2 md:gap-6 px-4 md:px-6 py-2 md:py-3 rounded-full border transition-all duration-500",
          "bg-background/40 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/50",
          isScrolled ? "mt-0" : "mt-2 md:mt-4"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity mr-2">
          <div className="bg-primary rounded-full p-1.5 shadow-lg shadow-primary/20">
            <Play className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground fill-current ml-0.5" />
          </div>
          <span className="font-display font-bold text-lg md:text-xl tracking-tight hidden sm:block">
            Dramaflix
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary/10 rounded-full -z-10 border border-primary/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="h-6 w-[1px] bg-white/10 hidden lg:block mx-2" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Search />
          
          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                  <Menu className="h-5 w-5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-4 p-2 bg-background/80 backdrop-blur-xl border-white/10 rounded-2xl">
                {NAV_ITEMS.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center gap-3 p-3 rounded-xl cursor-not-available">
                        <item.icon className="h-4 w-4" />
                        <span className="font-medium">{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.header>
    </div>
  );
};

export default Navbar;
