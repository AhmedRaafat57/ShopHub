"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star, Minus, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CustomerNavbar } from "@/components/customer-navbar"
import { Footer } from "@/components/footer"
import { ProductReviews } from "@/components/product-reviews"
import { getProduct, type Product } from "@/lib/products"
import { addToCart } from "@/lib/cart"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function ProductDetailPage() {
  const params = useParams()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    const productData = getProduct(params.id as string)
    if (productData) {
      setProduct(productData)
      if (productData.variants?.colors?.[0]) {
        setSelectedColor(productData.variants.colors[0])
      }
      if (productData.variants?.sizes?.[0]) {
        setSelectedSize(productData.variants.sizes[0])
      }
    }
  }, [params.id])

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    )
  }

  const images = product.images || [product.image || "/placeholder.svg?key=dd1n8"]
  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  const badgeConfig = {
    new: { label: "New", className: "bg-blue-500 text-white" },
    sale: { label: "Sale", className: "bg-red-500 text-white" },
    "best-seller": { label: "Best Seller", className: "bg-accent text-accent-foreground" },
    limited: { label: "Limited", className: "bg-orange-500 text-white" },
  }

  const handleAddToCart = () => {
    if (!product) return

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images?.[0] || product.image || "/placeholder.svg",
      color: selectedColor || undefined,
      size: selectedSize || undefined,
      stock: product.stock,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CustomerNavbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
            >
              <img
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {product.badges && product.badges.length > 0 && (
                <div className="absolute left-4 top-4 flex flex-col gap-2">
                  {product.badges.map((badge) => (
                    <Badge key={badge} className={cn("shadow-md", badgeConfig[badge].className)}>
                      {badgeConfig[badge].label}
                    </Badge>
                  ))}
                </div>
              )}
              {discountPercentage > 0 && (
                <Badge className="absolute right-4 top-4 bg-destructive text-white shadow-md">
                  -{discountPercentage}%
                </Badge>
              )}
            </motion.div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
                      selectedImage === index ? "border-accent" : "border-border hover:border-muted-foreground",
                    )}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{product.category}</p>
              <h1 className="mt-2 text-3xl font-bold text-foreground text-balance">{product.name}</h1>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < Math.floor(product.rating!)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted-foreground/30",
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-foreground">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-xl text-muted-foreground line-through">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Variants */}
            {product.variants && (
              <div className="space-y-4">
                {product.variants.colors && product.variants.colors.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Color</label>
                    <div className="flex gap-2">
                      {product.variants.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(color)}
                          className={cn(
                            "relative h-10 w-10 rounded-full border-2 transition-all",
                            selectedColor === color ? "border-accent scale-110" : "border-border hover:scale-105",
                          )}
                          style={{ backgroundColor: color }}
                        >
                          {selectedColor === color && (
                            <Check className="absolute inset-0 m-auto h-5 w-5 text-white drop-shadow-md" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.variants.sizes && product.variants.sizes.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Size</label>
                    <div className="flex gap-2">
                      {product.variants.sizes.map((size, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            "flex h-10 min-w-10 items-center justify-center rounded-md border-2 px-4 text-sm font-medium transition-all",
                            selectedSize === size
                              ? "border-accent bg-accent text-accent-foreground"
                              : "border-border bg-background text-foreground hover:border-muted-foreground",
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-lg font-medium text-foreground">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stock Status */}
            <Card className="border-border bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Availability:</span>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      product.stock > 50 ? "text-accent" : product.stock > 10 ? "text-foreground" : "text-destructive",
                    )}
                  >
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon-lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="border-border"
              >
                <Heart className={cn("h-5 w-5", isWishlisted && "fill-red-500 text-red-500")} />
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={product.id} productName={product.name} />
      </div>

      <Footer />
    </div>
  )
}
