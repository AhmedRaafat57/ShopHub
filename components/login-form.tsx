"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, Lock, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { validateCredentials, setAuthSession } from "@/lib/auth"
import { loginSchema } from "@/lib/validation"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [loginError, setLoginError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setLoginError("")
    setIsLoading(true)

    try {
      // Validate form with Yup
      await loginSchema.validate({ email, password }, { abortEarly: false })

      // Simulate network delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Check credentials
      if (validateCredentials(email, password)) {
        setAuthSession(email)
        router.push("/admin/dashboard")
      } else {
        setLoginError("Invalid email or password")
        setShake(true)
        setTimeout(() => setShake(false), 500)
      }
    } catch (err: any) {
      if (err.name === "ValidationError") {
        const validationErrors: { email?: string; password?: string } = {}
        err.inner.forEach((error: any) => {
          validationErrors[error.path as keyof typeof validationErrors] = error.message
        })
        setErrors(validationErrors)
      }
      setShake(true)
      setTimeout(() => setShake(false), 500)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <motion.form
        onSubmit={handleSubmit}
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        {loginError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{loginError}</span>
          </motion.div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="ahmed@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground ${
                errors.email ? "border-destructive" : ""
              }`}
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              {errors.email}
            </motion.p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground ${
                errors.password ? "border-destructive" : ""
              }`}
              disabled={isLoading}
            />
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive"
            >
              {errors.password}
            </motion.p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </motion.form>
    </motion.div>
  )
}
