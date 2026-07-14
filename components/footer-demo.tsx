"use strict";

import React, { useRef } from "react";
import { PhysicsItem } from "@/components/ui/interactive-physics-footer";
import dynamic from "next/dynamic";

const InteractivePhysicsFooter = dynamic(
  () => import("@/components/ui/interactive-physics-footer").then((mod) => mod.InteractivePhysicsFooter),
  { ssr: false }
);
import { ArrowRight, Globe, Mail, MessageCircle, Cpu, Layers, Sparkles, Command } from "lucide-react";

export function FooterDemo() {
  const ctaButtonRef = useRef<HTMLButtonElement>(null);

  const mockBrands = [
    { name: "React", bg: "bg-blue-600/90 text-white", icon: <Layers className="w-4 h-4" /> },
    { name: "Tailwind", bg: "bg-cyan-500/90 text-white", icon: <Command className="w-4 h-4" /> },
    { name: "Matter.js", bg: "bg-amber-500/90 text-white", icon: <Cpu className="w-4 h-4" /> },
    { name: "TypeScript", bg: "bg-sky-700/90 text-white", icon: <Layers className="w-4 h-4" /> },
    { name: "GSAP", bg: "bg-emerald-500/90 text-white", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Framer", bg: "bg-purple-600/90 text-white", icon: <Layers className="w-4 h-4" /> },
    { name: "Next.js", bg: "bg-black text-white dark:bg-white dark:text-black", icon: <Command className="w-4 h-4" /> },
  ];

  return (
    <footer className="w-full bg-background border-t border-border">
      <InteractivePhysicsFooter
        ctaRef={ctaButtonRef}
        showVectorGuide={true}
        gravity={{ x: 0, y: 0.9 }}
        className="h-[600px] flex flex-col justify-between px-6 py-12 md:px-16"
      >
        {/* Upper Segment: Branding Headline & Nav Context */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8 z-30 pointer-events-auto">
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Let's build something extraordinary.
            </h2>
            <p className="mt-4 text-muted-foreground text-sm md:text-base">
              Bringing high-fidelity physical design components and interactive interfaces into dynamic digital products.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
            <a href="#about" className="hover:text-foreground transition-colors">About Us</a>
            <a href="#careers" className="hover:text-foreground transition-colors">Careers</a>
          </div>
        </div>

        {/* Central Core: CTA Destination Object */}
        <div className="w-full flex justify-center items-center my-auto z-30 pointer-events-auto">
          <button
            ref={ctaButtonRef}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium bg-foreground text-background rounded-full transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring"
            onClick={() => console.log("CTA Connection Clicked")}
          >
            Let's Connect
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Matter Physics Rigid Elements Pool */}
        {mockBrands.map((brand, i) => (
          <PhysicsItem
            key={brand.name}
            x={`${20 + (i * 10)}%`}
            y={`${15 + (i * 5)}%`}
            angle={i * 15}
            matterBodyOptions={{ friction: 0.15, restitution: 0.45, density: 0.002 }}
          >
            <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium shadow-md cursor-grab active:cursor-grabbing backdrop-blur-sm ${brand.bg}`}>
              {brand.icon}
              <span>{brand.name}</span>
            </div>
          </PhysicsItem>
        ))}

        {/* Bottom Bar: Copyright Meta Details */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border/60 z-30 pointer-events-auto text-xs text-muted-foreground gap-4">
          <div>All Rights Reserved 2026 © Engine Studio.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 hover:text-foreground transition-colors"><MessageCircle className="w-4 h-4" /></a>
            <a href="#" className="p-2 hover:text-foreground transition-colors"><Globe className="w-4 h-4" /></a>
            <a href="#" className="p-2 hover:text-foreground transition-colors"><Mail className="w-4 h-4" /></a>
          </div>
        </div>
      </InteractivePhysicsFooter>
    </footer>
  );
}
