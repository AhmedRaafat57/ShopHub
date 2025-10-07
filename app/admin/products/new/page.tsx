"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProductForm } from "@/components/product-form"
import { createProduct } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"

export default function NewProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      createProduct(data)
      toast({
        title: "Success",
        description: "Product created successfully",
      })
      router.push("/admin/products")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">New Product</h1>
        <p className="text-muted-foreground">Add a new product to your catalog</p>
      </div>

      <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}
