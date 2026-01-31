"use client"

import { motion } from "framer-motion"

export default function SiteLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Tricolor Glow */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Saffron Flow */}
            <motion.div
                className="absolute -top-40 left-0 w-full h-1/2 bg-gradient-to-b from-orange-500/70 to-transparent blur-3xl"
                animate={{
                y: [-60, 40, -60],
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                }}
            />

            {/* Green Flow */}
            <motion.div
                className="absolute -bottom-40 left-0 w-full h-1/2 bg-gradient-to-t from-green-600/70 to-transparent blur-3xl"
                animate={{
                y: [60, -40, 60],
                scale: [1, 1.25, 1],
                opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
                }}
            />

    </div>


      {/* Center Chakra */}
      <motion.svg
        className="w-72 h-72"

        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="40" fill="none" stroke="#1e3a8a" strokeWidth="4" />

        {/* Spokes */}
        {[...Array(24)].map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180
          const x2 = 50 + Math.cos(angle) * 40
          const y2 = 50 + Math.sin(angle) * 40
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={x2}
              y2={y2}
              stroke="#1e3a8a"
              strokeWidth="2"
            />
          )
        })}
      </motion.svg>

    </motion.div>
  )
}
