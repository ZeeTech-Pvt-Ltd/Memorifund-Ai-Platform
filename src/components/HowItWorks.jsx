import { Icon, ArrowRight } from './icons.jsx'
import { steps } from '../data/content.js'

// `asPage` is set when this section renders as the full /how-it-works page,
// so its heading becomes the page's single H1 (styling stays identical).
export default function HowItWorks({ asPage = false }) {
  const Heading = asPage ? 'h1' : 'h2'
  // The brief has two levels here: "How to Get Started", then the H3 "Open Your
  // Account in 4 Easy Steps". Step titles sit one below the subheading so the
  // heading order never skips.
  const SubHeading = asPage ? 'h2' : 'h3'
  const StepHeading = asPage ? 'h3' : 'h4'
  return (
    <section className="section how" id="how">
      <div className="container">
        <div className="section-head reveal">
          <Heading className="h2">How to Get Started</Heading>
          <SubHeading className="how-sub">Open Your Account in 4 Easy Steps</SubHeading>
        </div>

        <div className="steps">
          {steps.map((step) => (
            <article className="step reveal" key={step.title}>
              <span className="step-no">{step.no}</span>
              <div className={`step-ico ${step.green ? 'green' : ''}`}>
                <Icon name={step.icon} />
              </div>
              <StepHeading>{step.title}</StepHeading>
              <p>{step.text}</p>
              <a className="btn-link" href="/" data-scroll="#register">
                {step.cta} <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
