import NotFound from '../components/NotFound.jsx'
import { metadataFor } from '../lib/metadata.js'

// seo['404'] is noindex, has no canonical and no schema. Next returns a real
// HTTP 404 here, which is what the project brief asks for; the old SPA rewrite
// answered 200.
export const metadata = metadataFor('404')

export default function NotFoundPage() {
  return <NotFound />
}
