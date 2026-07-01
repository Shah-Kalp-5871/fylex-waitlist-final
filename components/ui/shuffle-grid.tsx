"use client"

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export const ShuffleHero = () => {
  return (
    <section className="w-full px-6 py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 max-w-7xl mx-auto relative z-10">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-zinc-500 font-bold uppercase tracking-[0.3em]">
          The Gallery
        </span>
        <h3 className="text-5xl md:text-6xl font-serif font-semibold text-white tracking-tight leading-[1.1]">
          A Symphony of <br/><span className="italic font-light text-zinc-400">Craftsmanship</span>
        </h3>
        <p className="text-base md:text-lg text-zinc-400 my-8 max-w-md font-light leading-relaxed">
          Explore the myriad of textures, aerospace-grade materials, and engineering feats that make up The Fylex's inaugural masterpieces. Every angle tells a story.
        </p>
        <button suppressHydrationWarning className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors">
          View Collection
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: (typeof squareData)[0][]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  { id: 1, src: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg" },
  { id: 2, src: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg" },
  { id: 3, src: "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg" },
  { id: 4, src: "https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg" },
  { id: 5, src: "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg" },
  { id: 6, src: "https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg" },
  { id: 7, src: "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg" },
  { id: 8, src: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg" },
  { id: 9, src: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg" },
  { id: 10, src: "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg" },
  { id: 11, src: "https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg" },
  { id: 12, src: "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg" },
  { id: 13, src: "https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg" },
  { id: 14, src: "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg" },
  { id: 15, src: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg" },
  { id: 16, src: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg" },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full rounded-md overflow-hidden bg-zinc-900 shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/5"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    setSquares(generateSquares());
    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-2 lg:ml-12 opacity-80 hover:opacity-100 transition-opacity duration-500">
      {squares}
    </div>
  );
};
