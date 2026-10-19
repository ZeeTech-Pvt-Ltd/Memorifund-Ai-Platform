'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

// GA4 page_view on client-side route changes.
//
// pushState alone is invisible to Analytics, so without this every route past
// the landing page would go untracked. The initial view is skipped: the
// gtag('config') call in the root layout already sent it, and counting it twice
// would inflate homepage sessions.
//
// The title is read inside a frame callback because the App Router commits the
// new route's metadata around the same time this effect runs.
export default function Analytics() {
  const pathname = usePathname()
  const firstView = useRef(true)

  useEffect(() => {
    if (firstView.current) {
      firstView.current = false
      return
    }

    const id = requestAnimationFrame(() => {
      window.gtag?.('event', 'page_view', {
        page_path: window.location.pathname + window.location.search,
        page_location: window.location.href,
        page_title: document.title,
      })
    })

    return () => cancelAnimationFrame(id)
  }, [pathname])

  return null
}
