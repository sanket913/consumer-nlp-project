"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowDown } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24">
      <div className="relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-2 backdrop-blur-md dark:border-primary/30 dark:bg-primary/10"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Powered by Advanced NLP
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          AI Consumer
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Complaint Analyzer
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl"
        >
          Instantly classify consumer complaints using state-of-the-art natural language processing. 
          Get accurate category predictions in seconds.
        </motion.p>

        {/* Scroll indicator */}
        <motion.a
          href="#analyzer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="inline-flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
        >
          
        </motion.a>
      </div>

      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/15 blur-[100px] dark:bg-primary/20" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/15 blur-[100px] dark:bg-accent/20" />
      </div>
    </section>
  )
}
