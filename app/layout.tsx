import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Spotlight } from "@/components/ui/spotlight";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fylex",
  description: "It's your time. Coming soon.",
  icons: {
    icon: "/fylex-waitlist/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      /* FIXED: Changed h-full to min-h-screen to lock the HTML boundary tightly to the device window size */
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} min-h-screen antialiased dark`}
    >
      {/* FIXED: 
          1. Removed flex-col which was breaking the absolute tracking coordinates.
          2. Added w-full and min-h-screen to force the mouse listeners to read the entire screen.
      */}
      <body className="w-full min-h-screen relative overflow-x-clip m-0 p-0 text-white bg-black/[0.96]">
        
        {/* GLOBAL LAYER: Now accurately maps your full monitor space */}
        <Spotlight className="z-0" size={550} />
        
        {/* Content Layer floating smoothly on top */}
        <main className="relative z-10 w-full min-h-screen">
          {children}
        </main>
        
      </body>
    </html>
  );
}