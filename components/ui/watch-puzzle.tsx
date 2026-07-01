"use client";

import React, { useState, useEffect } from "react";
import { Reorder, motion, AnimatePresence } from "framer-motion";
import { Shuffle, RotateCcw, CheckCircle2 } from "lucide-react";

const SLICES = 7;

function shuffleArr(arr: number[]): number[] {
  const a = [...arr];
  do {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  } while (a.every((v, i) => v === i));
  return a;
}

function buildSolved() {
  return Array.from({ length: SLICES }, (_, i) => i);
}

function isSolved(order: number[]) {
  return order.every((v, i) => v === i);
}

interface WatchPuzzleProps {
  imageUrl?: string;
  title?: string;
  description?: string;
}

export function WatchPuzzle({
  imageUrl = "/fylex-watch.jpg",
  title = "The Masterpiece",
  description = "Solve the puzzle to reveal the watch.",
}: WatchPuzzleProps) {
  const [order, setOrder] = useState<number[]>(buildSolved());
  const [isMounted, setIsMounted] = useState(false);
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);

  // Shuffle only on client after mount (prevents hydration mismatch)
  useEffect(() => {
    setOrder(shuffleArr(buildSolved()));
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (isSolved(order)) setSolved(true);
  }, [order, isMounted]);

  const handleReorder = (newOrder: number[]) => {
    // Only count a move when something actually changed position
    const changed = newOrder.some((v, i) => v !== order[i]);
    if (changed) setMoves((m) => m + 1);
    setOrder(newOrder);
  };

  const handleShuffle = () => {
    setOrder(shuffleArr(buildSolved()));
    setSolved(false);
    setMoves(0);
  };

  // ── Skeleton (server + pre-mount) ─────────────────────────────────────────
  if (!isMounted) {
    return (
      <section className="relative w-full bg-black py-24 px-6">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-14">
          <div className="text-center">
            <p className="text-zinc-600 text-[10px] tracking-[0.5em] uppercase mb-5">{title}</p>
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight leading-[1.1]">
              Assemble the{" "}
              <span className="italic text-zinc-400">Masterpiece</span>
            </h2>
          </div>
          <div className="w-full max-w-md flex flex-col animate-pulse" style={{ gap: "2px" }}>
            {Array.from({ length: SLICES }).map((_, i) => (
              <div key={i} className="w-full h-14 bg-zinc-900 rounded-sm" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Puzzle ─────────────────────────────────────────────────────────────────
  return (
    <section className="relative w-full bg-black py-24 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.018] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-xl mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-zinc-600 text-[10px] tracking-[0.5em] uppercase mb-5">{title}</p>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight leading-[1.1]">
            Assemble the{" "}
            <span className="italic text-zinc-400">Masterpiece</span>
          </h2>
          <p className="mt-5 text-zinc-500 text-sm max-w-sm mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Strip stack */}
        <div className="relative w-full max-w-md rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl bg-zinc-950">
          <Reorder.Group
            axis="y"
            values={order}
            onReorder={handleReorder}
            className="flex flex-col transition-[gap] duration-700 ease-in-out"
            style={{ gap: solved ? "0px" : "2px" }}
          >
            {order.map((sliceIndex) => {
              // Each strip shows 1/SLICES of the image height
              // backgroundSize: 100% wide, SLICES*100% tall → shows correct horizontal band
              const bgY = (sliceIndex / (SLICES - 1)) * 100;

              return (
                <Reorder.Item
                  key={sliceIndex}
                  value={sliceIndex}
                  className="relative w-full select-none cursor-grab active:cursor-grabbing group overflow-hidden"
                  style={{ height: "60px" }}
                  whileDrag={{
                    scale: 1.025,
                    zIndex: 50,
                    boxShadow:
                      "0 20px 50px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.2)",
                    filter: "brightness(1.2)",
                  }}
                >
                  {/* Image strip */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `url('${imageUrl}')`,
                      backgroundSize: `100% ${SLICES * 100}%`,
                      backgroundPosition: `center ${bgY}%`,
                      backgroundRepeat: "no-repeat",
                    }}
                  />

                  {/* Subtle vignette on strip edges to give depth */}
                  <div 
                    className="absolute inset-0 pointer-events-none transition-opacity duration-700" 
                    style={{
                      opacity: solved ? 0 : 1,
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.5)"
                    }}
                  />

                  {/* Drag handle hint — three dots on right */}
                  <div className={`absolute right-3 top-1/2 -translate-y-1/2 flex-col gap-[3px] opacity-0 group-hover:opacity-50 transition-opacity duration-200 pointer-events-none ${solved ? 'hidden' : 'flex'}`}>
                    <span className="w-[18px] h-[2px] bg-white rounded-full block" />
                    <span className="w-[18px] h-[2px] bg-white rounded-full block" />
                    <span className="w-[18px] h-[2px] bg-white rounded-full block" />
                  </div>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>

          {/* Victory full-image overlay to cover any sub-pixel rendering seams */}
          <AnimatePresence>
            {solved && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  backgroundImage: `url('${imageUrl}')`,
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-5 mt-7">
          <span className="text-zinc-600 text-xs tracking-[0.3em] uppercase tabular-nums min-w-[80px] text-center">
            {moves} {moves === 1 ? "move" : "moves"}
          </span>
          <button
            onClick={handleShuffle}
            className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-zinc-500 hover:text-white border border-zinc-800 hover:border-zinc-500 px-5 py-2 rounded-full transition-all duration-300"
          >
            <Shuffle className="w-3 h-3" />
            Shuffle
          </button>
        </div>

        {!solved && (
          <p className="mt-4 text-zinc-700 text-[10px] tracking-widest uppercase text-center">
            Drag strips up or down to reorder
          </p>
        )}

        {/* Victory message */}
        <AnimatePresence>
          {solved && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-14 flex flex-col items-center gap-5 text-center"
            >
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm tracking-widest uppercase font-medium">
                  Masterpiece Restored
                </span>
              </div>
              <p className="text-white font-serif text-2xl md:text-3xl tracking-tight">
                You've unveiled the{" "}
                <span className="italic text-zinc-400">Fylex.</span>
              </p>
              <p className="text-zinc-500 text-sm">
                Completed in {moves} {moves === 1 ? "move" : "moves"}.
              </p>
              <button
                onClick={handleShuffle}
                className="flex items-center gap-2 mt-2 px-8 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-zinc-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
