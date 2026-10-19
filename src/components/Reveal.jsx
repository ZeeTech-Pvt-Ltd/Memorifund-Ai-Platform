'use client'

import { usePathname } from 'next/navigation'
import useReveal from '../hooks/useReveal.js'

// The scroll-reveal observer used to be re-run from App.jsx on every route
// change. Mounting it once in the root layout keeps that behaviour from a
// single place: the hook takes the pathname as its dependency, and its own
// MutationObserver picks up content that mounts later.
export default function Reveal() {
  useReveal(usePathname())
  return null
}
