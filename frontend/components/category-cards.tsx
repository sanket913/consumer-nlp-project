"use client"

import { motion } from "framer-motion"
import { CreditCard, Banknote, Home, Building2, FileWarning } from "lucide-react"

const categories = [
  {
    id: "credit_card",
    icon: CreditCard,
    label: "Credit Card",
    color: "from-blue-500 to-blue-600",
    description: "Billing disputes, unauthorized charges, APR issues"
  },
  {
    id: "debt_collection",
    icon: Banknote,
    label: "Debt Collection",
    color: "from-amber-500 to-amber-600",
    description: "Harassment, wrong debt amounts, validation"
  },
  {
    id: "mortgages_and_loans",
    icon: Home,
    label: "Mortgages & Loans",
    color: "from-emerald-500 to-emerald-600",
    description: "Loan modifications, foreclosure, payment issues"
  },
  {
    id: "retail_banking",
    icon: Building2,
    label: "Retail Banking",
    color: "from-cyan-500 to-cyan-600",
    description: "Account problems, fees, transaction errors"
  },
  {
    id: "credit_reporting",
    icon: FileWarning,
    label: "Credit Reporting",
    color: "from-rose-500 to-rose-600",
    description: "Incorrect information, disputes, identity theft"
  }
]

export default function CategoryCards() {
  return (
    <section id="categories" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Supported Categories
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our AI model is trained to classify consumer complaints into these five major categories with high accuracy
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 backdrop-blur-sm transition-all hover:shadow-xl dark:bg-card/80"
              >
                {/* Hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity group-hover:opacity-10`} />
                
                <div className="relative">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    {category.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
