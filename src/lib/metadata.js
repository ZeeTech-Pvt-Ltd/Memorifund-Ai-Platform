import { seo, OG_IMAGE, SITE } from '../data/seo.js'

const SITE_NAME = 'Memorifund Ai Platform'

// Turns a seo.js entry into the Next Metadata object for one route.
//
// This replaces the old <Seo/> component, which wrote these same values into
// document.head from a client effect. Nothing here is retyped: every string
// still comes from src/data/seo.js, so the two can never drift.
//
// Parity details worth keeping:
// - keywords: '' means "emit no keywords meta" (thank-you, 404), so it maps to
//   undefined rather than an empty tag.
// - canonical: null means "emit no canonical" (404), so alternates is omitted.
// - og:url falls back to the homepage when there is no canonical, which is what
//   <Seo/> did.
// - There is no title template: every title in seo.js is already complete.
export function metadataFor(route) {
  const conf = seo[route] || seo['404']

  return {
    title: conf.title,
    description: conf.description,
    keywords: conf.keywords || undefined,
    robots: conf.robots,
    ...(conf.canonical ? { alternates: { canonical: conf.canonical } } : {}),
    openGraph: {
      siteName: SITE_NAME,
      title: conf.title,
      description: conf.description,
      url: conf.canonical || `${SITE}/`,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: conf.ogImageAlt,
          type: 'image/png',
        },
      ],
      type: conf.type || 'website',
      locale: 'en_AU',
    },
    twitter: {
      card: 'summary_large_image',
      title: conf.title,
      description: conf.description,
      images: [OG_IMAGE],
    },
  }
}
