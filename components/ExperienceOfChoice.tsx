"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PersonaOption {
  id: string;
  name: string;
  persona: string;
  tagline: string;
  description: string;
  image: string;
  color: string;
  align: "right-img" | "left-img";
}

export const personaOptions: PersonaOption[] = [
  {
    id: "gold",
    name: "GOLD",
    persona: "The Achiever",
    tagline: "ambitious, confident, inspiring",
    description:
      "The Achiever commands attention without saying a word. A radiant gold dial signifies excellence, bold leadership, and an unapologetic pursuit of absolute success.",
    image: "/assets/experiencedial/gold.webp",
    color: "#D4AF37",
    align: "right-img",
  },
  {
    id: "black",
    name: "BLACK",
    persona: "The Thinker",
    tagline: "wise, reflective, trustworthy",
    description:
      "The Thinker moves with purpose and deep clarity. A matte black dial embodies sophistication, quiet intelligence, and timeless self-assurance.",
    image: "/assets/experiencedial/black.webp",
    color: "#27272A",
    align: "left-img",
  },
  {
    id: "green",
    name: "OLIVE GREEN",
    persona: "The Builder",
    tagline: "steady, grounded, dependable",
    description:
      "The Builder values reliability and structural integrity above all. An olive green dial reflects patience, resilience, and an unwavering commitment to craftsmanship.",
    image: "/assets/experiencedial/green.webp",
    color: "#4E6548",
    align: "right-img",
  },
  {
    id: "silver",
    name: "SILVER",
    persona: "The Explorer",
    tagline: "curious, adaptable, innovative",
    description:
      "The Explorer looks beyond the horizon. A sleek silver dial perfectly suits a forward-thinking mind, built for discovery, agility, and modern innovation.",
    image: "/assets/experiencedial/silver.webp",
    color: "#C0C0C0",
    align: "left-img",
  },
];

export const ExperienceOfChoice: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6 md:px-8 bg-black border-t border-white/5 overflow-hidden select-none">
      {/* Soft background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans font-bold text-white tracking-wide uppercase mb-3">
            THE EXPERIENCE OF CHOICE
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg font-light tracking-wider lowercase">
            select dial color to reveal your persona
          </p>
        </motion.div>

        {/* Staggered 4 Dial Rows Layout */}
        <div className="w-full flex flex-col gap-8 sm:gap-12 md:gap-14 items-center">
          {personaOptions.map((option) => {
            const isSelected = selectedId === option.id;

            // Render Text Column Content
            const renderTextContent = () => (
              <motion.div layout className="flex flex-col justify-center h-full w-full">
                <motion.span layout className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-wider uppercase transition-colors group-hover:text-white/90">
                  {option.name}
                </motion.span>
                
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="flex flex-col overflow-hidden"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-widest bg-white/10 text-white border border-white/20 shadow-sm">
                          Persona Revealed
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-medium mb-2">
                        {option.persona}
                      </h3>
                      <p className="text-zinc-300 italic text-base sm:text-lg md:text-xl mb-4 font-serif">
                        "{option.tagline}"
                      </p>
                      <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
                        {option.description}
                      </p>


                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );

            // Render Image Column Content
            const renderImageContent = () => (
              <motion.div
                layout
                initial={false}
                animate={{ 
                  height: isSelected ? "auto" : 140, // Expanded height vs closed pill height
                  minHeight: isSelected ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 400 : 550) : 140
                }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className={`relative transition-all duration-500 ${
                  isSelected 
                    ? "w-full bg-transparent overflow-visible" 
                    : "w-[280px] sm:w-[340px] md:w-[420px] rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl overflow-hidden"
                }`}
              >
                <motion.img
                  layout
                  src={option.image}
                  alt={option.name}
                  initial={false}
                  animate={{ 
                    scale: isSelected ? (typeof window !== 'undefined' && window.innerWidth < 1024 ? 1.6 : 2.8) : 1.9,
                    y: isSelected ? 0 : 0
                  }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  className={`absolute inset-0 w-full h-full object-center ${
                    isSelected ? "object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]" : "object-cover"
                  }`}
                />
              </motion.div>
            );

            return (
              <motion.div
                layout
                key={option.id}
                onClick={() => handleSelect(option.id)}
                whileHover={!isSelected ? { scale: 1.01 } : {}}
                className={`w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 p-4 sm:p-6 lg:p-8 rounded-3xl sm:rounded-[2rem] cursor-pointer transition-colors duration-500 overflow-hidden ${
                  isSelected
                    ? "bg-zinc-900/90 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
                    : "bg-transparent border border-transparent hover:bg-white/[0.03]"
                }`}
              >
                {/* Left/Right arrangement based on align and selection state */}
                {option.align === "right-img" ? (
                  <>
                    <div className="w-full lg:w-1/2 flex items-start justify-center lg:justify-start lg:pl-6 order-2 lg:order-1">
                      {renderTextContent()}
                    </div>
                    <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end lg:pr-4 order-1 lg:order-2">
                      {renderImageContent()}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start lg:pl-4 order-1">
                      {renderImageContent()}
                    </div>
                    <div className="w-full lg:w-1/2 flex items-start justify-center lg:justify-end lg:pr-6 order-2">
                      {renderTextContent()}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom helper prompt */}
        <div className="mt-14 sm:mt-16 text-center text-xs text-zinc-600 font-mono tracking-widest uppercase">
          <span>Click any dial above to inspect motivation • Scroll below to cast your vote</span>
        </div>

      </div>
    </section>
  );
};
