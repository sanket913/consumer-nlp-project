"use client"

import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Logo from "@/components/logo"
import { useTheme } from "next-themes"
import { Brain } from "lucide-react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = true

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Analyze", href: "#analyzer" },
    { name: "Categories", href: "#categories" },
  ]

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative rounded-2xl border border-border bg-card/95 px-6 py-3 shadow-lg backdrop-blur-xl dark:bg-card/85">
          <div className="flex items-center justify-between flex-row">
            {/* Logo */}
            <motion.a 
              href="#"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-xl bg-primary/20 blur-xl" />
                <Logo size={44} className="relative drop-shadow-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-foreground">
                  ComplaintAI
                </span>
                
              </div>
            </motion.a>

            {/* Right Side Controls */}
<div className="hidden md:flex items-center gap-2 ml-auto">
  {/* Desktop Navigation */}
  <div className="flex items-center gap-1">
    {navItems.map((item, index) => (
      <motion.a
        key={item.name}
        href={item.href}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index, duration: 0.4 }}
        className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        whileHover={{ scale: 1.05 }}
      >
        {item.name}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.a>
    ))}
  </div>
</div>


            {/* Mobile menu button */}
            <div className="flex items-center gap-2  ml-auto md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 flex flex-col gap-2 border-t border-border/50 pt-4 md:hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
