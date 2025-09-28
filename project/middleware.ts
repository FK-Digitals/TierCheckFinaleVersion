// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const { pathname } = req.nextUrl

  // 1) Login-Route IMMER durchlassen (verhindert Loops)
  if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
    return res
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll().map(c => ({ name: c.name, value: c.value })),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => res.cookies.set(name, value, options))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // 2) Alles unter /admin schützen (außer /admin/login – oben schon ausgenommen)
  if (pathname.startsWith('/admin')) {
    if (!user) {
      const url = new URL('/admin/login', req.url)
      url.searchParams.set('redirectedFrom', pathname)
      return NextResponse.redirect(url)
    }
  }

  return res
}

export const config = {
  // Nur Admin-Bereich matchen, Login bleibt frei
  matcher: ['/admin/:path*'],
}
