"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Save, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NewCouponPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">New Coupon</h1>
        <p className="text-muted-foreground">Create a new promotional coupon</p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Coupon Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code" className="text-foreground">
              Coupon Code
            </Label>
            <Input id="code" placeholder="SUMMER25" className="bg-background border-border text-foreground font-mono" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="discount" className="text-foreground">
                Discount Value
              </Label>
              <Input
                id="discount"
                type="number"
                placeholder="25"
                className="bg-background border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-foreground">
                Discount Type
              </Label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="maxUses" className="text-foreground">
                Max Uses
              </Label>
              <Input
                id="maxUses"
                type="number"
                placeholder="100"
                className="bg-background border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expires" className="text-foreground">
                Expiration Date
              </Label>
              <Input id="expires" type="date" className="bg-background border-border text-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Save className="mr-2 h-4 w-4" />
          Create Coupon
        </Button>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="border-border text-foreground hover:bg-muted"
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>
    </div>
  )
}
