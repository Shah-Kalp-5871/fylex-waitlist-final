"use client"

import React, { useEffect, useState } from "react"
import Lenis from "@studio-freight/lenis"
import { WaitlistForm } from "@/components/ui/waitlist-form"
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider
} from "@/components/ui/image-comparison"
import { motion } from "framer-motion"

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  const [activeChoice, setActiveChoice] = useState<number | null>(null);

  const choices = [
    { id: 1, title: "Olive Green", persona: "The Builder", desc: "steady, grounded, dependable", img: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg" },
    { id: 2, title: "Dark Blue", persona: "The Thinker", desc: "wise, reflective, trustworthy", img: "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg" },
    { id: 3, title: "Silver", persona: "The Explorer", desc: "curious, adaptable, innovative", img: "https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg" },
    { id: 4, title: "Gold", persona: "The Achiever", desc: "ambitious, confident, inspiring", img: "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
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

      {/* Main Content Wrapper */}
      <main className="relative z-10 w-full min-h-screen flex flex-col">
        
        {/* Fixed Parallax Video Background for Hero */}
        <div className="fixed inset-0 z-0 w-full h-screen pointer-events-none">
          <video
            src="/assets/Fylexxx.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black"></div>
        </div>

        {/* Hero Section */}
        <section className="relative z-10 w-full h-screen flex items-center justify-center bg-transparent pt-32 pb-24">
          <div className="flex flex-col items-center justify-center text-center px-4 w-full h-full pointer-events-none">
            <p className="text-zinc-300 tracking-[0.3em] uppercase text-sm md:text-base font-semibold mb-6 text-shadow-sm drop-shadow-md">
              ITS YOUR TIME.
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] font-serif text-white max-w-4xl drop-shadow-xl">
              A watch, made around your choices.
            </h1>
            
            <div className="mt-16 w-full max-w-md pointer-events-auto shadow-2xl">
              <WaitlistForm />
            </div>
          </div>
        </section>

        {/* The Content Sections (Opaque backgrounds to cover the fixed video when scrolling down) */}
        <div className="relative z-20 w-full bg-black rounded-t-[2rem] md:rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          
          {/* The Belief Section */}
          <section className="w-full py-32 px-6">
            <div className="max-w-5xl mx-auto w-full">
              <h2 className="text-zinc-500 text-sm font-bold tracking-[0.3em] uppercase mb-16 text-center">The Belief</h2>
              
              <div className="relative group">
                <ImageComparison className="aspect-square md:aspect-[16/9] w-full rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/10" enableHover>
                  <ImageComparisonImage
                    src="https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg"
                    className="opacity-90"
                    alt="First Image"
                    position="left"
                  />
                  <ImageComparisonImage
                    src="https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg"
                    className=""
                    alt="Second Image"
                    position="right"
                  />
                  <ImageComparisonSlider className="w-0.5 bg-white/30 backdrop-blur-sm">
                    <div className="absolute top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                      <div className="w-1 h-4 bg-white/50 rounded-full"></div>
                    </div>
                  </ImageComparisonSlider>
                </ImageComparison>
              </div>
            </div>
          </section>

          {/* The Experience of Choices */}
          <section className="w-full py-32 px-6 border-t border-white/5 bg-zinc-950">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-4 text-center capitalize">
                The experience of choices
              </h2>
              <p className="text-zinc-500 mb-12 text-center uppercase tracking-widest text-xs">Select a dial to reveal your persona</p>
              
              <div className="flex flex-col md:flex-row h-[600px] md:h-[500px] lg:h-[600px] w-full gap-2 md:gap-4">
                {choices.map((choice, index) => {
                  const isActive = activeChoice === index;
                  return (
                    <div
                      key={choice.id}
                      onClick={() => setActiveChoice(isActive ? null : index)}
                      className={`relative overflow-hidden rounded-2xl md:rounded-3xl transition-[flex] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group ${
                        isActive ? "flex-[5] md:flex-[4]" : activeChoice === null ? "flex-1" : "flex-[0.5] md:flex-[0.8]"
                      }`}
                    >
                      <img 
                        src={choice.img} 
                        alt={choice.title} 
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ${isActive ? 'scale-105' : 'scale-100 group-hover:scale-105'}`} 
                      />
                      <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100' : 'bg-black/30 group-hover:bg-black/10'}`} />
                      
                      {/* Content visible when active */}
                      <div className={`absolute bottom-0 left-0 p-6 md:p-8 w-full md:w-2/3 lg:w-1/2 transition-all duration-700 delay-100 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
                        <div className="backdrop-blur-md bg-black/30 p-6 rounded-2xl border border-white/10 shadow-2xl">
                          <h3 className="text-3xl font-serif text-white mb-1">{choice.title}</h3>
                          <p className="text-xl text-zinc-300 font-serif italic mb-4">{choice.persona}</p>
                          <p className="text-zinc-400 font-light leading-relaxed">{choice.desc}</p>
                        </div>
                      </div>
                      
                      {/* Vertical/Horizontal title when inactive */}
                      <div className={`absolute transition-all duration-700 ${isActive ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'} 
                          bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-6 md:bottom-12 md:rotate-[-90deg] md:origin-left whitespace-nowrap`}>
                        <span className="text-white font-serif tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] font-medium">
                          {choice.title}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Heritage Section */}
          <section className="hidden w-full bg-black py-32 px-6 border-t border-white/5 relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.15 } }
              }}
              className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10"
            >
              
              {/* Main Text Card (Spans 8 cols) */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="md:col-span-8 bg-zinc-950/50 backdrop-blur-md border border-white/10 p-10 md:p-16 flex flex-col justify-center rounded-3xl shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <h2 className="text-zinc-500 text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-8 relative z-10">Built on 25 Years of Watchmaking</h2>
                <p className="text-2xl md:text-4xl font-serif text-white leading-snug mb-6 font-light relative z-10">
                  For over two decades, we've manufactured and assembled combinations in the Indian watch market.
                </p>
                <p className="text-lg md:text-xl text-zinc-400 font-light relative z-10">
                  Fylex is our way of bringing that experience directly to you.
                </p>
              </motion.div>

              {/* Side Image 1 (Spans 4 cols) */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="md:col-span-4 bg-zinc-950/50 border border-white/10 rounded-3xl overflow-hidden min-h-[300px] relative group shadow-2xl"
              >
                <img 
                  src="https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" 
                  alt="Watchmaking Process" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white font-serif italic tracking-wide text-lg drop-shadow-md">Craft</span>
                </div>
              </motion.div>

              {/* Side Image 2 (Spans 5 cols) */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="md:col-span-5 bg-zinc-950/50 border border-white/10 rounded-3xl overflow-hidden min-h-[300px] relative group shadow-2xl"
              >
                <img 
                  src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" 
                  alt="Precision" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white font-serif italic tracking-wide text-lg drop-shadow-md">Precision</span>
                </div>
              </motion.div>

              {/* Text/Quote Card (Spans 3 cols) */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="md:col-span-3 bg-zinc-950/50 backdrop-blur-md border border-white/10 p-8 flex flex-col items-center justify-center text-center rounded-3xl shadow-2xl group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="w-12 h-px bg-white/20 mb-6 group-hover:w-16 transition-all duration-500"></div>
                <p className="text-zinc-300 font-serif italic text-lg leading-relaxed group-hover:text-white transition-colors duration-500">
                  "A legacy of absolute perfection."
                </p>
                <div className="w-12 h-px bg-white/20 mt-6 group-hover:w-16 transition-all duration-500"></div>
              </motion.div>

              {/* Side Image 3 (Spans 4 cols) */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="md:col-span-4 bg-zinc-950/50 border border-white/10 rounded-3xl overflow-hidden min-h-[300px] relative group shadow-2xl"
              >
                <img 
                  src="https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" 
                  alt="Details" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white font-serif italic tracking-wide text-lg drop-shadow-md">Assembly</span>
                </div>
              </motion.div>

            </motion.div>
          </section>

          {/* Final CTA Section */}
          <section className="w-full bg-zinc-950 py-32 px-6 border-t border-white/5 text-center flex flex-col items-center justify-center overflow-hidden relative">
            {/* Soft glow in the center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-serif text-white font-medium mb-6 tracking-tight">Your First Fylex Awaits.</h2>
              <p className="text-xl md:text-2xl text-zinc-400 font-light mb-16">Be among the first to create yours.</p>
              
              <button 
                onClick={scrollToTop}
                suppressHydrationWarning
                className="fylex-cta px-10 py-5 group flex items-center gap-3 transition-all duration-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                Join the Waitlist
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-y-1">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </button>
            </div>
          </section>

          {/* ELEVATED FOOTER */}
          <footer className="w-full pt-16 pb-8 bg-black border-t border-white/5 relative overflow-hidden z-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-6 relative z-10">
              <img
                src="/fylex_logo_name.png"
                alt="Fylex Logo"
                className="w-40 md:w-56 object-contain opacity-60 hover:opacity-100 transition-opacity duration-500"
              />
              <p className="text-zinc-700 tracking-[0.2em] uppercase text-[10px] mt-4">
                © {new Date().getFullYear()} The Fylex. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
