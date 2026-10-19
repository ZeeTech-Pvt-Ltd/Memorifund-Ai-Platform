'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import Logo from './Logo.jsx'
import useScrollSpy from '../hooks/useScrollSpy.js'
import { nav } from '../data/content.js'

// The route keys the active-link check below was written against; the App
// Router gives us a pathname, so map it back to the same keys.
const ROUTE_BY_PATH = {
  '/': 'home',
  '/about': 'about',
  '/contact': 'contact',
  '/terms': 'terms',
  '/privacy': 'privacy',
  '/disclosure': 'disclosure',
  '/thank-you': 'thank-you',
  '/how-it-works': 'how-it-works',
  '/memorifund-ai-platform-review-australia-scam': 'memorifund-ai-platform-review-australia-scam',
  '/faq': 'faq',
}

export default function Header() {
  const pathname = usePathname()
  const route = ROUTE_BY_PATH[pathname] || '404'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const ids = useMemo(() => ['top', 'experience', 'priorities', 'faq', 'portfolio'], [])
  const active = useScrollSpy(ids)

  // Route links (/about, /contact…) are active on their own page; home
  // sections (Home -> top, FAQ -> #faq, …) are active via scroll-spy on the
  // home page. Links that scroll use the data-scroll target for the check.
  const isActive = (item) => {
    if (item.scroll) return route === 'home' && active === item.scroll.slice(1)
    if (item.href === '/') return route === 'home' && active === 'top'
    if (item.href.startsWith('/')) return route === item.href.slice(1)
    return route === 'home' && active === item.href.slice(1)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  // The header lives in the root layout now, so it no longer remounts between
  // routes. Without this the menu would stay open after navigating.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
      <div className="container header-inner">
        <Logo />

        <nav className="nav" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-scroll={item.scroll || undefined}
              className={isActive(item) ? 'active' : ''}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="btn btn-primary btn-signup" href="/" data-scroll="#register">Sign Up</a>
          <button
            className={`burger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <nav className={`mobile-menu container ${menuOpen ? 'open' : ''}`} aria-label="Mobile">
        {nav.map((item) => (
          <a key={item.href} href={item.href} data-scroll={item.scroll || undefined} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
        <a href="/" data-scroll="#register" onClick={() => setMenuOpen(false)}>Sign Up</a>
      </nav>
    </header>
  )
}
