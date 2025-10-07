"use client"

import { motion } from "framer-motion"
import { FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const pages = [
  { id: "1", title: "About Us", slug: "/about", status: "published", updated: "2025-01-05" },
  { id: "2", title: "Contact", slug: "/contact", status: "published", updated: "2025-01-04" },
  { id: "3", title: "Privacy Policy", slug: "/privacy", status: "draft", updated: "2025-01-03" },
  { id: "4", title: "Terms of Service", slug: "/terms", status: "published", updated: "2025-01-02" },
]

export default function PagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Pages</h1>
        <p className="text-muted-foreground">Manage your website content pages</p>
      </div>

      <div className="grid gap-4">
        {pages.map((page, index) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border bg-card hover:border-accent transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-accent/10 p-3">
                      <FileText className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{page.title}</h3>
                      <p className="text-sm text-muted-foreground">{page.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Last updated</p>
                      <p className="text-sm font-medium text-foreground">{page.updated}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        page.status === "published" ? "bg-accent/10 text-accent" : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {page.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
