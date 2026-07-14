"use client"

import React, { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export interface Frame {
  id: number
  media: string
  mediaType?: "video" | "image"
  defaultPos: { x: number; y: number; w: number; h: number }
  corner?: string
  edgeHorizontal?: string
  edgeVertical?: string
  mediaSize: number
  borderThickness?: number
  borderSize?: number
  isHovered?: boolean
}

interface FrameComponentProps {
  media: string
  mediaType?: "video" | "image"
  width: number | string
  height: number | string
  className?: string
  corner?: string
  edgeHorizontal?: string
  edgeVertical?: string
  mediaSize: number
  borderThickness?: number
  borderSize?: number
  showFrame: boolean
  isHovered: boolean
}

function FrameComponent({
  media,
  mediaType = "video",
  width,
  height,
  className = "",
  corner = "",
  edgeHorizontal = "",
  edgeVertical = "",
  mediaSize,
  borderThickness = 0,
  borderSize = 100,
  showFrame,
  isHovered,
}: FrameComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (mediaType === "video") {
      if (isHovered) {
        videoRef.current?.play().catch(() => {})
      } else {
        videoRef.current?.pause()
      }
    }
  }, [isHovered, mediaType])

  return (
    <div
      className={`relative ${className}`}
      style={{
        width,
        height,
        transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
      }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-xl border border-white/10 shadow-2xl">
        <div
          className="absolute inset-0 flex items-center justify-center bg-black"
          style={{
            zIndex: 1,
            transition: "all 0.3s ease-in-out",
            padding: showFrame ? `${borderThickness}px` : "0",
            width: showFrame ? `${borderSize}%` : "100%",
            height: showFrame ? `${borderSize}%` : "100%",
            left: showFrame ? `${(100 - borderSize) / 2}%` : "0",
            top: showFrame ? `${(100 - borderSize) / 2}%` : "0",
          }}
        >
          <div
            className="w-full h-full overflow-hidden"
            style={{
              transform: `scale(${mediaSize})`,
              transformOrigin: "center",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {mediaType === "video" ? (
              <video
                className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? "brightness-110 scale-105" : "brightness-50 grayscale"}`}
                src={media}
                loop
                muted
                playsInline
                ref={videoRef}
              />
            ) : (
              <Image
                src={media}
                alt="Showcase Media"
                fill
                className={`object-cover transition-all duration-500 ${isHovered ? "brightness-110 scale-105" : "brightness-50 grayscale"}`}
              />
            )}
          </div>
        </div>

        {showFrame && corner && edgeHorizontal && edgeVertical && (
          <div className="absolute inset-0" style={{ zIndex: 2 }}>
            <div
              className="absolute top-0 left-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})` }}
            />
            <div
              className="absolute top-0 right-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scaleX(-1)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scaleY(-1)" }}
            />
            <div
              className="absolute bottom-0 right-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scale(-1, -1)" }}
            />

            <div
              className="absolute top-0 left-16 right-16 h-16"
              style={{
                backgroundImage: `url(${edgeHorizontal})`,
                backgroundSize: "auto 64px",
                backgroundRepeat: "repeat-x",
              }}
            />
            <div
              className="absolute bottom-0 left-16 right-16 h-16"
              style={{
                backgroundImage: `url(${edgeHorizontal})`,
                backgroundSize: "auto 64px",
                backgroundRepeat: "repeat-x",
                transform: "rotate(180deg)",
              }}
            />
            <div
              className="absolute left-0 top-16 bottom-16 w-16"
              style={{
                backgroundImage: `url(${edgeVertical})`,
                backgroundSize: "64px auto",
                backgroundRepeat: "repeat-y",
              }}
            />
            <div
              className="absolute right-0 top-16 bottom-16 w-16"
              style={{
                backgroundImage: `url(${edgeVertical})`,
                backgroundSize: "64px auto",
                backgroundRepeat: "repeat-y",
                transform: "scaleX(-1)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

interface DynamicFrameLayoutProps {
  frames: Frame[]
  className?: string
  showFrames?: boolean
  hoverSize?: number
  gapSize?: number
}

export function DynamicFrameLayout({ 
  frames: initialFrames, 
  className,
  showFrames = false,
  hoverSize = 6,
  gapSize = 8
}: DynamicFrameLayoutProps) {
  const [frames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number; id: number } | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getRowSizes = () => {
    if (isMobile) return undefined; // Let CSS handle mobile
    if (hovered === null) return "4fr 4fr 4fr"
    const { row } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (isMobile) return undefined; // Let CSS handle mobile
    if (hovered === null) return "4fr 4fr 4fr"
    const { col } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    if (isMobile) return "center center"
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  return (
    <div
      className={`relative w-full h-full ${className} ${isMobile ? 'flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth p-4' : ''}`}
      style={isMobile ? { gap: `${gapSize * 2}px` } : {
        display: "grid",
        gridTemplateRows: getRowSizes(),
        gridTemplateColumns: getColSizes(),
        gap: `${gapSize}px`,
        transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
      }}
    >
      {frames.map((frame) => {
        const row = Math.floor(frame.defaultPos.y / 4)
        const col = Math.floor(frame.defaultPos.x / 4)
        const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)

        const isHoveredFrame = hovered?.id === frame.id

        return (
          <motion.div
            key={frame.id}
            className={`relative cursor-pointer shrink-0 ${isMobile ? 'snap-center rounded-2xl overflow-hidden shadow-2xl' : ''}`}
            style={{
              transformOrigin,
              transition: isMobile ? "none" : "transform 0.4s ease",
              width: isMobile ? "80vw" : "100%",
              height: "100%",
            }}
            onMouseEnter={() => !isMobile && setHovered({ row, col, id: frame.id })}
            onMouseLeave={() => !isMobile && setHovered(null)}
          >
            <FrameComponent
              media={frame.media}
              mediaType={frame.mediaType}
              width="100%"
              height="100%"
              className="absolute inset-0"
              corner={frame.corner}
              edgeHorizontal={frame.edgeHorizontal}
              edgeVertical={frame.edgeVertical}
              mediaSize={frame.mediaSize}
              borderThickness={frame.borderThickness}
              borderSize={frame.borderSize}
              showFrame={showFrames}
              isHovered={isMobile || isHoveredFrame}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
