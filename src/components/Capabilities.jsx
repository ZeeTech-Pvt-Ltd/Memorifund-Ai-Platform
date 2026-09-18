import { capabilities } from '../data/content.js'

export default function Capabilities() {
  return (
    <section className="section caps">
      <div className="container">
        <div className="section-head reveal">
          <h2 className="h2">Core <mark>Capabilities</mark> of the Memorifund Ai Platform Trading Platform</h2>
        </div>

        <div className="caps-grid">
          {capabilities.map((c) => (
            <div className="cap-card reveal" key={c.k}>
              <span className="cap-k">{c.k}</span>
              <span className="cap-v">{c.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
