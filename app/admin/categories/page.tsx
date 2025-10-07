"use client"

import { motion } from "framer-motion"
import { FolderOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { id: "1", name: "Electronics", products: 45, color: "bg-blue-500" },
  { id: "2", name: "Accessories", products: 32, color: "bg-purple-500" },
  { id: "3", name: "Clothing", products: 28, color: "bg-pink-500" },
  { id: "4", name: "Home & Garden", products: 19, color: "bg-green-500" },
]

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Categories</h1>
        <p className="text-muted-foreground">Organize your products into categories</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border bg-card hover:border-accent transition-colors cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className={`rounded-full ${category.color}/10 p-4 mb-3`}>
                    <FolderOpen className={`h-8 w-8 ${category.color.replace("bg-", "text-")}`} />
                  </div>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.products} products</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
