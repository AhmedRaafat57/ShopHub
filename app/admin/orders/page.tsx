"use client"

import { motion } from "framer-motion"
import { Package, Clock, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    total: 299.99,
    status: "pending",
    items: 3,
    date: "2025-01-05",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    total: 149.99,
    status: "completed",
    items: 2,
    date: "2025-01-04",
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    email: "bob@example.com",
    total: 499.99,
    status: "processing",
    items: 5,
    date: "2025-01-03",
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    email: "alice@example.com",
    total: 89.99,
    status: "cancelled",
    items: 1,
    date: "2025-01-02",
  },
]

const statusConfig = {
  pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  processing: { icon: Package, color: "text-blue-500", bg: "bg-blue-500/10" },
  completed: { icon: CheckCircle, color: "text-accent", bg: "bg-accent/10" },
  cancelled: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Orders</h1>
        <p className="text-muted-foreground">Manage and track customer orders</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {Object.entries(statusConfig).map(([status, config], index) => {
          const count = orders.filter((o) => o.status === status).length
          return (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground capitalize">{status}</p>
                      <p className="text-2xl font-bold text-foreground">{count}</p>
                    </div>
                    <div className={`rounded-full p-3 ${config.bg}`}>
                      <config.icon className={`h-5 w-5 ${config.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Order ID</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Customer</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Items</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Total</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  const config = statusConfig[order.status as keyof typeof statusConfig]
                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border last:border-0"
                    >
                      <td className="py-4 font-mono text-sm text-foreground">{order.id}</td>
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-foreground">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.email}</p>
                        </div>
                      </td>
                      <td className="py-4 text-foreground">{order.items} items</td>
                      <td className="py-4 font-medium text-foreground">${order.total.toFixed(2)}</td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${config.bg} ${config.color}`}
                        >
                          <config.icon className="h-3 w-3" />
                          <span className="capitalize">{order.status}</span>
                        </span>
                      </td>
                      <td className="py-4 text-sm text-muted-foreground">{order.date}</td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
