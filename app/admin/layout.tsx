import type React from "react"
import { AuthGuard } from "@/components/auth-guard"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminNavbar } from "@/components/admin-navbar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-background">
        <AdminSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminNavbar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  )
}
