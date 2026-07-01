"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const timelineData = [
  {
    id: 1,
    title: "The Forging",
    subtitle: "Raw Aerospace Titanium",
    description: "Every masterpiece begins as a solid block of grade-5 titanium, forged at extreme temperatures to ensure unparalleled durability and an impossibly light presence on the wrist.",
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
  },
  {
    id: 2,
    title: "The Calibre",
    subtitle: "300 Micro-Components",
    description: "Assembled by master watchmakers under intense magnification. A 72-hour power reserve beats relentlessly at the heart of the machine.",
    image: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg",
  },
  {
    id: 3,
    title: "The Polishing",
    subtitle: "Zaratsu Technique",
    description: "Weeks of obsessive hand-polishing result in a flawless mirror finish that catches light in ways previously thought impossible.",
    image: "https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg",
  },
  {
    id: 4,
    title: "The Assembly",
    subtitle: "Absolute Precision",
    description: "The delicate marriage of case and movement. Sealed perfectly in a vacuum environment to withstand extreme pressures and the test of time.",
    image: "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg",
  },
  {
    id: 5,
    title: "The Masterpiece",
    subtitle: "Ready for the World",
    description: "A timeless artifact. Certified, individually numbered, and secured in our vault, awaiting its rightful owner.",
    image: "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg",
  },
];

export const TimelineJourney = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Maps vertical scroll [0, 1] to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[350vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden border-y border-white/5 bg-[#050505]">
        <motion.div style={{ x }} className="flex gap-12 md:gap-16 px-12 md:px-32">
          
          <div className="flex flex-col justify-center min-w-[30vw] md:min-w-[25vw] shrink-0">
            <span className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-4">The Process</span>
            <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter leading-[1.1]">
              A Journey of <br/> <span className="italic font-light text-zinc-400">Creation</span>
            </h2>
            <p className="mt-8 text-zinc-400 font-light max-w-sm leading-relaxed text-sm md:text-base">
              Scroll horizontally to witness the metamorphosis from raw, unyielding metal to an instrument of absolute precision.
            </p>
          </div>

          {timelineData.map((item, index) => (
            <div 
              key={item.id} 
              className="group relative flex h-[60vh] md:h-[65vh] w-[85vw] md:w-[40vw] flex-col overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 shrink-0 cursor-pointer shadow-2xl"
            >
              {/* Background Image with Hover Effect */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-110 opacity-50 saturate-0 group-hover:saturate-100 group-hover:opacity-90"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
              
              {/* Content */}
              <div className="relative mt-auto p-8 md:p-12 z-10 flex flex-col justify-end">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px w-8 bg-white/30" />
                  <span className="text-white/60 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">
                    Phase 0{index + 1}
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-300 font-medium tracking-wide uppercase text-xs mb-6 opacity-80">
                  {item.subtitle}
                </p>
                <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500 ease-in-out">
                  <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex flex-col justify-center min-w-[20vw] shrink-0 items-center text-center px-12">
             <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6 text-zinc-500">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
             </div>
             <p className="text-zinc-400 font-serif italic text-xl">Continue the journey</p>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
