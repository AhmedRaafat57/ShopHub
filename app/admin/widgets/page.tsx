"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Grid3x3 } from "lucide-react"

export default function WidgetsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Widgets</h1>
        <p className="text-muted-foreground">Manage website widgets and components</p>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Grid3x3 className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No widgets available</p>
        </CardContent>
      </Card>
    </div>
  )
}
