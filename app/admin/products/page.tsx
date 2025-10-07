"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getProducts, deleteProduct, type Product } from "@/lib/products"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function ProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    setProducts(getProducts())
  }, [])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    deleteProduct(id)
    setProducts(getProducts())
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border text-foreground"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Category</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Price</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Stock</th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 text-foreground">${product.price.toFixed(2)}</td>
                    <td className="py-4">
                      <span
                        className={`text-sm ${
                          product.stock > 50
                            ? "text-accent"
                            : product.stock > 10
                              ? "text-foreground"
                              : "text-destructive"
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(product.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filteredProducts.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No products found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This action cannot be undone. This will permanently delete the product from your catalog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border text-foreground hover:bg-muted">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
