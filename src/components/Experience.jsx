import { experience } from '../data/content.js'
import { CandleChart, AreaChart } from './ChartVisuals.jsx'

// Per-row visual captions (replaces the old stock webp images with original
// inline SVG trading charts).
const visualMeta = [
  { kind: 'candles', label: 'BTC/USD', note: '+2.4% · 24h' },
  { kind: 'area', label: 'Paper balance', note: '$100,000 virtual' },
  { kind: 'candles', label: 'Custom strategy', note: '3 conditions active' },
  { kind: 'area', label: 'Risk limits', note: 'Stop set at −3.5%' },
]

export default function Experience() {
  const { titleA, titleMark, lead, rows } = experience

  return (
    <section className="section exp-sec" id="experience">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="h2">{titleA}<mark>{titleMark}</mark></h2>
          {(Array.isArray(lead) ? lead : [lead]).map((p, i) => (
            <p className="lead" key={i}>{p}</p>
          ))}
        </div>

        {rows.map((row, i) => {
          const meta = visualMeta[i] || visualMeta[0]
          return (
            <div className={`exp-row reveal ${i % 2 ? 'reverse' : ''}`} key={row.title}>
              <div className="exp-copy">
                <h3 className="h3">{row.title}</h3>
                <p>{row.text}</p>
                {row.list && (
                  <ul className="exp-list">
                    {row.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="exp-visual">
                <div className="visual-card">
                  <div className="visual-card-head">
                    <span className="visual-brand"><span className="visual-brand-dot"></span> Memorifund Ai Platform</span>
                    <span className="visual-live"><span className="dot"></span> Live</span>
                  </div>
                  <div className="visual-card-body">
                    <div className="visual-meta">
                      <span>{meta.label}</span>
                      <span className="visual-note">{meta.note}</span>
                    </div>
                    {meta.kind === 'candles' ? <CandleChart height={190} /> : <AreaChart height={190} />}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
