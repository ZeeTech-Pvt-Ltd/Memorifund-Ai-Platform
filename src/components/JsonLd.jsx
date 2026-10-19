// Renders the schema.org nodes for a route straight into the server HTML.
//
// The old <Seo/> component appended these from a client effect, so they only
// existed after hydration. The Metadata API cannot emit JSON-LD, so each page
// renders them itself. The data is local and trusted (it comes from
// src/data/seo.js, which is built from content.js), so there is no injection
// surface.
export default function JsonLd({ data = [] }) {
  if (!data.length) return null

  return (
    <>
      {data.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  )
}
