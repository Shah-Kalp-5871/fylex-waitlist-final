"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WatchCard } from "./WatchCard";
import { WatchPreview } from "./WatchPreview";

export interface WatchItem {
  id: number;
  image: string;
  percentage: number;
  name: string;
  tagline: string;
  dialType: string;
  color: string;
}

export const watches: WatchItem[] = [
  {
    id: 1,
    image: "/assets/voteyourpick/watch1.webp",
    percentage: 56,
    name: "Orbit Obsidian Black",
    tagline: "Sleek obsidian dial with deep navy chronometer accents",
    dialType: "Obsidian & Azure Dial",
    color: "#2563EB",
  },
  {
    id: 2,
    image: "/assets/voteyourpick/watch2.webp",
    percentage: 64,
    name: "Orbit Glacier Sky",
    tagline: "Ice-blue sunray finish with brushed titanium bezel",
    dialType: "Glacier Sky Blue Dial",
    color: "#38BDF8",
  },
  {
    id: 3,
    image: "/assets/voteyourpick/watch3.webp",
    percentage: 72,
    name: "Orbit Royal Marine",
    tagline: "Commanding deep maritime blue with luminous sapphire hands",
    dialType: "Royal Marine Blue Dial",
    color: "#1D4ED8",
  },
  {
    id: 4,
    image: "/assets/voteyourpick/watch4.webp",
    percentage: 81,
    name: "Orbit Sovereign Gold",
    tagline: "18k rose gold casing paired with tactical military khaki",
    dialType: "Gold & Khaki Green Dial",
    color: "#D97706",
  },
  {
    id: 5,
    image: "/assets/voteyourpick/watch5.webp",
    percentage: 78,
    name: "Orbit Two-Tone Crown",
    tagline: "The ultimate balance of polished steel, regal gold, and forest green",
    dialType: "Two-Tone Emerald Dial",
    color: "#10B981",
  },
  {
    id: 6,
    image: "/assets/voteyourpick/watch6.webp",
    percentage: 49,
    name: "Orbit Astral Steel",
    tagline: "Surgical-grade stainless steel with silver-burst sunray dial",
    dialType: "Silver Sunburst Dial",
    color: "#94A3B8",
  },
];

