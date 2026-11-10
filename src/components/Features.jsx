import { Icon } from './icons.jsx'
import { features } from '../data/content.js'

export default function Features() {
  return (
    <section className="section feat" id="features">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="h2">Why Choose Us</h2>
        </div>

        <div className="feat-grid">
          {features.map((f, i) => (
            <article className="feat-card reveal" key={f.title}>
              <span className="feat-num">0{i + 1}</span>
              <div className={`feat-ico ${f.green ? 'green' : ''}`}>
                <Icon name={f.icon} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
