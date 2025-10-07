export const ADMIN_CREDENTIALS = {
  email: "ahmed@gmail.com",
  password: "123456",
}

export function validateCredentials(email: string, password: string): boolean {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
}

export function setAuthSession(email: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("adminAuth", JSON.stringify({ email, timestamp: Date.now() }))
  }
}

export function getAuthSession(): { email: string; timestamp: number } | null {
  if (typeof window !== "undefined") {
    const session = localStorage.getItem("adminAuth")
    return session ? JSON.parse(session) : null
  }
  return null
}

export function clearAuthSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminAuth")
  }
}

export function isAuthenticated(): boolean {
  return getAuthSession() !== null
}
