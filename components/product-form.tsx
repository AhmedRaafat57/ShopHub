"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Save, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { productSchema } from "@/lib/validation"
import type { Product } from "@/lib/products"

interface ProductFormProps {
  product?: Product
  onSubmit: (data: any) => void
  isLoading?: boolean
}

export function ProductForm({ product, onSubmit, isLoading }: ProductFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price?.toString() || "",
    description: product?.description || "",
    category: product?.category || "",
    stock: product?.stock?.toString() || "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    try {
      const validatedData = await productSchema.validate(
        {
          name: formData.name,
          price: Number.parseFloat(formData.price),
          description: formData.description,
          category: formData.category,
          stock: Number.parseInt(formData.stock),
        },
        { abortEarly: false },
      )

      onSubmit(validatedData)
    } catch (err: any) {
      if (err.name === "ValidationError") {
        const validationErrors: Record<string, string> = {}
        err.inner.forEach((error: any) => {
          validationErrors[error.path] = error.message
        })
        setErrors(validationErrors)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Product Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Product Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className={`bg-background border-border text-foreground ${errors.name ? "border-destructive" : ""}`}
              disabled={isLoading}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive"
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-foreground">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className={`bg-background border-border text-foreground ${errors.price ? "border-destructive" : ""}`}
                disabled={isLoading}
              />
              {errors.price && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive"
                >
                  {errors.price}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" className="text-foreground">
                Stock
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                className={`bg-background border-border text-foreground ${errors.stock ? "border-destructive" : ""}`}
                disabled={isLoading}
              />
              {errors.stock && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive"
                >
                  {errors.stock}
                </motion.p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-foreground">
              Category
            </Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
              className={`bg-background border-border text-foreground ${errors.category ? "border-destructive" : ""}`}
              disabled={isLoading}
            />
            {errors.category && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive"
              >
                {errors.category}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={4}
              className={`bg-background border-border text-foreground ${errors.description ? "border-destructive" : ""}`}
              disabled={isLoading}
            />
            {errors.description && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive"
              >
                {errors.description}
              </motion.p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {product ? "Update Product" : "Create Product"}
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
          className="border-border text-foreground hover:bg-muted"
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>
    </form>
  )
}
