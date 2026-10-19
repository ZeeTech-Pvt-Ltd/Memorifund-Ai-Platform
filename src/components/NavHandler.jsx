'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

// Ports the SPA link handler from the old App.jsx.
//
// Internal links stay plain <a> tags, so every existing href and data-scroll
// attribute in the components keeps working untouched. This one delegated
// listener decides what a click means:
//
//   - href="#" is a placeholder; swallowed with no URL change
//   - data-scroll wins over href: the URL stays hash free, and from a route
//     page it goes home first, then scrolls once the home content has mounted
//   - #hash anchors behave the same way
//   - external, protocol relative, mailto and tel are left to the browser
//   - internal paths go through the App Router
export default function NavHandler() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href]')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href) return

      // Placeholder links, keep the URL clean, do nothing.
      if (href === '#') {
        e.preventDefault()
        return
      }

      const scrollTo = a.getAttribute('data-scroll')
      if (scrollTo) {
        e.preventDefault()
        const doScroll = () => {
          if (scrollTo === '#top') window.scrollTo(0, 0)
          else document.querySelector(scrollTo)?.scrollIntoView()
        }
        // Those sections only exist on the home page.
        if (pathname === '/') doScroll()
        else {
          router.push('/')
          setTimeout(doScroll, 100)
        }
        return
      }

      if (href.startsWith('#')) {
        e.preventDefault()
        const doScroll = () => {
          if (href === '#top') window.scrollTo(0, 0)
          else document.querySelector(href)?.scrollIntoView()
        }
        if (pathname === '/') doScroll()
        else {
          router.push('/')
          setTimeout(doScroll, 100)
        }
        return
      }

      if (/^(https?:)?\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) return

      if (href.startsWith('/')) {
        e.preventDefault()
        // Same page: just go back to the top, no navigation.
        if (href.split(/[?#]/)[0] === pathname) {
          window.scrollTo(0, 0)
          return
        }
        router.push(href)
        window.scrollTo(0, 0)
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [pathname, router])

  return null
}
