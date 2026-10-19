import { experience } from '../data/content.js'
import { CandleChart, AreaChart } from './ChartVisuals.jsx'
import chartAnalysisShot from '../assets/shots/chart-analysis.webp'
import paperTradingShot from '../assets/shots/paper-trading.webp'
import strategyBuilderShot from '../assets/shots/strategy-builder.webp'

// Per-row visual. Rows carrying a `shot` render the supplied artwork; the rest
// fall back to the inline SVG chart card.
//
// The shots go in bare, with no "Memorifund Ai Platform" header and no Live
// badge around them. They are supplied artwork, not screenshots of this
// platform, and wrapping another product's interface in this site's chrome
// would present it as the product.
const visualMeta = [
  {
    shot: {
      src: chartAnalysisShot,
      w: 1100,
      h: 829,
      alt: 'A Bitcoin candlestick chart with a price axis, beside a panel listing recent trades',
    },
  },
  {
    shot: {
      src: paperTradingShot,
      w: 1100,
      h: 733,
      alt: 'A practice trading screen showing a virtual balance, an order ticket and a list of assets',
    },
  },
  {
    shot: {
      src: strategyBuilderShot,
      w: 1100,
      h: 733,
      alt: 'A strategy builder screen with a market analysis menu, a price chart, a performance panel and a list of trading signals',
    },
  },
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
                {meta.shot ? (
                  <figure className="exp-shot">
                    <img
                      src={meta.shot.src}
                      alt={meta.shot.alt}
                      width={meta.shot.w}
                      height={meta.shot.h}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                ) : (
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
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
