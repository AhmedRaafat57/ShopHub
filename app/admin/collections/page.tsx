"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Layers } from "lucide-react"

export default function CollectionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Collections</h1>
        <p className="text-muted-foreground">Group products into curated collections</p>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Layers className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No collections yet</p>
        </CardContent>
      </Card>
    </div>
  )
}
