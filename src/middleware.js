import { NextResponse } from 'next/server'

// The page used to live at /How-It-Works. Redirect it to the canonical
// lowercase path so old links and any indexed URL keep working.
//
// This cannot be a redirect in next.config: Next matches redirect `source`
// paths case-insensitively, so a rule for /How-It-Works also matches
// /how-it-works and sends the canonical page to itself in a loop. The
// comparison below is exact.
export function middleware(request) {
  if (request.nextUrl.pathname === '/How-It-Works') {
    return NextResponse.redirect(new URL('/how-it-works', request.url), 308)
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/How-It-Works',
}
