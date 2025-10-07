"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CreditCard, Wallet, Building2, Check, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CustomerNavbar } from "@/components/customer-navbar"
import { Footer } from "@/components/footer"
import { getCart, getCartTotal, clearCart, type CartItem } from "@/lib/cart"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

type PaymentMethod = "credit-card" | "paypal" | "bank-transfer"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    // Shipping Info
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    // Payment Info
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  useEffect(() => {
    const cart = getCart()
    if (cart.length === 0) {
      router.push("/cart")
    }
    setCartItems(cart)
  }, [router])

  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and show success
    clearCart()

    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    })

    setIsProcessing(false)
    router.push("/order-success")
  }

  const paymentMethods = [
    {
      id: "credit-card" as PaymentMethod,
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Pay securely with your card",
    },
    {
      id: "paypal" as PaymentMethod,
      name: "PayPal",
      icon: Wallet,
      description: "Fast and secure PayPal checkout",
    },
    {
      id: "bank-transfer" as PaymentMethod,
      name: "Bank Transfer",
      icon: Building2,
      description: "Direct bank transfer",
    },
  ]

  if (cartItems.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerNavbar />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province *</Label>
                        <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <span className="text-sm text-muted-foreground">We accept:</span>
                      <div className="flex items-center gap-2">
                        <img src="/payment-logos.png" alt="Visa, Mastercard, PayPal" className="h-12 object-contain" />
                      </div>
                    </div>

                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                    >
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center space-x-3">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label
                            htmlFor={method.id}
                            className="flex items-center gap-3 cursor-pointer flex-1 p-3 rounded-lg border border-transparent hover:border-border transition-colors"
                          >
                            <method.icon className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="font-medium">{method.name}</p>
                              <p className="text-sm text-muted-foreground">{method.description}</p>
                            </div>
                            {paymentMethod === method.id && <Check className="h-5 w-5 text-accent" />}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    {/* Credit Card Form */}
                    {paymentMethod === "credit-card" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 pt-4 border-t"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required={paymentMethod === "credit-card"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Cardholder Name *</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            placeholder="John Doe"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required={paymentMethod === "credit-card"}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              placeholder="MM/YY"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              required={paymentMethod === "credit-card"}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              required={paymentMethod === "credit-card"}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod === "paypal" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="pt-4 border-t"
                      >
                        <p className="text-sm text-muted-foreground">
                          You will be redirected to PayPal to complete your purchase securely.
                        </p>
                      </motion.div>
                    )}

                    {paymentMethod === "bank-transfer" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="pt-4 border-t space-y-2"
                      >
                        <p className="text-sm text-muted-foreground">
                          Bank transfer details will be provided after placing your order.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Your order will be processed once payment is received.
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Cart Items */}
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className={cn("font-medium", shipping === 0 && "text-accent")}>
                          {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (10%)</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                      {isProcessing ? (
                        "Processing..."
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Place Order ${total.toFixed(2)}
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Your payment information is secure and encrypted
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
