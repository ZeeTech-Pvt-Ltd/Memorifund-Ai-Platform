import { Check } from './icons.jsx'
import { portfolio } from '../data/content.js'
import { AreaChart } from './ChartVisuals.jsx'

export default function Portfolio() {
  const { title, titleMark, titleEnd, lead, checks } = portfolio

  return (
    <section className="section feat" id="portfolio">
      <div className="container feat-duo">
        <div className="portfolio-visual reveal">
          <div className="portfolio-panel">
            <div className="dash-head">
              <span className="dash-brand">
                <span className="dash-brand-dot"></span> Memorifund Ai Platform
              </span>
              <span className="dash-live"><span className="dot"></span> Live</span>
            </div>
            <div className="dash-body">
              <div className="dash-bal-row">
                <div>
                  <div className="dash-label">Total Portfolio</div>
                  <div className="dash-bal">$96,410.28</div>
                </div>
                <span className="dash-pct">+34.8%</span>
              </div>
              <AreaChart height={150} />
              <div className="dash-stats">
                <span>Equities <b>42%</b></span>
                <span>Forex <b>31%</b></span>
                <span>Crypto <b>27%</b></span>
              </div>
            </div>
          </div>
        </div>

        <div className="feat-duo-copy reveal">
          <h2 className="h2">{title}<mark>{titleMark}</mark>{titleEnd}</h2>
          <p className="lead">{lead}</p>
          <ul className="hero-checks">
            {checks.map((c) => (
              <li key={c}>
                <span className="tick"><Check /></span> {c}
              </li>
            ))}
          </ul>
          <a className="btn btn-primary" href="/" data-scroll="#register">Get Started</a>
        </div>
      </div>
    </section>
  )
}
