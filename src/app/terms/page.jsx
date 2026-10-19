import Terms from '../../components/Terms.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { seo } from '../../data/seo.js'
import { metadataFor } from '../../lib/metadata.js'

export const metadata = metadataFor('terms')

export default function TermsPage() {
  return (
    <>
      <JsonLd data={seo.terms.schema} />
      <Terms />
    </>
  )
}
