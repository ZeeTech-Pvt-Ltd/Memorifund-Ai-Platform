import { Icon } from './icons.jsx'
import { precision } from '../data/content.js'
import { Sparkline } from './ChartVisuals.jsx'

export default function Precision() {
  return (
    <section className="section precision">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="h2">Precision, Speed, and <mark>Security</mark>, All in One System</h2>
          <p className="lead">A closer look at the details that set Memorifund Ai Platform apart.</p>
        </div>

        <div className="prec-list">
          {precision.map((f, i) => (
            <article className="prec-row reveal" key={f.title}>
              <div className={`prec-ico ${f.green ? 'green' : ''}`}>
                <Icon name={f.icon} />
              </div>
              <div className="prec-copy">
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
              <div className="prec-visual" aria-hidden="true">
                <Sparkline up={i !== 1} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
