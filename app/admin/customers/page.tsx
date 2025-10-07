"use client"

import { motion } from "framer-motion"
import { Users, UserPlus, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    orders: 12,
    spent: 1299.99,
    joined: "2024-06-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    orders: 8,
    spent: 899.99,
    joined: "2024-07-20",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    orders: 15,
    spent: 2499.99,
    joined: "2024-05-10",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    orders: 5,
    spent: 449.99,
    joined: "2024-08-05",
  },
]

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Customers</h1>
        <p className="text-muted-foreground">Manage your customer relationships</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                  <p className="text-2xl font-bold text-foreground">{customers.length}</p>
                </div>
                <div className="rounded-full bg-accent/10 p-3">
                  <Users className="h-5 w-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">New This Month</p>
                  <p className="text-2xl font-bold text-foreground">24</p>
                </div>
                <div className="rounded-full bg-blue-500/10 p-3">
                  <UserPlus className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email Subscribers</p>
                  <p className="text-2xl font-bold text-foreground">156</p>
                </div>
                <div className="rounded-full bg-purple-500/10 p-3">
                  <Mail className="h-5 w-5 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customers.map((customer, index) => (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border border-border">
                    <AvatarFallback className="bg-accent text-accent-foreground font-medium">
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                </div>
                <div className="flex gap-8 text-right">
                  <div>
                    <p className="text-sm text-muted-foreground">Orders</p>
                    <p className="font-medium text-foreground">{customer.orders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="font-medium text-foreground">${customer.spent.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p className="font-medium text-foreground">{customer.joined}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
