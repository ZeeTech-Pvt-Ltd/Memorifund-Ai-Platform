import { ArrowRight } from './icons.jsx'

export default function CtaBanner({ title, text, cta }) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-banner reveal">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <a className="btn btn-light" href="/" data-scroll="#register">
            {cta} <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  )
}
