import About from '../../components/About.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { seo } from '../../data/seo.js'
import { metadataFor } from '../../lib/metadata.js'

export const metadata = metadataFor('about')

export default function AboutPage() {
  return (
    <>
      <JsonLd data={seo.about.schema} />
      <About />
    </>
  )
}
