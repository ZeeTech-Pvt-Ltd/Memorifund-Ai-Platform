import BlogArticle from '../../components/BlogArticle.jsx'
import JsonLd from '../../components/JsonLd.jsx'
import { seo } from '../../data/seo.js'
import { metadataFor } from '../../lib/metadata.js'

export const metadata = metadataFor('memorifund-ai-platform-review-australia-scam')

export default function ReviewPage() {
  return (
    <>
      <JsonLd data={seo['memorifund-ai-platform-review-australia-scam'].schema} />
      <BlogArticle />
    </>
  )
}
