"use client"

import { motion } from "framer-motion"
import { Tag, Plus, Percent } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const coupons = [
  {
    id: "1",
    code: "SUMMER25",
    discount: 25,
    type: "percentage",
    uses: 45,
    maxUses: 100,
    expires: "2025-08-31",
    active: true,
  },
  {
    id: "2",
    code: "WELCOME10",
    discount: 10,
    type: "percentage",
    uses: 120,
    maxUses: 200,
    expires: "2025-12-31",
    active: true,
  },
  {
    id: "3",
    code: "FLASH50",
    discount: 50,
    type: "fixed",
    uses: 89,
    maxUses: 100,
    expires: "2025-02-28",
    active: false,
  },
]

export default function CouponsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Coupons</h1>
          <p className="text-muted-foreground">Manage promotional codes and discounts</p>
        </div>
        <Link href="/admin/coupons/new">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="mr-2 h-4 w-4" />
            New Coupon
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Coupons</p>
                  <p className="text-2xl font-bold text-foreground">{coupons.filter((c) => c.active).length}</p>
                </div>
                <div className="rounded-full bg-accent/10 p-3">
                  <Tag className="h-5 w-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Uses</p>
                  <p className="text-2xl font-bold text-foreground">{coupons.reduce((sum, c) => sum + c.uses, 0)}</p>
                </div>
                <div className="rounded-full bg-blue-500/10 p-3">
                  <Percent className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Discount</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(coupons.reduce((sum, c) => sum + c.discount, 0) / coupons.length)}%
                  </p>
                </div>
                <div className="rounded-full bg-purple-500/10 p-3">
                  <Tag className="h-5 w-5 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">All Coupons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {coupons.map((coupon, index) => (
              <motion.div
                key={coupon.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <Tag className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-mono text-lg font-bold text-foreground">{coupon.code}</p>
                    <p className="text-sm text-muted-foreground">
                      {coupon.type === "percentage" ? `${coupon.discount}% off` : `$${coupon.discount} off`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Usage</p>
                    <p className="font-medium text-foreground">
                      {coupon.uses} / {coupon.maxUses}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Expires</p>
                    <p className="font-medium text-foreground">{coupon.expires}</p>
                  </div>
                  <div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        coupon.active ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {coupon.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
