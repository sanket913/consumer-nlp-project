"use client"

import dynamic from "next/dynamic"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AnalyzerSection from "@/components/analyzer-section"
import CategoryCards from "@/components/category-cards"
import Footer from "@/components/footer"


// Dynamically import the 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import("@/components/scene-3d"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-primary/5" />
  ),
})

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* 3D Background */}
      <Scene3D />
      
      {/* Semi-transparent overlay for better text readability */}
      <div className="fixed inset-0 z-0 bg-background/75 backdrop-blur-[1px] dark:bg-background/70" />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AnalyzerSection />
        <CategoryCards />
        <Footer />
      </div>
      
      <Toaster />
    </main>
  )
}
