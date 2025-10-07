"use client"

import { motion } from "framer-motion"
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown, ArrowRight, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"




const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-500",
  },
  {
    title: "Orders",
    value: "2,350",
    change: "+15.3%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-blue-500",
  },
  {
    title: "Products",
    value: "1,234",
    change: "+5.2%",
    trend: "up",
    icon: Package,
    color: "text-purple-500",
  },
  {
    title: "Customers",
    value: "8,492",
    change: "-2.4%",
    trend: "down",
    icon: Users,
    color: "text-orange-500",
  },
]

const recentOrders = [
  { id: 1001, customer: "John Doe", items: 2, total: 129.99, status: "Pending" },
  { id: 1002, customer: "Jane Smith", items: 1, total: 89.99, status: "Shipped" },
  { id: 1003, customer: "Bob Johnson", items: 3, total: 249.99, status: "Delivered" },
  { id: 1004, customer: "Alice Brown", items: 1, total: 59.99, status: "Pending" },
  { id: 1005, customer: "Charlie Wilson", items: 4, total: 399.99, status: "Processing" },
]

const topProducts = [
  { name: "Wireless Headphones", sold: 120, revenue: 11999.99, image: "/black-wireless-headphones.png" },
  { name: "Smart Watch", sold: 95, revenue: 18999.99, image: "/smart-watch-black.jpg" },
  { name: "Laptop Stand", sold: 80, revenue: 3199.99, image: "/aluminum-laptop-stand.jpg" },
  { name: "Bluetooth Speaker", sold: 75, revenue: 5999.99, image: "/portable-bluetooth-speaker.jpg" },
  { name: "Wireless Mouse", sold: 65, revenue: 2599.99, image: "/wireless-mouse-ergonomic.jpg" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <Link href="/">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            View Store
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="flex items-center gap-1 text-sm">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-foreground text-xl">Recent Orders</CardTitle>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.items} {order.items === 1 ? "item" : "items"} • ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <Badge
                    variant={
                      order.status === "Delivered" ? "default" : order.status === "Shipped" ? "secondary" : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-foreground text-xl">Top Products</CardTitle>
            <Link href="/admin/products">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sold} sold</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">${product.revenue.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground text-xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/products/new">
              <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                <Package className="h-6 w-6" />
                <span>Add Product</span>
              </Button>
            </Link>
            <Link href="/admin/orders">
              <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                <ShoppingCart className="h-6 w-6" />
                <span>View Orders</span>
              </Button>
            </Link>
            <Link href="/admin/customers">
              <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                <Users className="h-6 w-6" />
                <span>Manage Customers</span>
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                <DollarSign className="h-6 w-6" />
                <span>View Products</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
