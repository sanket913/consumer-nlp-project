"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import SiteLoader from "@/components/site-loader"

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 4200)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <SiteLoader key="loader" />}
      </AnimatePresence>

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>

      {/* Cinematic Blur Overlay (does NOT affect layout or 3D size) */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 backdrop-blur-md pointer-events-none z-[9998]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

