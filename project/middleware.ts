// project/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Login-Seite IMMER durchlassen
  if (pathname.startsWith('/admin/login')) return NextResponse.next()

  // Nur /admin schützen
  if (!pathname.startsWith('/admin')) return NextResponse.next()

  const hasSb =
    req.cookies.get('sb-access-token') ||
    req.cookies.get('sb:token') ||
    req.cookies.get('supabase-auth-token')

  if (!hasSb) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
