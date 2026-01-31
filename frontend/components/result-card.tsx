"use client"

import React from "react"

import { motion } from "framer-motion"
import { 
  CreditCard, 
  Banknote, 
  Home, 
  Building2, 
  FileWarning,
  CheckCircle2,
  TrendingUp
} from "lucide-react"

interface ResultCardProps {
  category: string
  confidence?: number
}

const categoryConfig: Record<string, {
  icon: React.ElementType
  label: string
  color: string
  bgColor: string
  description: string
}> = {
  credit_card: {
    icon: CreditCard,
    label: "Credit Card",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/30",
    description: "Issues related to credit card services, billing, or transactions"
  },
  debt_collection: {
    icon: Banknote,
    label: "Debt Collection",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10 border-amber-500/30",
    description: "Complaints about debt collection practices or communications"
  },
  mortgages_and_loans: {
    icon: Home,
    label: "Mortgages & Loans",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/30",
    description: "Issues with mortgage services, home loans, or lending"
  },
  retail_banking: {
    icon: Building2,
    label: "Retail Banking",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10 border-cyan-500/30",
    description: "General banking services, accounts, and transactions"
  },
  credit_reporting: {
    icon: FileWarning,
    label: "Credit Reporting",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10 border-rose-500/30",
    description: "Issues with credit reports, scores, or reporting agencies"
  }
}

export default function ResultCard({ category, confidence = 87 }: ResultCardProps) {
  const config = categoryConfig[category] || {
    icon: FileWarning,
    label: category.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    color: "text-primary",
    bgColor: "bg-primary/10 border-primary/30",
    description: "Complaint category detected by AI"
  }

  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-1 shadow-2xl backdrop-blur-xl">
        {/* Success gradient border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-primary/20 to-emerald-500/20 opacity-60" />
        
        <div className="relative rounded-xl bg-card/80 p-6">
          {/* Success header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <span className="text-sm font-medium text-emerald-400">
              Analysis Complete
            </span>
          </motion.div>

          {/* Category result */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className={`mb-6 flex items-center gap-4 rounded-xl border p-4 ${config.bgColor}`}
          >
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-card/50 ${config.color}`}>
              <Icon className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Predicted Category
              </p>
              <h3 className={`text-xl font-bold ${config.color}`}>
                {config.label}
              </h3>
            </div>
          </motion.div>

          {/* Confidence indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Confidence Score
                </span>
              </div>
              <span className="text-lg font-bold text-primary">{confidence}%</span>
            </div>
            
            <div className="h-3 overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </div>

            <p className="text-sm text-muted-foreground">
              {config.description}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
