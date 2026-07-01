"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function PortfolioScroll() {
  const container = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=150%", // Pin the section for an extended scroll duration
          scrub: 1, // Smooth scrubbing
          pin: true,
        },
      });

      // Execute a true 3D entrance and transformation matrix over the scroll timeline
      tl.fromTo(
        card.current,
        {
          opacity: 0,
          scale: 0.3,
          rotationX: -65,
          rotationY: 405, // 45deg base + 360 sweep
          rotationZ: -20,
          z: -500,
        },
        {
          opacity: 1,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          z: 0,
          ease: "power1.inOut",
        }
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="w-full min-h-screen relative overflow-hidden flex items-center justify-center bg-transparent perspective-[2000px] pointer-events-none"
    >
      <div
        ref={card}
        className="w-full max-w-5xl h-[600px] rounded-3xl bg-neutral-950/40 backdrop-blur-2xl border border-white/10 [transform-style:preserve-3d] shadow-[0_0_80px_-20px_rgba(255,255,255,0.1)] flex items-center p-8 md:p-14 pointer-events-none"
      >
        <div className="w-full h-full flex flex-col md:flex-row gap-10 items-center">
          {/* Left Side: Typography and Badges */}
          <div className="flex-1 flex flex-col justify-center space-y-8 h-full">
            <div className="text-sm font-bold tracking-widest text-white/50 uppercase flex items-center gap-4">
              <span className="w-8 h-[1px] bg-white/20"></span>
              01
            </div>

            <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 tracking-tighter">
              Next-Gen<br />Trading
            </h2>

            <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
              A high-fidelity algorithmic trading dashboard engineered with unmatched precision, delivering sub-millisecond execution and real-time visualization.
            </p>

            <div className="flex flex-wrap gap-3 pointer-events-auto">
              <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-neutral-300 backdrop-blur-md shadow-sm">
                React
              </span>
              <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-neutral-300 backdrop-blur-md shadow-sm">
                Node.js
              </span>
              <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-neutral-300 backdrop-blur-md shadow-sm">
                WebSockets
              </span>
            </div>
          </div>

          {/* Right Side: High-Fidelity Workspace Layout Placeholder */}
          <div className="flex-1 w-full h-full relative pointer-events-auto group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-white/10">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

              {/* Decorative Floating Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-colors duration-700"></div>

              {/* Abstract UI Mocks */}
              <div className="absolute top-6 left-6 right-6 h-12 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center px-4 gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              
              <div className="absolute top-24 left-6 bottom-6 right-1/2 mr-3 rounded-xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-md"></div>
              <div className="absolute top-24 right-6 bottom-6 left-1/2 ml-3 rounded-xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-md flex flex-col gap-3 p-4">
                <div className="w-full h-8 rounded-lg bg-white/5"></div>
                <div className="w-full h-8 rounded-lg bg-white/5"></div>
                <div className="w-2/3 h-8 rounded-lg bg-white/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
