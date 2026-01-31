"use client"

import { motion } from "framer-motion"
import { Loader2, Sparkles, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ComplaintInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onClear: () => void
  isLoading: boolean
  maxChars?: number
}

const placeholderText = `Example: I have been trying to resolve a billing dispute with my credit card company for over three months now. They charged me twice for the same transaction and despite multiple calls and emails, they refuse to refund the duplicate charge. I have provided all the documentation they requested but keep getting transferred to different departments...`

export default function ComplaintInput({
  value,
  onChange,
  onSubmit,
  onClear,
  isLoading,
  maxChars = 2000,
}: ComplaintInputProps) {
  const charCount = value.length
  const charPercentage = (charCount / maxChars) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-1 shadow-2xl backdrop-blur-xl">
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 opacity-50" />
        
        <div className="relative rounded-xl bg-background/80 p-6 dark:bg-card/90">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Enter Your Complaint
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className={`h-full rounded-full ${
                    charPercentage > 90
                      ? "bg-destructive"
                      : charPercentage > 70
                      ? "bg-yellow-500"
                      : "bg-primary"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(charPercentage, 100)}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span
                className={`text-xs font-medium ${
                  charPercentage > 90
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                {charCount}/{maxChars}
              </span>
            </div>
          </div>

          {/* Textarea */}
          <div className="relative">
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value.slice(0, maxChars))}
              placeholder={placeholderText}
              className="min-h-[200px] resize-none border border-border/50 bg-background/60 text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-primary/50 dark:bg-secondary/40"
            />
            
            {/* Clear button */}
            {value && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={onClear}
                className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="h-3 w-3" />
              </motion.button>
            )}
          </div>

          {/* Submit button */}
          <div className="mt-4 flex justify-end">
            <Button
              onClick={onSubmit}
              disabled={!value.trim() || isLoading}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-accent px-8 py-3 text-primary-foreground shadow-lg transition-all hover:shadow-primary/25"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 transition-opacity group-hover:opacity-100"
                initial={false}
              />
              <span className="relative flex items-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Analyze Complaint
                  </>
                )}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
