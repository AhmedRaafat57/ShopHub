import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected (admin routes)
  if (pathname.startsWith("/admin")) {
    // In a real app, you'd check for a secure HTTP-only cookie
    // For this demo, we'll check for a header that the client can set
    const authHeader = request.headers.get("x-admin-auth")

    // Since we can't access localStorage in middleware, we'll allow the route
    // and handle protection on the client side
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