export const VoteYourPick: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(watches[5].id); // default to 6th or 1st watch
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [userPick, setUserPick] = useState<number | null>(null);
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [voteCheckDone, setVoteCheckDone] = useState<boolean>(false);

  // Dynamic percentage map per watch ID (randomized between 40-90 or synced from DB)
  const [percentages, setPercentages] = useState<Record<number, number>>(() => {
    const initialMap: Record<number, number> = {};
    watches.forEach((w) => {
      initialMap[w.id] = w.percentage;
    });
    return initialMap;
  });

  // Check backend IP voting status on mount
  useEffect(() => {
    fetch("/api/vote")
      .then(async (r) => {
        const contentType = r.headers.get("content-type");
        if (r.ok && contentType && contentType.includes("application/json")) {
          return r.json();
        }
        return null;
      })
      .then((data) => {
        if (data && data.success) {
          if (data.hasVoted && data.watchId) {
            setUserPick(data.watchId);
            setSelectedId(data.watchId);
            setHasVoted(true);
          }
          if (data.totalVotes > 0 && data.percentages) {
            const updatedMap = { ...percentages };
            watches.forEach((w) => {
              if (data.percentages[w.id] !== undefined && data.percentages[w.id] > 0) {
                updatedMap[w.id] = data.percentages[w.id];
              }
            });
            setPercentages(updatedMap);
          }
        }
      })
      .catch(() => {})
      .finally(() => setVoteCheckDone(true));
  }, []);

  // Whenever selectedId changes, generate a fresh random percentage between 40-90 if user hasn't voted yet
  const handleSelectWatch = (id: number) => {
    if (selectedId === id) return;
    setSelectedId(id);

    if (!hasVoted) {
      setPercentages((prev) => {
        const nextVal = Math.floor(Math.random() * (90 - 40 + 1)) + 40;
        return {
          ...prev,
          [id]: nextVal,
        };
      });
    }
  };

  const handleVote = async () => {
    if (hasVoted || isVoting) return;
    setIsVoting(true);
    setUserPick(selectedId);

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ watchId: selectedId }),
      });
      const contentType = res.headers.get("content-type");
      if (res.ok && contentType && contentType.includes("application/json")) {
        const data = await res.json();
        if (data && data.success) {
          setUserPick(data.watchId);
          if (data.totalVotes > 0 && data.percentages) {
            setPercentages((prev) => ({
              ...prev,
              ...data.percentages,
            }));
          }
          setHasVoted(true);
        } else {
          setHasVoted(true);
        }
      } else {
        setHasVoted(true);
      }
    } catch (e) {
      console.error("Voting submission error:", e);
      setHasVoted(true);
    } finally {
      setIsVoting(false);
    }
  };

  const selectedWatch = watches.find((w) => w.id === selectedId) || watches[0];
  const currentPercentage = percentages[selectedId] ?? selectedWatch.percentage;

  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-black border-t border-white/5 overflow-hidden select-none">
      {/* Subtle luxury ambient backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[84rem] mx-auto flex flex-col items-center">
        
        {/* Minimalist Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-medium text-white tracking-tight leading-tight mb-3 lowercase">
            vote your pick
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base font-light tracking-wide">
            {!voteCheckDone
              ? "\u00a0"
              : !hasVoted
              ? "Choose the dial that speaks to you"
              : "The results are in"}
          </p>

          {hasVoted && userPick && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] text-white uppercase tracking-widest backdrop-blur-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              You voted for {watches.find(w => w.id === userPick)?.dialType || `Model ${userPick}`}
            </motion.div>
          )}
        </div>

        {/* Exact Side-by-Side Layout from Screenshot */}
        <div className="w-full flex flex-row items-center justify-between gap-2 sm:gap-6 lg:gap-10 xl:gap-14">
          
          {/* Left Side: Vertical Watch Strips with bottom silver boxes */}
          <div className="w-[50%] sm:w-[55%] flex flex-row items-center justify-start gap-1 sm:gap-3 md:gap-3.5 overflow-visible">
            {watches.map((watch, index) => (
              <WatchCard
                key={watch.id}
                watch={watch}
                index={index}
                isActive={selectedId === watch.id}
                onClick={() => handleSelectWatch(watch.id)}
                percentage={percentages[watch.id]}
                hasVoted={hasVoted}
              />
            ))}
          </div>

          {/* Right Side: FULL WATCH DISPLAY + Vertical Percentage Box */}
          <div className="w-[50%] sm:w-[45%] h-full flex items-center justify-center relative">
            <WatchPreview
              watch={selectedWatch}
              percentage={currentPercentage}
            />
          </div>

        </div>

        {/* Minimalist CTA Button Below */}
        <div className="mt-12 sm:mt-16 w-full flex justify-center">
          <button
            onClick={handleVote}
            disabled={isVoting || hasVoted}
            className={`group relative px-10 py-4 text-xs uppercase font-mono tracking-[0.25em] font-bold rounded-full overflow-hidden transition-all duration-300 ${
              hasVoted && userPick === selectedId
                ? "bg-white/20 text-white border border-white/40 cursor-default shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                : hasVoted
                ? "bg-zinc-900 text-zinc-500 border border-white/5 cursor-not-allowed"
                : "bg-white text-zinc-900 hover:bg-zinc-100 hover:scale-[1.03] shadow-[0_0_30px_rgba(255,255,255,0.25)] active:scale-[0.98]"
            }`}
          >
            {isVoting ? (
              <span>Locking in...</span>
            ) : hasVoted && userPick === selectedId ? (
              <span className="flex items-center gap-2">
                ✓ Locked in your pick
              </span>
            ) : hasVoted ? (
              <span>Already voted</span>
            ) : (
              <span>Lock in my pick</span>
            )}
          </button>
        </div>

      </div>
    </section>
  );
};
