import FaqPage from '../../components/FaqPage.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { seo } from '../../data/seo.js'
import { metadataFor } from '../../lib/metadata.js'

export const metadata = metadataFor('faq')

export default function FaqRoute() {
  return (
    <>
      <JsonLd data={seo.faq.schema} />
      <FaqPage />
    </>
  )
}
