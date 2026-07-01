'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full flex flex-col md:block h-auto md:h-[500px] bg-transparent border-white/10 relative overflow-hidden group z-0">
      
      {/* LAYER 1: Text Content */}
      <div className="relative md:absolute inset-0 z-20 pointer-events-none flex h-full">
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center pointer-events-auto max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
            Interactive 3D
          </h1>
          <p className="mt-4 text-sm md:text-base text-neutral-300 max-w-md">
            Bring your UI to life with beautiful 3D scenes. Create immersive experiences 
            that capture attention and enhance your design.
          </p>
        </div>
        <div className="hidden md:block flex-1" />
      </div>

      {/* LAYER 2: The 3D Canvas */}
      <div className="relative md:absolute right-0 top-0 bottom-0 w-full h-[350px] md:h-full md:w-[65%] md:-mr-16 z-10 pointer-events-none">
        <div className="w-full h-full pointer-events-auto">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full bg-transparent"
          />
        </div>
      </div>

    </Card>
  )
}