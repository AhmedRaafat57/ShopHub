"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Package, ShoppingCart, Users, CheckCircle, Info, Trash2, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type NotificationType = "order" | "product" | "customer" | "system"
type NotificationStatus = "unread" | "read"

interface Notification {
  id: number
  type: NotificationType
  title: string
  message: string
  time: string
  status: NotificationStatus
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "Order #1234 has been placed by John Doe for $129.99",
    time: "2 minutes ago",
    status: "unread",
  },
  {
    id: 2,
    type: "product",
    title: "Low Stock Alert",
    message: "Wireless Headphones stock is running low (5 units remaining)",
    time: "1 hour ago",
    status: "unread",
  },
  {
    id: 3,
    type: "customer",
    title: "New Customer Registration",
    message: "Jane Smith has created a new account",
    time: "3 hours ago",
    status: "unread",
  },
  {
    id: 4,
    type: "order",
    title: "Order Shipped",
    message: "Order #1230 has been shipped and is on its way",
    time: "5 hours ago",
    status: "read",
  },
  {
    id: 5,
    type: "system",
    title: "System Update",
    message: "A new system update is available. Please review the changes.",
    time: "1 day ago",
    status: "read",
  },
  {
    id: 6,
    type: "product",
    title: "Product Review",
    message: "Smart Watch received a 5-star review from Alice Brown",
    time: "1 day ago",
    status: "read",
  },
  {
    id: 7,
    type: "order",
    title: "Order Cancelled",
    message: "Order #1228 has been cancelled by the customer",
    time: "2 days ago",
    status: "read",
  },
  {
    id: 8,
    type: "customer",
    title: "Customer Support Request",
    message: "Bob Johnson has submitted a support ticket regarding shipping",
    time: "2 days ago",
    status: "read",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [filter, setFilter] = useState<"all" | NotificationType>("all")

  const unreadCount = notifications.filter((n) => n.status === "unread").length

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "order":
        return ShoppingCart
      case "product":
        return Package
      case "customer":
        return Users
      case "system":
        return Info
    }
  }

  const getIconColor = (type: NotificationType) => {
    switch (type) {
      case "order":
        return "text-blue-500"
      case "product":
        return "text-purple-500"
      case "customer":
        return "text-green-500"
      case "system":
        return "text-orange-500"
    }
  }

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, status: "read" as NotificationStatus } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, status: "read" as NotificationStatus })))
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const filteredNotifications = filter === "all" ? notifications : notifications.filter((n) => n.type === filter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Bell className="h-8 w-8" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-sm">
                {unreadCount} new
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground mt-1">Stay updated with your store activities</p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Filters */}
      <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="order">Orders</TabsTrigger>
          <TabsTrigger value="product">Products</TabsTrigger>
          <TabsTrigger value="customer">Customers</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          {filteredNotifications.length === 0 ? (
            <Card className="border-border bg-card">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-foreground">No notifications</p>
                <p className="text-sm text-muted-foreground">You're all caught up!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification, index) => {
                const Icon = getIcon(notification.type)
                const iconColor = getIconColor(notification.type)

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`border-border transition-all hover:shadow-md ${
                        notification.status === "unread" ? "bg-accent/5 border-l-4 border-l-accent" : "bg-card"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg bg-muted ${iconColor}`}>
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-semibold text-foreground">{notification.title}</h3>
                              {notification.status === "unread" && (
                                <Badge variant="secondary" className="text-xs">
                                  New
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            {notification.status === "unread" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => markAsRead(notification.id)}
                                title="Mark as read"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteNotification(notification.id)}
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
