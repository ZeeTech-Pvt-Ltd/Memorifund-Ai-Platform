import { Icon, ArrowRight } from './icons.jsx'
import { steps } from '../data/content.js'

// `asPage` is set when this section renders as the full /how-it-works page,
// so its heading becomes the page's single H1 (styling stays identical).
export default function HowItWorks({ asPage = false }) {
  const Heading = asPage ? 'h1' : 'h2'
  // Track the section heading one level down, so the step titles never skip a
  // level (h1 -> h3 on the standalone page was failing the a11y heading order).
  const StepHeading = asPage ? 'h2' : 'h3'
  return (
    <section className="section how" id="how">
      <div className="container">
        <div className="section-head reveal">
          <Heading className="h2">Open Your Account in 4 Easy Steps</Heading>
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
