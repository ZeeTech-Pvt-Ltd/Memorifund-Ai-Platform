import HowItWorks from '../../components/HowItWorks.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { seo } from '../../data/seo.js'
import { metadataFor } from '../../lib/metadata.js'

export const metadata = metadataFor('how-it-works')

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={seo['how-it-works'].schema} />
      <HowItWorks asPage />
    </>
  )
}
