"use client"

import { motion } from "framer-motion"

interface LogoProps {
  className?: string
  size?: number
}

export default function Logo({ className = "", size = 40 }: LogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ rotate: 0 }}
      whileHover={{ rotate: 5, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Indian Flag Tricolor Gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF9933" />
          <stop offset="33%" stopColor="#FF9933" />
          <stop offset="33%" stopColor="#FFFFFF" />
          <stop offset="66%" stopColor="#FFFFFF" />
          <stop offset="66%" stopColor="#138808" />
          <stop offset="100%" stopColor="#138808" />
        </linearGradient>
        <linearGradient id="innerGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#138808" />
          <stop offset="50%" stopColor="#000080" />
          <stop offset="100%" stopColor="#FF9933" />
        </linearGradient>
        <radialGradient id="chakraGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000080" />
          <stop offset="100%" stopColor="#1a1a6e" />
        </radialGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background hexagon shape */}
      <motion.path
        d="M24 4L42 14V34L24 44L6 34V14L24 4Z"
        fill="url(#logoGradient)"
        filter="url(#glow)"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Inner hexagon */}
      <motion.path
        d="M24 8L38 16V32L24 40L10 32V16L24 8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      {/* Ashoka Chakra inspired central design */}
      <g filter="url(#glow)">
        {/* Central Ashoka Chakra circle */}
        <motion.circle
          cx="24"
          cy="24"
          r="7"
          fill="url(#chakraGradient)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        />
        
        {/* Inner white ring */}
        <motion.circle
          cx="24"
          cy="24"
          r="5.5"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.35, type: "spring" }}
        />

        {/* 24 Spokes of Ashoka Chakra (simplified to 12 for clarity) */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180
          const x1 = 24 + Math.cos(angle) * 2
          const y1 = 24 + Math.sin(angle) * 2
          const x2 = 24 + Math.cos(angle) * 5
          const y2 = 24 + Math.sin(angle) * 5
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="white"
              strokeWidth="0.8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.03 }}
            />
          )
        })}

        {/* Neural connection lines - Saffron */}
        <motion.path
          d="M24 17V10"
          stroke="#FF9933"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        
        {/* Neural connection lines - Green */}
        <motion.path
          d="M24 31V38"
          stroke="#138808"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        />
        
        {/* Side connections */}
        <motion.path
          d="M18 21L12 16"
          stroke="#FF9933"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
        <motion.path
          d="M30 21L36 16"
          stroke="#FF9933"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
        />
        <motion.path
          d="M18 27L12 32"
          stroke="#138808"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        />
        <motion.path
          d="M30 27L36 32"
          stroke="#138808"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
        />

        {/* Outer nodes - Saffron (top) */}
        <motion.circle
          cx="24"
          cy="10"
          r="2.5"
          fill="#FF9933"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        />
        <motion.circle
          cx="12"
          cy="16"
          r="2"
          fill="#FF9933"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.85, type: "spring" }}
        />
        <motion.circle
          cx="36"
          cy="16"
          r="2"
          fill="#FF9933"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.9, type: "spring" }}
        />
        
        {/* Outer nodes - Green (bottom) */}
        <motion.circle
          cx="24"
          cy="38"
          r="2.5"
          fill="#138808"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.95, type: "spring" }}
        />
        <motion.circle
          cx="12"
          cy="32"
          r="2"
          fill="#138808"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
        />
        <motion.circle
          cx="36"
          cy="32"
          r="2"
          fill="#138808"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.05, type: "spring" }}
        />

        {/* Pulsing ring effect */}
        <motion.circle
          cx="24"
          cy="24"
          r="10"
          fill="none"
          stroke="#000080"
          strokeWidth="1"
          strokeOpacity="0.4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.3, opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      </g>
    </motion.svg>
  )
}
