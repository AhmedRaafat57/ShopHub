"use client"

import type React from "react"

import { useState } from "react"
import { CustomerNavbar } from "@/components/customer-navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, CheckCircle, MapPin } from "lucide-react"

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [tracking, setTracking] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTracking(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerNavbar />

      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Track Your Order</h1>
          <p className="text-muted-foreground mb-8">Enter your order number and email to track your shipment.</p>

          <Card>
            <CardHeader>
              <CardTitle>Order Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">Order Number</Label>
                  <Input
                    id="orderNumber"
                    placeholder="e.g., ORD-123456"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Track Order
                </Button>
              </form>

              {tracking && (
                <div className="mt-8 space-y-6">
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Order Status</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start">
                        <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                        <div>
                          <p className="font-medium">Order Confirmed</p>
                          <p className="text-sm text-muted-foreground">Jan 15, 2025 - 10:30 AM</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <Package className="h-6 w-6 text-accent flex-shrink-0" />
                        <div>
                          <p className="font-medium">Order Packed</p>
                          <p className="text-sm text-muted-foreground">Jan 16, 2025 - 2:15 PM</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <Truck className="h-6 w-6 text-accent flex-shrink-0" />
                        <div>
                          <p className="font-medium">Out for Delivery</p>
                          <p className="text-sm text-muted-foreground">Jan 18, 2025 - 8:00 AM</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start opacity-50">
                        <MapPin className="h-6 w-6 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Delivered</p>
                          <p className="text-sm text-muted-foreground">Estimated: Jan 18, 2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
