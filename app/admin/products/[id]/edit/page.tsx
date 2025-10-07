"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ProductForm } from "@/components/product-form"
import { getProduct, updateProduct, type Product } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const id = params.id as string
    const foundProduct = getProduct(id)
    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      toast({
        title: "Error",
        description: "Product not found",
        variant: "destructive",
      })
      router.push("/admin/products")
    }
  }, [params.id, router, toast])

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      updateProduct(params.id as string, data)
      toast({
        title: "Success",
        description: "Product updated successfully",
      })
      router.push("/admin/products")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!product) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Edit Product</h1>
        <p className="text-muted-foreground">Update product information</p>
      </div>

      <ProductForm product={product} onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}
