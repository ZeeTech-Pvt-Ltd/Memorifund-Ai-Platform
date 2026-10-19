import Contact from '../../components/Contact.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { seo } from '../../data/seo.js'
import { metadataFor } from '../../lib/metadata.js'

export const metadata = metadataFor('contact')

export default function ContactPage() {
  return (
    <>
      <JsonLd data={seo.contact.schema} />
      <Contact />
    </>
  )
}
