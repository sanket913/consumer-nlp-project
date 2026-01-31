"use client"

import React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { History, CreditCard, Banknote, Home, Building2, FileWarning, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface HistoryItem {
  id: string
  text: string
  category: string
  timestamp: number
}

interface HistoryListProps {
  items: HistoryItem[]
  onSelect: (item: HistoryItem) => void
  onClear: () => void
}

const categoryIcons: Record<string, React.ElementType> = {
  credit_card: CreditCard,
  debt_collection: Banknote,
  mortgages_and_loans: Home,
  retail_banking: Building2,
  credit_reporting: FileWarning
}

const categoryColors: Record<string, string> = {
  credit_card: "text-blue-400 bg-blue-500/10",
  debt_collection: "text-amber-400 bg-amber-500/10",
  mortgages_and_loans: "text-emerald-400 bg-emerald-500/10",
  retail_banking: "text-cyan-400 bg-cyan-500/10",
  credit_reporting: "text-rose-400 bg-rose-500/10"
}

export default function HistoryList({ items, onSelect, onClear }: HistoryListProps) {
  if (items.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-1 shadow-xl backdrop-blur-xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-50" />
        
        <div className="relative rounded-xl bg-card/80 p-6">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <History className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Recent Analyses
              </span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                {items.length}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="mr-1 h-3 w-3" />
              Clear
            </Button>
          </div>

          {/* History items */}
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => {
                const Icon = categoryIcons[item.category] || FileWarning
                const colorClass = categoryColors[item.category] || "text-primary bg-primary/10"
                
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => onSelect(item)}
                    className="group flex w-full items-center gap-3 rounded-xl border border-transparent bg-secondary/30 p-3 text-left transition-all hover:border-primary/30 hover:bg-secondary/50"
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-foreground">
                        {item.text}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.timestamp).toLocaleDateString()} • {item.category.replace(/_/g, " ")}
                      </p>
                    </div>
                    <div className="opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="text-xs text-primary">Load →</span>
                    </div>
                  </motion.button>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
