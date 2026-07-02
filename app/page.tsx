"use client"

import React, { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
// import { ImageCursorTrail } from "@/components/ui/image-cursor-trail" // unused: cursor trail disabled as per client request

import { useState } from "react"
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider
} from "@/components/ui/image-comparison"
import { WatchPuzzle } from "@/components/ui/watch-puzzle"
import FlowArt, { FlowSection } from "@/components/ui/story-scroll"
import { ShuffleHero } from "@/components/ui/shuffle-grid"
// import { CinematicFooter } from "@/components/ui/motion-footer" // unused: motion footer disabled as per client request

import { WaitlistForm } from "@/components/ui/waitlist-form"
import { DynamicFrameLayout, Frame } from "@/components/ui/dynamic-frame-layout"

const dynamicFrames: Frame[] = [
  {
    id: 1,
    media: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
    mediaType: "image",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    mediaSize: 1.1,
  },
  {
    id: 2,
    media: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg",
    mediaType: "image",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    mediaSize: 1.1,
  },
  {
    id: 3,
    media: "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg",
    mediaType: "image",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    mediaSize: 1.1,
  },
  {
    id: 4,
    media: "https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg",
    mediaType: "image",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    mediaSize: 1.1,
  },
  {
    id: 5,
    media: "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg",
    mediaType: "image",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    mediaSize: 1.1,
  },
  {
    id: 6,
    media: "https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg",
    mediaType: "image",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    mediaSize: 1.1,
  },
  {
    id: 7,
    media: "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg",
    mediaType: "image",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    mediaSize: 1.1,
  },
  {
    id: 8,
    media: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
    mediaType: "image",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    mediaSize: 1.1,
  },
  {
    id: 9,
    media: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg",
    mediaType: "image",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    mediaSize: 1.1,
  },
]

