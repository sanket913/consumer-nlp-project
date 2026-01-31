"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin } from "lucide-react"
import Logo from "@/components/logo"
import { Brain } from "lucide-react" // Declaring the Brain variable

export default function Footer() {
  return (
    <footer id="about" className="relative border-t border-border bg-card/90 backdrop-blur-sm dark:bg-card/60">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-xl bg-primary/20 blur-xl" />
                <Logo size={44} className="relative drop-shadow-lg" />
              </div>
              <span className="text-lg font-bold text-foreground">ComplaintAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Advanced NLP-powered consumer complaint classification system. 
              Helping businesses understand and categorize customer feedback efficiently.
            </p>
          </motion.div>


          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:text-right"
          >
            <h4 className="mb-4 font-semibold text-foreground">Connect</h4>
            <div className="flex gap-3 md:justify-end">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 border-t border-border/50 pt-6 text-center"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ComplaintAI. Developed By <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-extrabold">
  Sanket Prajapati
</span>

{/* Indian flag heart */}
<svg
  viewBox="0 0 100 90"
  className="inline-block w-6 h-6 ml-2 align-middle"
>
  <defs>
    <linearGradient id="tricolor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FF9933" />   {/* saffron */}
      <stop offset="50%" stopColor="#FFFFFF" />  {/* white */}
      <stop offset="100%" stopColor="#138808" /> {/* green */}
    </linearGradient>
  </defs>

  {/* heart shape */}
  <path
    d="M50 80 L15 45 A20 20 0 1 1 50 25 A20 20 0 1 1 85 45 Z"
    fill="url(#tricolor)"
    stroke="none"
  />

  {/* blue chakra dot */}
  <circle cx="50" cy="45" r="5" fill="#000080" />
</svg>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
