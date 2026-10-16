import { useCallback, useEffect, useRef, useState } from 'react'
import { testimonials } from '../data/content.js'

// Auto-advancing review carousel.
//
// The track is a real horizontal scroller rather than a transform-driven
// carousel, so a trackpad swipe, a touch drag and the arrow keys all work on it
// natively. The arrows and the timer just call scrollTo on top of that.
//
// Three things stop the advance. Pointer enter, because a slider that keeps
// moving while someone is reading is worse than no slider. Focus, so it never
// slides out from under a keyboard user who has tabbed into the arrows. And
// prefers-reduced-motion, in which case it never starts at all.
//
// The reveal class sits on the wrapper, not on the cards. Cards are laid out
// horizontally, so the ones past the right edge never intersect the viewport
// and would sit at opacity 0 until scrolled to.

const Chevron = ({ back = false }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={back ? { transform: 'rotate(180deg)' } : undefined}
  >
    <path d="M9 5l7 7-7 7" />
  </svg>
)

export default function Testimonials() {
  const trackRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  // Subscribe rather than reading the setting once, so switching it on mid
  // visit stops the carousel instead of leaving it running until a reload.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const go = useCallback((dir) => {
    const track = trackRef.current
    const card = track?.firstElementChild
    if (!track || !card) return
    // Measured rather than assumed: the card width is a percentage, so it
    // changes with the breakpoint.
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const step = card.getBoundingClientRect().width + gap
    const max = track.scrollWidth - track.clientWidth
    if (max < 2) return
    // Wrap rather than dead end, so neither arrow ever becomes a no-op.
    // Tested against the current position rather than the target: with three
    // cards showing two at a time, max scroll is exactly one step, and
    // comparing the target would wrap before that position was ever shown.
    const atEnd = track.scrollLeft >= max - 2
    const atStart = track.scrollLeft <= 2
    const to = dir > 0
      ? (atEnd ? 0 : Math.min(track.scrollLeft + step, max))
      : (atStart ? max : Math.max(track.scrollLeft - step, 0))
    track.scrollTo({ left: to, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (paused || reduceMotion) return
    const id = setInterval(() => go(1), 4500)
    return () => clearInterval(id)
  }, [paused, reduceMotion, go])

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head reveal">
          <h2 className="h2">{testimonials.title}<mark>{testimonials.titleMark}</mark></h2>
          <p className="lead">{testimonials.lead}</p>
        </div>

        <div
          className="tst-slider reveal"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            className="tst-track"
            ref={trackRef}
            tabIndex={0}
            role="group"
            aria-label="Reviews from our community"
          >
            {testimonials.items.map((t) => (
              <article className="tst-card" key={t.name}>
                <div className="tst-stars" role="img" aria-label="Rated 5 out of 5">★★★★★</div>
                <blockquote>"{t.quote}"</blockquote>
                <div className="tst-person">
                  <span className="tst-avatar">{t.initials}</span>
                  <div>
                    <b>{t.name}</b>
                    <span className="verified">✓ {t.verified}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* pointer-events:none on the wrapper so the overlay never eats a
              trackpad swipe or a click on the cards underneath. */}
          <div className="tst-navs">
            <button type="button" className="tst-nav" onClick={() => go(-1)} aria-label="Previous review">
              <Chevron back />
            </button>
            <button type="button" className="tst-nav" onClick={() => go(1)} aria-label="Next review">
              <Chevron />
            </button>
          </div>
        </div>

        <div className="tst-summary reveal">
          {testimonials.summary.map((s) => (
            <div className="row" key={s.big}>
              <div className="big">{s.big}</div>
              <div>
                <div className="tst-stars" role="img" aria-label="Rated 5 out of 5">{s.stars}</div>
                <div className="muted" style={{ fontSize: 13.5 }}>{s.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
