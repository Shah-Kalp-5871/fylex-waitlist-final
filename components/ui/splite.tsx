'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

// Inside components/ui/splite.tsx
export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><span className="loader"></span></div>}>
      <Spline
        scene={scene}
        className={className}
        // Ensuring the component itself doesn't force a solid background override
      />
    </Suspense>
  )
}
