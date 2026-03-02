"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Heart, Coffee, X } from "lucide-react";
import { motion } from "framer-motion";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Donate = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="secondary" 
          className="rounded-full gap-2 shadow-lg border-primary/20 bg-background/80 backdrop-blur hover:bg-primary hover:text-primary-foreground transition-all duration-500"
        >
          <Heart className="h-4 w-4 fill-current text-destructive" />
          <span>Support Dramaflix</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-none shadow-2xl">
        <DialogHeader className="p-6 bg-gradient-to-r from-primary/10 to-primary/5">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Coffee className="h-6 w-6 text-primary" />
            Support the Project
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-[400px] aspect-square rounded-2xl overflow-hidden shadow-xl border border-border/50"
            >
              <Image
                src="/donate.jpg"
                fill
                className="object-cover"
                alt="Clicking on the &quot;Buy Me a Coffee&quot; button below will take you to my personal coffee page. Every cup helps keep the &quot;Dramaflix&quot; servers warm and the stream flowing!"
              />
            </motion.div>
            
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Buy us a coffee! ☕</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dramaflix is a passion project built for the community. Your donations help us cover server costs, domain fees, and keep the stream running smoothly!
                </p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-xl border border-dashed border-primary/20">
                <p className="text-sm font-medium italic text-center text-primary">
                  &quot;Every donation helps us reach more users and add more features.&quot;
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button className="w-full gap-2" size="lg">
                  <Heart className="h-4 w-4" /> Donate via BuyMeACoffee
                </Button>
                <DialogClose asChild>
                  <Button variant="ghost" className="w-full">
                    Maybe later
                  </Button>
                </DialogClose>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Donate;
