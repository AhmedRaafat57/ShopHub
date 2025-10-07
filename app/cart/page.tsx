"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CustomerNavbar } from "@/components/customer-navbar"
import { Footer } from "@/components/footer"
import { getCart, updateCartItemQuantity, removeFromCart, getCartTotal, type CartItem } from "@/lib/cart"
import { cn } from "@/lib/utils"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCart()
    setIsLoading(false)

    // Listen for cart updates
    const handleCartUpdate = () => loadCart()
    window.addEventListener("cartUpdated", handleCartUpdate)
    return () => window.removeEventListener("cartUpdated", handleCartUpdate)
  }, [])

  const loadCart = () => {
    setCartItems(getCart())
  }

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    updateCartItemQuantity(itemId, newQuantity)
    loadCart()
  }

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId)
    loadCart()
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <CustomerNavbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading cart...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <CustomerNavbar />
        <div className="flex-1 flex items-center justify-center py-16">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="pt-6 text-center space-y-4">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
              <h2 className="text-2xl font-bold">Your cart is empty</h2>
              <p className="text-muted-foreground">Add some products to your cart to get started</p>
              <Link href="/shop">
                <Button className="gap-2">
                  Continue Shopping <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerNavbar />

      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <Link href={`/products/${item.productId}`} className="flex-shrink-0">
                          <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <Link href={`/products/${item.productId}`}>
                            <h3 className="font-semibold hover:text-accent transition-colors line-clamp-1">
                              {item.name}
                            </h3>
                          </Link>
                          <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                            {item.color && (
                              <span className="flex items-center gap-1">
                                Color:
                                <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: item.color }} />
                              </span>
                            )}
                            {item.size && <span>Size: {item.size}</span>}
                          </div>
                          <p className="text-lg font-bold mt-2">${item.price.toFixed(2)}</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="flex items-center gap-2 border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold">Order Summary</h2>

                <div className="space-y-2 text-sm">
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
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="block">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/shop">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
