"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Package,
  Plus,
  Tag,
  ShoppingCart,
  Users,
  Gift,
  FileText,
  Grid3x3,
  Menu,
  X,
  ChevronDown,
  Layers,
  FolderOpen,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "New Product",
    href: "/admin/products/new",
    icon: Plus,
  },
  {
    title: "New Coupon",
    href: "/admin/coupons/new",
    icon: Tag,
  },
  {
    title: "Catalog",
    href: "/admin/catalog",
    icon: Grid3x3,
    children: [
      { title: "Products", href: "/admin/products", icon: Package },
      { title: "Categories", href: "/admin/categories", icon: FolderOpen },
      { title: "Collections", href: "/admin/collections", icon: Layers },
      { title: "Attributes", href: "/admin/attributes", icon: Sparkles },
    ],
  },
  {
    title: "Sale",
    href: "/admin/sale",
    icon: ShoppingCart,
    children: [{ title: "Orders", href: "/admin/orders", icon: ShoppingCart }],
  },
  {
    title: "Customer",
    href: "/admin/customer",
    icon: Users,
    children: [{ title: "Customers", href: "/admin/customers", icon: Users }],
  },
  {
    title: "Promotion",
    href: "/admin/promotion",
    icon: Gift,
    children: [{ title: "Coupons", href: "/admin/coupons", icon: Tag }],
  },
  {
    title: "CMS",
    href: "/admin/cms",
    icon: FileText,
    children: [
      { title: "Pages", href: "/admin/pages", icon: FileText },
      { title: "Widgets", href: "/admin/widgets", icon: Grid3x3 },
    ],
  },
]

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    )
  }

  const isActive = (href: string) => pathname === href
  const isParentActive = (item: NavItem) =>
    item.children ? item.children.some((child) => pathname === child.href) : false

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground lg:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar (Animated) */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-border bg-card p-4 lg:hidden"
      >
        <SidebarContent
          expandedItems={expandedItems}
          toggleExpanded={toggleExpanded}
          isActive={isActive}
          isParentActive={isParentActive}
          setIsOpen={setIsOpen}
        />
      </motion.aside>

      {/* Desktop Sidebar (Always Visible) */}
      <aside className="hidden lg:flex lg:flex-col h-screen w-64 border-r border-border bg-card">
        <SidebarContent
          expandedItems={expandedItems}
          toggleExpanded={toggleExpanded}
          isActive={isActive}
          isParentActive={isParentActive}
          setIsOpen={setIsOpen}
        />
      </aside>
    </>
  )
}

/* ---------------- Sidebar Content ---------------- */
function SidebarContent({
  expandedItems,
  toggleExpanded,
  isActive,
  isParentActive,
  setIsOpen,
}: {
  expandedItems: string[]
  toggleExpanded: (title: string) => void
  isActive: (href: string) => boolean
  isParentActive: (item: NavItem) => boolean
  setIsOpen: (v: boolean) => void
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <Package className="h-5 w-5 text-accent-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">Admin Panel</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto mt-4 space-y-1">
        {navItems.map((item) => (
          <div key={item.title}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleExpanded(item.title)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isParentActive(item)
                      ? "bg-accent/10 text-accent"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      expandedItems.includes(item.title) && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {expandedItems.includes(item.title) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 mt-1 space-y-1 border-l border-border pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                              isActive(child.href)
                                ? "bg-accent text-accent-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            <child.icon className="h-4 w-4" />
                            <span>{child.title}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}

