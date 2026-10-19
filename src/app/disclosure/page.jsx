import RiskDisclosure from '../../components/RiskDisclosure.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { seo } from '../../data/seo.js'
import { metadataFor } from '../../lib/metadata.js'

export const metadata = metadataFor('disclosure')

export default function DisclosurePage() {
  return (
    <>
      <JsonLd data={seo.disclosure.schema} />
      <RiskDisclosure />
    </>
  )
}
