"use client"

import { LoginForm } from "@/components/login-form"
import { ShieldCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
            <ShieldCheck className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Portal</h1>
          <p className="text-sm text-muted-foreground">Sign in to access the admin dashboard</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-lg">
          <LoginForm />
        </div>

        <p className="text-center text-xs text-muted-foreground">Protected by enterprise-grade security</p>
      </div>
    </div>
  )
}