const bentoMediaItems = [
  {
    id: 1,
    type: "image",
    title: "Heritage Collection",
    desc: "The timeless classic",
    url: "/fylex-watch.jpg",
    span: "col-span-1 row-span-4 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-3",
  },
  {
    id: 2,
    type: "image",
    title: "The Mechanics",
    desc: "Swiss precision at its core.",
    url: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg",
    span: "col-span-1 row-span-4 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "Night Lume",
    desc: "Radiance in the dark",
    url: "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg",
    span: "col-span-1 row-span-4 sm:col-span-2 sm:row-span-2 md:col-span-1 md:row-span-3",
  },
  {
    id: 4,
    type: "image",
    title: "Sapphire Crystal",
    desc: "Unscratchable beauty",
    url: "https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg",
    span: "col-span-1 row-span-4 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: 5,
    type: "image",
    title: "Gold Master",
    desc: "Refined 18k accents",
    url: "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg",
    span: "col-span-1 row-span-4 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-3",
  },
  {
    id: 6,
    type: "image",
    title: "Aerospace Titanium",
    desc: "Light as a feather",
    url: "https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg",
    span: "col-span-1 row-span-4 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: 7,
    type: "image",
    title: "Legacy",
    desc: "Generations of craft",
    url: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
    span: "col-span-1 row-span-4 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-3",
  },
]

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])



  const imageUrls = [
    "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
    "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg",
    "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg",
    "https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg",
    "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg",
    "https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg",
    "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg",
  ]

  const scrollToFooter = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  }

  return (
    <div className="relative w-full bg-black min-h-screen font-sans selection:bg-white/20 overflow-x-clip">
      {/* Floating Center Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <nav className="pointer-events-auto flex flex-col items-center justify-center group cursor-pointer">
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 p-3 md:p-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-700 ease-out hover:bg-white/5 hover:border-white/20 hover:scale-110">
            <img
              src="/icon.png"
              alt="Fylex Logo"
              className="w-16 h-16 md:w-16 md:h-16 object-contain transition-all duration-700 ease-out group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            />
          </div>
          <span className="text-white font-serif tracking-[0.5em] uppercase text-[10px] mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 text-shadow-sm">Fylex</span>
        </nav>
      </header>







      {/* Main Content Wrapper (With high z-index and border radius for the cinematic footer reveal) */}
      <main className="relative z-10 w-full min-h-[120vh] bg-black text-white rounded-b-[2rem] md:rounded-b-[4rem] border-b border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col">
        
        {/* Hero Section */}
        <section className="relative w-full h-screen flex items-center justify-center pt-24">
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-auto">
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85] font-serif text-white uppercase mix-blend-difference">
              Time <span className="text-zinc-500 italic lowercase font-light">reimagined</span>.
            </h1>
            <p className="mt-8 text-zinc-400 max-w-xl mx-auto text-lg md:text-xl font-light tracking-wide mix-blend-difference">
              It's your time.<br />
              <span className="text-2xl md:text-3xl font-medium text-white block mt-2">Coming soon.</span>
            </p>
            
            <div className="mt-12 w-full max-w-md mix-blend-difference">
              <WaitlistForm />
            </div>
          </div>
        </section>




        {/* Image Comparison Section - Day vs Night Lume */}
        <section className="relative w-full bg-black py-32 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-zinc-500 text-sm font-bold tracking-[0.3em] uppercase mb-8 md:mb-16 text-center">Super-LumiNova® Engine</h2>
            <ImageComparison className="aspect-square md:aspect-[16/7] w-full rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/5" enableHover>
              <ImageComparisonImage
                src="https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg"
                className="brightness-110"
                alt="Watch in daylight"
                position="left"
              />
              <ImageComparisonImage
                src="https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg"
                className="brightness-50 hue-rotate-180 contrast-125"
                alt="Watch glowing in dark"
                position="right"
              />
              <ImageComparisonSlider className="w-0.5 bg-white/10 backdrop-blur-sm">
                <div className="absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] border-2 border-black"></div>
              </ImageComparisonSlider>
            </ImageComparison>
          </div>
        </section>

        {/* Dynamic Video Frame Section / The Gallery */}
        <section className="relative w-full bg-black py-20 px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/3 text-center lg:text-left flex flex-col items-center lg:items-start">
              <h2 className="text-zinc-500 text-sm font-bold tracking-[0.3em] uppercase mb-4">The Gallery</h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">A Symphony of<br className="hidden lg:block"/> Craftsmanship</h3>
              <p className="mt-6 text-zinc-400 font-light max-w-lg mx-auto lg:mx-0 leading-relaxed text-lg">
                Explore the myriad of textures, aerospace-grade materials, and engineering feats that make up The Fylex's inaugural masterpieces. Every angle tells a story.
              </p>
              <button suppressHydrationWarning className="mt-8 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors flex items-center gap-2">
                View Collection
              </button>
            </div>
            
            <div className="w-full lg:w-2/3 h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/5 relative">
              <DynamicFrameLayout 
                frames={dynamicFrames} 
                className="w-full h-full bg-[#09090b]" 
                hoverSize={6}
                gapSize={4}
                showFrames={false}
              />
            </div>
          </div>
        </section>

        {/* Watch Puzzle Section */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <WatchPuzzle
          imageUrl="/newpuzzelimg.jpeg"
          title="The Fylex Masterpieces"
          description="Drag & drop the pieces into place — or tap a tile, then tap its destination — to reveal the watch."
        />
        
        {/* Back to Top Section */}
        <div className="w-full bg-black py-20 flex flex-col items-center justify-center gap-8 border-t border-white/5">
          <p className="text-zinc-600 text-xs tracking-[0.4em] uppercase font-medium">Back to top</p>
          <button
            suppressHydrationWarning
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll back to top"
            className="group relative flex items-center justify-center w-16 h-16 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 transition-all duration-500 hover:scale-110 hover:border-zinc-400 hover:text-white hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]"
          >
            {/* Rotating ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 transition-transform duration-700 group-hover:rotate-0"
              viewBox="0 0 64 64"
            >
              <circle
                cx="32" cy="32" r="30"
                fill="none"
                stroke="white"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
              <circle
                cx="32" cy="32" r="30"
                fill="none"
                stroke="white"
                strokeOpacity="0.5"
                strokeWidth="1"
                strokeDasharray="188"
                strokeDashoffset="141"
                strokeLinecap="round"
                className="transition-all duration-700 group-hover:stroke-opacity-100 group-hover:[stroke-dashoffset:0]"
              />
            </svg>
            {/* Arrow icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
        </div>
      </main>

      {/* MOTION FOOTER DISABLED AS PER CLIENT REQUEST - Commented out CinematicFooter and removed its visual from the page */}
      {/* <CinematicFooter /> */}

      {/* ELEVATED FOOTER */}
      <footer className="w-full pt-16 pb-4 bg-black border-t border-white/5 relative overflow-hidden z-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-6 relative z-10">
          <img
            src="/fylex_logo_name.png"
            alt="Fylex Logo"
            className="w-48 md:w-64 object-contain opacity-80 hover:opacity-100 transition-opacity duration-500"
          />
          <p className="text-zinc-600 tracking-[0.2em] uppercase text-[10px] mt-4">
            © {new Date().getFullYear()} The Fylex. All rights reserved.
          </p>
        </div>
      </footer>

    </div>

  )
}
