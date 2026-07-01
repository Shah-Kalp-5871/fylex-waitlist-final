'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import Lenis from '@studio-freight/lenis'
import { ZoomParallax } from "@/components/ui/zoom-parallax";

export default function DefaultDemo() {

	React.useEffect( () => {
        const lenis = new Lenis()
       
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    },[])


	const images = [
		{
			src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Tech device',
		},
		{
			src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Modern architecture',
		},
		{
			src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Laptop setup',
		},
		{
			src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Abstract dark',
		},
		{
			src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Architecture detail',
		},
		{
			src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Textured luxury',
		},
		{
			src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
			alt: 'Clean tech',
		},
	];

	return (
		<main className="min-h-screen w-full bg-zinc-950 text-white">
			<div className="relative flex h-[50vh] items-center justify-center">
				{/* Radial spotlight */}
				<div
					aria-hidden="true"
					className={cn(
						'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
						'bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent_50%)]',
						'blur-[30px]',
					)}
				/>
				<h1 className="text-center text-4xl font-bold">
					Scroll Down for Zoom Parallax
				</h1>
			</div>
			<ZoomParallax images={images} />
			<div className="h-[50vh]"/>
		</main>
	);
}
