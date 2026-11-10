import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import BulletSection from '../components/BulletSection.jsx'
import Precision from '../components/Precision.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Faq from '../components/Faq.jsx'
import FinalCta from '../components/FinalCta.jsx'
import JsonLd from '../components/JsonLd.jsx'
import { markets, whoItsFor, security, securityNotice } from '../data/content.js'
import { seo } from '../data/seo.js'
import { metadataFor } from '../lib/metadata.js'

export const metadata = metadataFor('home')

// Section for section from the content brief: hero, quick highlights, why
// choose us, how to get started, markets, features, who it's for, security,
// testimonials (hidden until there are real ones), FAQs, final CTA.
export default function HomePage() {
  return (
    <>
      <JsonLd data={seo.home.schema} />

      <Hero />
      <Features />
      <HowItWorks />
      <BulletSection title="Markets" items={markets} />
      <Precision />
      <BulletSection title="Who It’s For" items={whoItsFor} />
      <BulletSection title={'Security & Transparency'} items={security} notice={securityNotice} />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  )
}
