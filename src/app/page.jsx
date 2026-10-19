import Hero from '../components/Hero.jsx'
import Metrics from '../components/Metrics.jsx'
import Experience from '../components/Experience.jsx'
import Priorities from '../components/Priorities.jsx'
import Features from '../components/Features.jsx'
import Precision from '../components/Precision.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Portfolio from '../components/Portfolio.jsx'
import PhotoBand from '../components/PhotoBand.jsx'
import Capabilities from '../components/Capabilities.jsx'
import Faq from '../components/Faq.jsx'
import FinalCta from '../components/FinalCta.jsx'
import JsonLd from '../components/JsonLd.jsx'
import { seo } from '../data/seo.js'
import { metadataFor } from '../lib/metadata.js'

export const metadata = metadataFor('home')

export default function HomePage() {
  return (
    <>
      <JsonLd data={seo.home.schema} />

      <Hero />
      <Metrics />
      <Experience />
      <Priorities />
      <Features />
      <Precision />

      <CtaBanner
        title="Built for Every Trader"
        text="Memorifund Ai Platform is built by a team of innovators, analysts, and engineers committed to advancing the world of automated trading. Join thousands of verified traders across Australia today."
        cta="Register Now"
      />

      <Testimonials />
      <Portfolio />
      <PhotoBand
        photo="lines"
        kicker="One Place"
        title="Everything You Follow, In One Place"
        text="Crypto, forex and stocks all sit together, so checking what moved doesn't mean switching between different tools."
      />
      {/* Spec table first, then FAQ last so the final doubt-handling flows
          straight into the final sign-up CTA (no dry table in between). */}
      <Capabilities />
      <Faq />
      <FinalCta />
    </>
  )
}
