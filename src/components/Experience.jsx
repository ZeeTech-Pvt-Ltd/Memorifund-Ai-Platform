import { experience } from '../data/content.js'
import chartAnalysisShot from '../assets/shots/chart-analysis.webp'
import paperTradingShot from '../assets/shots/paper-trading.webp'
import strategyBuilderShot from '../assets/shots/strategy-builder.webp'
import riskManagementShot from '../assets/shots/risk-management.webp'

// One shot per row, in the same order as experience.rows.
//
// The shots go in bare, with no "Memorifund Ai Platform" header and no Live
// badge around them. They are supplied artwork, not screenshots of this
// platform, and wrapping another product's interface in this site's chrome
// would present it as the product.
const shots = [
  {
    src: chartAnalysisShot,
    w: 1100,
    h: 829,
    alt: 'A Bitcoin candlestick chart with a price axis, beside a panel listing recent trades',
  },
  {
    src: paperTradingShot,
    w: 1100,
    h: 733,
    alt: 'A practice trading screen showing a virtual balance, an order ticket and a list of assets',
  },
  {
    src: strategyBuilderShot,
    w: 1100,
    h: 733,
    alt: 'A strategy builder screen with a market analysis menu, a price chart, a performance panel and a list of trading signals',
  },
  {
    src: riskManagementShot,
    w: 1100,
    h: 733,
    alt: 'A risk management panel showing position sizing, stop loss, take profit and a daily loss limit',
  },
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
          const shot = shots[i]
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
                {shot && (
                  <figure className="exp-shot">
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.w}
                      height={shot.h}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
