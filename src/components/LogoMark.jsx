import { useId } from 'react'

// Brand mark for Memorifund Ai Platform.
//
// The old mark was a plain letter "M" in a rounded square. This is an "M"
// drawn from the platform's own visual language — trading candlesticks and a
// price line — so the logo, the hero artwork and the section visuals all speak
// the same language.
//
// Three variants are provided so the mark can be compared in context; the site
// uses `candles`. See logo-concepts.html in the project root for a side-by-side
// preview at 16-72px. That file is dev-only — it lives outside public/ so the
// build never copies it into dist/.
//
// Rendered as inline SVG (not an <img>) so it inherits crisp scaling at every
// size and needs no extra request. The gradient gets a per-instance id from
// useId, because the mark appears in both the header and the footer of every
// page and duplicate SVG ids would cross-wire the fills.

const INK = '#241503' // dark glyph that sits on the gold tile

const Gold = ({ id }) => (
  <defs>
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#F0D080" />
      <stop offset="0.55" stopColor="#D9B45A" />
      <stop offset="1" stopColor="#B8913F" />
    </linearGradient>
  </defs>
)

// A — "Candles M": the M's two legs are candlesticks (body + wick) and the
// middle stroke is a price line dropping into the valley and back out.
function Candles({ gid }) {
  return (
    <>
      <Gold id={gid} />
      <rect width="48" height="48" rx="14" fill={`url(#${gid})`} />
      <g fill={INK}>
        <rect x="13.5" y="11" width="2" height="27" rx="1" />
        <rect x="10.5" y="16" width="8" height="17" rx="2.6" />
        <rect x="32.5" y="11" width="2" height="27" rx="1" />
        <rect x="29.5" y="16" width="8" height="17" rx="2.6" />
      </g>
      <path
        d="M14.5 17.5 24 29 33.5 17.5"
        fill="none"
        stroke={INK}
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  )
}

// B — "Monogram M": one uniform stroke, wider counters, no ornament. The
// quietest of the three, closest to a classic fintech monogram.
function Monogram({ gid }) {
  return (
    <>
      <Gold id={gid} />
      <rect width="48" height="48" rx="14" fill={`url(#${gid})`} />
      <path
        d="M12 36 12 14 24 27 36 14 36 36"
        fill="none"
        stroke={INK}
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  )
}

// C — "Trace M": gold price-line M on a dark tile, so the mark reads as a
// market trace rather than a letter. Highest contrast of the three.
function Trace({ gid }) {
  return (
    <>
      <Gold id={gid} />
      <rect width="48" height="48" rx="14" fill="#100E0A" />
      <rect x="0.8" y="0.8" width="46.4" height="46.4" rx="13.2" fill="none" stroke="#D9B45A" strokeOpacity="0.3" strokeWidth="1.6" />
      <path
        d="M11.5 35 11.5 15 23.5 27 35.5 15 35.5 35"
        fill="none"
        stroke={`url(#${gid})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  )
}

const variants = { candles: Candles, monogram: Monogram, trace: Trace }

export default function LogoMark({ size = 40, variant = 'candles', className = 'logo-mark' }) {
  const gid = `lm-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const Shape = variants[variant] || Candles
  return (
    <span className={className}>
      <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" focusable="false">
        <Shape gid={gid} />
      </svg>
    </span>
  )
}
