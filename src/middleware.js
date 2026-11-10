import { NextResponse } from 'next/server'

// The review page used to live at /memorifund-ai-platform-review-australia-scam
// before Australia came out of the copy. Old links and anything already indexed
// still need to land on the page.
const MOVED = {
  '/How-It-Works': '/how-it-works',
  '/memorifund-ai-platform-review-australia-scam': '/memorifund-ai-platform-review',
}

// These cannot be redirects in next.config: Next matches redirect `source`
// paths case-insensitively, so a rule for /How-It-Works also matches
// /how-it-works and sends the canonical page to itself in a loop. The
// comparison below is exact.
export function middleware(request) {
  const target = MOVED[request.nextUrl.pathname]
  if (target) return NextResponse.redirect(new URL(target, request.url), 308)
  return NextResponse.next()
}

export const config = {
  matcher: ['/How-It-Works', '/memorifund-ai-platform-review-australia-scam'],
}
