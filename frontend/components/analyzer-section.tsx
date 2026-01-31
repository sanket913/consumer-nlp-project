"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import ComplaintInput from "./complaint-input"
import ResultCard from "./result-card"
import HistoryList, { type HistoryItem } from "./history-list"
import { useToast } from "@/hooks/use-toast"

const HISTORY_KEY = "complaint-analyzer-history"
const MAX_HISTORY = 5

export default function AnalyzerSection() {
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const { toast } = useToast()

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY)
      if (stored) {
        setHistory(JSON.parse(stored))
      }
    } catch (error) {
      console.error("Failed to load history:", error)
    }
  }, [])

  // Save history to localStorage
  const saveHistory = useCallback((newHistory: HistoryItem[]) => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory))
      setHistory(newHistory)
    } catch (error) {
      console.error("Failed to save history:", error)
    }
  }, [])

  const handleSubmit = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)
    setResult(null)

    try {
  const response = await axios.post(
    "https://consumer-nlp-project.onrender.com/predict",
    { text: inputText.trim() },
    { timeout: 10000 }
  )

  const category = response.data.category
  setResult(category)

  const newItem: HistoryItem = {
    id: Date.now().toString(),
    text: inputText.trim().slice(0, 100) + (inputText.length > 100 ? "..." : ""),
    category,
    timestamp: Date.now()
  }

  const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY)
  saveHistory(updatedHistory)

  toast({
    title: "Analysis Complete ✅",
    description: `Category: ${category.replace(/_/g, " ")}`,
  })

} catch (error: any) {
  console.error("API Error:", error)

  toast({
    title: "Backend Not Reachable ❌",
    description: "Make sure FastAPI server is running on port 8000",
    variant: "destructive"
  })
}
 finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setInputText("")
    setResult(null)
  }

  const handleHistorySelect = (item: HistoryItem) => {
    // Find the full text from existing complaints or use truncated version
    setInputText(item.text.replace(/\.\.\.$/,""))
    setResult(item.category)
  }

  const handleClearHistory = () => {
    saveHistory([])
    toast({
      title: "History Cleared",
      description: "Your analysis history has been cleared."
    })
  }

  return (
    <section id="analyzer" className="relative py-20">
      <div className="mx-auto max-w-3xl px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Analyze Your Complaint
          </h2>
          <p className="text-muted-foreground">
            Enter your consumer complaint below and let our AI classify it instantly
          </p>
        </motion.div>

        {/* Input section */}
        <ComplaintInput
          value={inputText}
          onChange={setInputText}
          onSubmit={handleSubmit}
          onClear={handleClear}
          isLoading={isLoading}
        />

        {/* Result section */}
        {result && (
          <div className="mt-6">
            <ResultCard category={result} />
          </div>
        )}

        {/* History section */}
        <div className="mt-6">
          <HistoryList
            items={history}
            onSelect={handleHistorySelect}
            onClear={handleClearHistory}
          />
        </div>
      </div>

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl" />
      </div>
    </section>
  )
}
