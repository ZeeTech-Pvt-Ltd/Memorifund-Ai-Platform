import ThankYou from '../../components/ThankYou.jsx'
import { metadataFor } from '../../lib/metadata.js'

// seo['thank-you'] is noindex, so this route stays out of search results.
// It carries no JSON-LD, matching src/data/seo.js (schema: []).
export const metadata = metadataFor('thank-you')

export default function ThankYouPage() {
  return <ThankYou />
}
