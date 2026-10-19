import Privacy from '../../components/Privacy.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { seo } from '../../data/seo.js'
import { metadataFor } from '../../lib/metadata.js'

export const metadata = metadataFor('privacy')

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={seo.privacy.schema} />
      <Privacy />
    </>
  )
}
