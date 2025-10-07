"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CustomerNavbar } from "@/components/customer-navbar"
import { Footer } from "@/components/footer"

export default function OrderSuccessPage() {
  useEffect(() => {
    // Trigger confetti or celebration animation
    const timer = setTimeout(() => {
      // Animation complete
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const orderNumber = `ORD-${Date.now().toString().slice(-8)}`

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerNavbar />

      <div className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-accent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-4 mb-8"
          >
            <h1 className="text-4xl font-bold">Order Placed Successfully!</h1>
            <p className="text-lg text-muted-foreground">Thank you for your purchase. Your order has been confirmed.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <Package className="h-8 w-8 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Order Number</p>
                    <p className="text-lg font-bold">{orderNumber}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">What happens next?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>You will receive an order confirmation email shortly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>We will send you shipping updates as your order is processed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Expected delivery: 3-5 business days</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link href="/shop" className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      Continue Shopping
                    </Button>
                  </Link>
                  <Link href="/" className="flex-1">
                    <Button className="w-full gap-2">
                      Go to Home <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
