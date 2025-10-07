"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

export default function AttributesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Attributes</h1>
        <p className="text-muted-foreground">Define product attributes and variations</p>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No attributes configured</p>
        </CardContent>
      </Card>
    </div>
  )
}
