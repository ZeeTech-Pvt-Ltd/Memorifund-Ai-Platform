// =========================================================
// Original trading chart visuals, pure inline SVG.
// Candlesticks, area/line charts, and sparklines — all
// hand-built with the brand palette, no third-party assets.
// Gradient ids are made unique per instance via useId so
// multiple charts on one page never collide.
// =========================================================
import { useId } from 'react'

const UP = 'var(--green-light)'
const DOWN = '#E07A80'
const GOLD = 'var(--primary-light)'

// Deterministic candlestick set {up, bodyTop, bodyH, wickTop, wickH} (percent).
const CANDLES = [
  { up: true, bT: 46, bH: 17, wT: 40, wH: 30 },
  { up: false, bT: 40, bH: 14, wT: 34, wH: 26 },
  { up: true, bT: 42, bH: 16, wT: 36, wH: 28 },
  { up: true, bT: 36, bH: 15, wT: 30, wH: 27 },
  { up: false, bT: 33, bH: 12, wT: 28, wH: 22 },
  { up: true, bT: 30, bH: 15, wT: 24, wH: 27 },
  { up: false, bT: 26, bH: 11, wT: 20, wH: 23 },
  { up: true, bT: 22, bH: 14, wT: 16, wH: 26 },
  { up: true, bT: 18, bH: 15, wT: 12, wH: 27 },
  { up: false, bT: 15, bH: 10, wT: 10, wH: 20 },
  { up: true, bT: 11, bH: 14, wT: 6, wH: 24 },
  { up: true, bT: 6, bH: 15, wT: 2, wH: 24 },
]

/** Candlestick chart — grid + wicks/bodies, optional overlaid trend line. */
export function CandleChart({ height = 170, trend = true, gold = false }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const w = 400
  const pad = 8
  const step = (w - pad * 2) / CANDLES.length
  const bodyW = Math.max(4, step * 0.52)
  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" aria-hidden="true" style={{ width: '100%', height }}>
      <defs>
        <linearGradient id={`cvGold-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--primary-light)" stopOpacity="0" />
          <stop offset="0.5" stopColor="var(--primary-light)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--primary-light)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* horizontal grid */}
      {[20, 40, 60, 80].map((p) => (
        <line key={p} x1={pad} x2={w - pad} y1={(height * p) / 100} y2={(height * p) / 100} stroke="var(--line)" strokeWidth="1" />
      ))}
      {CANDLES.map((c, i) => {
        const cx = pad + step * i + step / 2
        const col = gold ? GOLD : (c.up ? UP : DOWN)
        return (
          <g key={i} opacity={gold ? 0.4 + (i % 4) * 0.16 : 1}>
            <line x1={cx} x2={cx} y1={(height * c.wT) / 100} y2={(height * (c.wT + c.wH)) / 100} stroke={col} strokeWidth="1.4" />
            <rect
              x={cx - bodyW / 2}
              y={(height * c.bT) / 100}
              width={bodyW}
              height={(height * c.bH) / 100}
              rx={bodyW / 2.6}
              fill={col}
            />
          </g>
        )
      })}
      {trend && (
        <path
          d="M8 138 C 60 132, 110 116, 150 118 S 230 92, 270 82 S 340 60, 392 40"
          fill="none"
          stroke={`url(#cvGold-${uid})`}
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
      {trend && <circle cx="392" cy="40" r="3.5" fill={GOLD} />}
    </svg>
  )
}

/** Area/line chart with a gradient fill, used for portfolio/value visuals. */
export function AreaChart({ height = 150 }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const w = 400
  const line = 'M0 132 C40 126 76 110 118 112 C160 114 196 88 240 82 C282 76 314 92 352 70 C376 56 392 40 400 30'
  const area = `${line} L400 ${height} L0 ${height} Z`
  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" aria-hidden="true" style={{ width: '100%', height }}>
      <defs>
        <linearGradient id={`avFill-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--primary-light)" stopOpacity="0.34" />
          <stop offset="1" stopColor="var(--primary-light)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[25, 50, 75, 100].map((p) => (
        <line key={p} x1="0" x2={w} y1={(height * p) / 100} y2={(height * p) / 100} stroke="var(--line)" strokeWidth="1" />
      ))}
      <path d={area} fill={`url(#avFill-${uid})`} />
      <path d={line} fill="none" stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="400" cy="30" r="3.5" fill={GOLD} />
    </svg>
  )
}

/** Tiny inline sparkline for stat chips / KPI rows. */
export function Sparkline({ width = 96, height = 30, up = true }) {
  const col = up ? UP : DOWN
  const d = up
    ? 'M2 24 C14 22 24 16 36 18 S 56 26 68 14 S 84 6 94 4'
    : 'M2 8 C14 10 24 16 36 13 S 56 4 68 15 S 84 22 94 25'
  return (
    <svg viewBox="0 0 96 30" width={width} height={height} fill="none" aria-hidden="true">
      <path d={d} stroke={col} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="94" cy={up ? 4 : 25} r="2.5" fill={col} />
    </svg>
  )
}

/** Full trading-dashboard panel: balance + area chart + stat row + candles. */
export function DashboardPanel({ label = 'Portfolio Value', balance = '$248,521.90', change = '+18.4%' }) {
  return (
    <div className="dash-panel">
      <div className="dash-head">
        <span className="dash-brand">
          <span className="dash-brand-dot"></span> Memorifund Ai Platform
        </span>
        <span className="dash-live"><span className="dot"></span> Live</span>
      </div>
      <div className="dash-body">
        <div className="dash-bal-row">
          <div>
            <div className="dash-label">{label}</div>
            <div className="dash-bal">{balance}</div>
          </div>
          <span className="dash-pct">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 10V2.5M2.5 6 6 2.5 9.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {change}
          </span>
        </div>
        <AreaChart height={150} />
        <div className="dash-stats">
          <span>AI Signal <b>BUY</b></span>
          <span>Win rate <b>92.4%</b></span>
          <span>Pairs <b>65+</b></span>
          <span>Markets <b>24/7</b></span>
        </div>
        <div className="dash-candles">
          <CandleChart height={92} trend={false} />
        </div>
      </div>
    </div>
  )
}
