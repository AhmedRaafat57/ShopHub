"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { SlidersHorizontal, Grid3x3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"
import { CustomerNavbar } from "@/components/customer-navbar"
import { getProducts, type Product } from "@/lib/products"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const allProducts = getProducts()
    setProducts(allProducts)
    setFilteredProducts(allProducts)
  }, [])

  useEffect(() => {
    let filtered = [...products]

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        // Featured - keep original order
        break
    }

    setFilteredProducts(filtered)
  }, [products, selectedCategory, sortBy, searchQuery])

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CustomerNavbar />

      <div className="flex-1 container mx-auto px-4 py-8">
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Search results for "{searchQuery}"</h2>
            <p className="text-muted-foreground">
              Found {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>
        )}

        {/* Filters & Sort Bar */}
        <Card className="mb-6 border-border bg-card">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Left Side - Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-border"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort By */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Right Side - View Mode & Results */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon-sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon-sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== "all" || searchQuery) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 flex flex-wrap gap-2"
              >
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchQuery && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => (window.location.href = "/shop")}
                    className="h-7 border-border"
                  >
                    Search: {searchQuery} ×
                  </Button>
                )}
                {selectedCategory !== "all" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCategory("all")}
                    className="h-7 border-border"
                  >
                    {selectedCategory} ×
                  </Button>
                )}
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "flex flex-col gap-4"
            }
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="border-border bg-card">
            <CardContent className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-medium text-foreground">No products found</p>
                <p className="text-sm text-muted-foreground">
                  {searchQuery ? `No results for "${searchQuery}"` : "Try adjusting your filters"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  )
}
