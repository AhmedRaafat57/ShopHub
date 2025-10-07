"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/lib/products"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)

  const images = product.images || [product.image || "/diverse-products-still-life.png"]
  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  const badgeConfig = {
    new: { label: "New", className: "bg-blue-500 text-white" },
    sale: { label: "Sale", className: "bg-red-500 text-white" },
    "best-seller": { label: "Best Seller", className: "bg-accent text-accent-foreground" },
    limited: { label: "Limited", className: "bg-orange-500 text-white" },
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    // Add to cart logic here
    console.log("Added to cart:", product.name)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
    console.log("Wishlist toggled:", product.name)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowQuickView(true)
    console.log("Quick view:", product.name)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link href={`/products/${product.id}`} className="block h-full">
        <Card className="group relative h-full flex flex-col overflow-hidden border-border bg-card hover:shadow-lg transition-shadow">
          {/* Image Section */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Badges */}
            {product.badges && product.badges.length > 0 && (
              <div className="absolute left-3 top-3 flex flex-col gap-2">
                {product.badges.map((badge) => (
                  <Badge key={badge} className={cn("shadow-md", badgeConfig[badge].className)}>
                    {badgeConfig[badge].label}
                  </Badge>
                ))}
              </div>
            )}

            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <Badge className="absolute right-3 top-3 bg-destructive text-white shadow-md">
                -{discountPercentage}%
              </Badge>
            )}

            {/* Image Indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentImageIndex(index)
                    }}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      index === currentImageIndex ? "w-6 bg-accent" : "w-1.5 bg-muted-foreground/30",
                    )}
                  />
                ))}
              </div>
            )}

            {/* Quick Actions */}
            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                size="icon"
                variant="outline"
                className="bg-card/95 backdrop-blur-sm hover:bg-accent"
                onClick={handleWishlist}
              >
                <Heart className={cn("h-4 w-4", isWishlisted && "fill-red-500 text-red-500")} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="bg-card/95 backdrop-blur-sm hover:bg-accent"
                onClick={handleQuickView}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content Section */}
          <CardContent className="flex-1 flex flex-col space-y-3 p-4">
            {/* Category */}
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{product.category}</p>

            {/* Product Name */}
            <h3 className="font-semibold text-foreground line-clamp-2 leading-tight text-balance">{product.name}</h3>

            {/* Rating & Reviews */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5",
                        i < Math.floor(product.rating!)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted-foreground/30",
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {product.rating} ({product.reviews})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Variants */}
            {product.variants && (
              <div className="space-y-2">
                {product.variants.colors && product.variants.colors.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Colors:</span>
                    <div className="flex gap-1.5">
                      {product.variants.colors.slice(0, 4).map((color, index) => (
                        <button
                          key={index}
                          onClick={(e) => e.preventDefault()}
                          className="h-5 w-5 rounded-full border-2 border-border transition-transform hover:scale-110"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                      {product.variants.colors.length > 4 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] text-muted-foreground">
                          +{product.variants.colors.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                {product.variants.sizes && product.variants.sizes.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Sizes:</span>
                    <div className="flex gap-1.5">
                      {product.variants.sizes.slice(0, 4).map((size, index) => (
                        <span
                          key={index}
                          className="flex h-6 min-w-6 items-center justify-center rounded border border-border bg-muted px-1.5 text-xs font-medium text-foreground"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full mt-auto bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>

            {/* Stock Status */}
            {product.stock < 10 && <p className="text-xs text-destructive">Only {product.stock} left in stock!</p>}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
