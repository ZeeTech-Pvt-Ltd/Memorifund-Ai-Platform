import { useCallback, useEffect, useRef, useState } from 'react'
import { testimonials } from '../data/content.js'

// Auto-advancing review carousel, scrolling right without end.
//
// The list is rendered three times over. The visible window starts inside the
// middle pass, so there is a full pass of room in both directions. Whenever
// scrollLeft leaves that middle band, it is shifted by exactly one pass with no
// animation - which puts the identical card back under the viewport. The eye
// sees continuous rightward motion and never a snap back to the start.
//
// The track is a real horizontal scroller rather than a transform-driven
// carousel, so a trackpad swipe, a touch drag and the arrow keys all work on it
// natively. The arrows and the timer just call scrollTo on top of that.
//
// Three things stop the advance: pointer enter, because a slider that keeps
// moving while someone is reading is worse than no slider; focus, so it never
// slides out from under a keyboard user; and prefers-reduced-motion, in which
// case it never starts at all.
//
// The reveal class sits on the wrapper, not on the cards. Cards are laid out
// horizontally, so the ones past the edge never intersect the viewport and
// would sit at opacity 0 until scrolled to.

const PASSES = 3
const ITEM_COUNT = testimonials.items.length

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

  // Measured rather than assumed: the card width is a percentage, so it changes
  // with the breakpoint. `pass` is the width of one full copy of the list.
  const measure = useCallback(() => {
    const track = trackRef.current
    const card = track?.firstElementChild
    if (!track || !card) return { step: 0, pass: 0 }
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const step = card.getBoundingClientRect().width + gap
    return { step, pass: step * ITEM_COUNT }
  }, [])

  // Start inside the middle pass. useLayoutEffect timing would be nicer, but
  // the track is empty until the mark is laid out, so this runs after paint and
  // the jump is off screen.
  useEffect(() => {
    const track = trackRef.current
    const { pass } = measure()
    if (track && pass > 0) track.scrollLeft = pass
  }, [measure])

  const go = useCallback(
    (dir) => {
      const track = trackRef.current
      const { step } = measure()
      if (!track || !step) return
      track.scrollTo({ left: track.scrollLeft + dir * step, behavior: 'smooth' })
    },
    [measure],
  )

  // Re-centre once the scrolling has stopped, never mid animation, or the
  // correction would fight the smooth scroll for the same scrollLeft.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let timer
    const settle = () => {
      const { pass } = measure()
      if (!pass) return
      if (track.scrollLeft >= 2 * pass) track.scrollLeft -= pass
      else if (track.scrollLeft < pass) track.scrollLeft += pass
    }
    const onScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(settle, 140)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      track.removeEventListener('scroll', onScroll)
    }
  }, [measure])

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
            {/* Flat, not wrapped in per-pass containers: the cards have to be
                direct flex children of the track or their percentage basis
                would resolve against a pass instead of the track. Passes after
                the first are marked aria-hidden, since they repeat the same
                reviews and a screen reader should hear them once. */}
            {Array.from({ length: PASSES }, (_, p) =>
              testimonials.items.map((t) => (
                <article className="tst-card" key={`${p}-${t.name}`} aria-hidden={p > 0 ? 'true' : undefined}>
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
              )),
            )}
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
