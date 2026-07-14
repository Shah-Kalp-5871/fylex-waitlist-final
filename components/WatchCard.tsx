"use client"

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { WatchItem } from "./VoteYourPick";

interface WatchCardProps {
  watch: WatchItem;
  isActive: boolean;
  onClick: () => void;
  index: number;
  percentage?: number;
  hasVoted?: boolean;
}

export const WatchCard: React.FC<WatchCardProps> = ({
  watch,
  isActive,
  onClick,
  index,
  percentage,
  hasVoted,
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative flex-shrink-0 overflow-hidden rounded-lg md:rounded-xl cursor-pointer select-none group transition-all duration-500 ${
        isActive
          ? "w-[44px] sm:w-[88px] md:w-[98px] lg:w-[106px] xl:w-[114px] h-[380px] sm:h-[440px] md:h-[520px] border-2 border-white/90 shadow-[0_0_35px_rgba(255,255,255,0.3)] z-20"
          : "w-[30px] sm:w-[78px] md:w-[86px] lg:w-[94px] xl:w-[100px] h-[380px] sm:h-[440px] md:h-[520px] border border-white/10 hover:border-white/30 z-10 opacity-80 hover:opacity-100"
      }`}
    >
      {/* Cropped watch dial strip preview */}
      <Image
        src={watch.image}
        alt={watch.name || `Watch ${watch.id}`}
        fill
        sizes="(max-width: 768px) 440px, 600px"
        className={`absolute inset-0 object-cover object-center transition-transform duration-700 ease-out ${
          isActive
            ? "scale-100 md:scale-[1.02]"
            : "scale-[1.05] md:scale-[1.08] group-hover:scale-[1.12]"
        }`}
      />

      {/* Dark overlay on inactive watches */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isActive
            ? "bg-transparent opacity-0"
            : "bg-black/45 group-hover:bg-black/25 backdrop-blur-[1px]"
        }`}
      />

      {/* Bottom exact silver/white rectangular badge box exactly as in the screenshot */}
      <div className="absolute bottom-2 sm:bottom-5 inset-x-0 flex items-center justify-center z-20 pointer-events-none px-1 sm:px-2">
        <div
          className={`w-6 sm:w-12 md:w-14 h-4 sm:h-7 md:h-8 bg-[#E8E8E8] rounded-[2px] shadow-lg flex items-center justify-center border transition-all duration-300 ${
            isActive
              ? "border-white bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] scale-105"
              : "border-white/60 group-hover:bg-white group-hover:scale-105"
          }`}
        >
          {hasVoted && percentage !== undefined ? (
            <span className="text-[6px] sm:text-xs font-mono font-bold text-zinc-900 tracking-tight">
              {percentage}%
            </span>
          ) : (
            <span className="text-[6px] sm:text-xs font-mono font-bold text-zinc-700 tracking-tight">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>
      </div>

      {/* Active Inner Ring */}
      {isActive && (
        <motion.div
          layoutId="activeWatchRing"
          className="absolute inset-0 rounded-lg md:rounded-xl border border-white/40 pointer-events-none shadow-[inset_0_0_15px_rgba(255,255,255,0.2)]"
        />
      )}
    </motion.div>
  );
};
