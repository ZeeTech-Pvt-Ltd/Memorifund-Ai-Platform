import CountUp from './CountUp.jsx'
import { metrics } from '../data/content.js'

export default function Metrics() {
  return (
    <section className="section-tight metrics">
      <div className="container">
        <div className="metrics-band reveal">
          {metrics.map((m) => (
            <div className={`metric-cell ${m.solid ? 'solid' : ''}`} key={m.label}>
              <CountUp className="num" value={m.value} duration={900} />
              <div className="lbl">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
