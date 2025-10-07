"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Bell, Moon, Sun, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { clearAuthSession, getAuthSession } from "@/lib/auth"
import { useTheme } from "next-themes"
import { useEffect } from "react"
import Link from "next/link"

export function AdminNavbar() {
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const session = getAuthSession()
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    clearAuthSession()
    router.push("/login")
  }

  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center gap-4 px-6">
        {/* Search Bar */}
        <div className="flex flex-1 items-center gap-4">
          <div className="relative w-full max-w-md ml-10">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products, orders, customers..."
              className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              {currentTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}

          {/* Notifications */}
          <Link href="/admin/notifications">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
            </Button>
          </Link>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted"
            >
              <Avatar className="h-8 w-8 border border-border">
                <AvatarFallback className="bg-accent text-accent-foreground text-sm font-medium">
                  {session?.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium text-foreground">Admin</p>
                <p className="text-xs text-muted-foreground">{session?.email}</p>
              </div>
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-border bg-card shadow-lg"
                  >
                    <div className="p-2">
                      <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
