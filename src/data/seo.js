// =========================================================
// Per-route SEO configuration for Memorifund Ai Platform.
// Single source of truth for <title>, meta description, meta
// keywords, canonical URLs, robots rules, Open Graph, Twitter
// cards, and JSON-LD structured data, consumed by <Seo/>.
// Nothing here invents facts: all claims come from content.js.
// =========================================================
import { faq, faqPage } from './content.js'

const SITE = 'https://memorifund-ai-platform.com'
export const OG_IMAGE = `${SITE}/og-image.png`

// ---------- JSON-LD builders (real site content only) ----------

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'Memorifund Ai Platform',
  url: SITE,
  logo: `${SITE}/favicon.svg`,
  description:
    'Memorifund Ai Platform is an AI-powered automated trading platform for users in Australia, automated strategies, live market signals, and dependable security in one place.',
  email: 'support@memorifund-ai-platform.com',
  inLanguage: 'en-AU',
  areaServed: 'Australia',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Melbourne',
    addressRegion: 'Victoria',
    addressCountry: 'AU',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@memorifund-ai-platform.com',
    availableLanguage: 'en',
    hoursAvailable: 'Mo-Su 00:00-24:00',
  },
}

// The platform described as a schema.org Service, geo-scoped to Australia.
// all fields reflect claims already on the site (Melbourne base, 24/7
// support, AU$250 minimum deposit), nothing invented.
function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE}/#service`,
    name: 'Memorifund Ai Platform Automated Trading Platform',
    serviceType: 'Automated trading platform',
    description:
      'AI-powered automated trading platform for users in Australia, automated strategies, live market signals, and dependable security in one place.',
    provider: { '@id': `${SITE}/#organization` },
    areaServed: 'Australia',
    audience: { '@type': 'Audience', audienceType: 'Traders in Australia' },
    offers: {
      '@type': 'Offer',
      description: 'Minimum deposit to activate a trading account',
      price: '250',
      priceCurrency: 'AUD',
    },
  }
}

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  name: 'Memorifund Ai Platform',
  url: SITE,
  publisher: { '@id': `${SITE}/#organization` },
  inLanguage: 'en-AU',
}

function webPage(name, url, description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': `${SITE}/#website` },
    publisher: { '@id': `${SITE}/#organization` },
    inLanguage: 'en-AU',
  }
}

function breadcrumb(name, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name, item: `${SITE}${path}` },
    ],
  }
}

// FAQ schema is generated from the same FAQ content rendered on the
// homepage, never duplicated or invented.
function faqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

// Schema for the standalone /faq page, built from the longer faqPage list.
// "[label](/route)" link tokens are stripped so JSON-LD holds clean text.
const stripLinkTokens = (s) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

function fullFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqPage.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: stripLinkTokens(f.a) },
    })),
  }
}

const homeDescription =
  'Memorifund Ai Platform, AI-powered automated trading for Australia. 24/7 automated strategies, live signals, bank-grade security. Start with just AU$250.'

export const seo = {
  home: {
    title: 'Memorifund Ai Platform, AI-Powered Automated Trading Platform in Australia',
    description: homeDescription,
    keywords:
      'Memorifund Ai Platform, automated trading platform australia, AI trading platform, automated crypto trading, AI trading Australia',
    canonical: `${SITE}/`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Memorifund Ai Platform, AI-powered automated trading platform for Australia',
    schema: [organization, website, webPage('Memorifund Ai Platform, AI-Powered Automated Trading Platform in Australia', `${SITE}/`, homeDescription), faqPageSchema(), serviceSchema()],
  },

  about: {
    title: 'About Memorifund Ai Platform, Automated Trading Without the Complexity',
    description:
      'Learn about Memorifund Ai Platform, the AI trading platform trusted by 4M+ users, with automated analysis, bank-grade security, and 24/7 support.',
    keywords: 'about Memorifund Ai Platform, Memorifund Ai Platform trading platform, automated trading platform australia, AI trading company',
    canonical: `${SITE}/about`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'About Memorifund Ai Platform, automated trading without the complexity',
    schema: [
      webPage('About Memorifund Ai Platform', `${SITE}/about`, 'About the Memorifund Ai Platform AI-driven automated trading platform, automated market analysis, bank-grade security, and 24/7 support.'),
      breadcrumb('About Us', '/about'),
    ],
  },

  contact: {
    title: 'Contact Memorifund Ai Platform, 24/7 Support for Australian Traders',
    description:
      'Questions about Memorifund Ai Platform or automated trading? Contact our 24/7 team by email or the registration form, replies usually within a few hours.',
    keywords: 'contact Memorifund Ai Platform, Memorifund Ai Platform support, automated trading help, automated trading Australia support',
    canonical: `${SITE}/contact`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Contact Memorifund Ai Platform support, 24/7 assistance for Australian traders',
    schema: [
      webPage('Contact Memorifund Ai Platform', `${SITE}/contact`, 'Contact the Memorifund Ai Platform support team, email and registration form, available around the clock.'),
      breadcrumb('Contact Us', '/contact'),
    ],
  },

  'how-it-works': {
    title: 'How Memorifund Ai Platform Works, Get Started in 3 Easy Steps',
    description:
      'Start with Memorifund Ai Platform in two minutes. Create your account, deposit from just AU$250, and let the AI trade around the clock. No hidden fees.',
    keywords: 'how to start automated trading, Memorifund Ai Platform sign up, AI trading steps, automated trading for beginners',
    canonical: `${SITE}/how-it-works`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'How Memorifund Ai Platform works, create your account, deposit, and start automated trading',
    schema: [
      webPage('How Memorifund Ai Platform Works', `${SITE}/how-it-works`, 'How to get started with Memorifund Ai Platform automated trading in three easy steps, create an account, deposit, and start trading.'),
      breadcrumb('How It Works', '/how-it-works'),
    ],
  },

  'memorifund-ai-platform-review-australia-scam': {
    title: 'Memorifund Ai Platform Review Australia: Scam or Legit? (2026)',
    description:
      'Memorifund Ai Platform review Australia, is it a scam or legit? Features, benefits, how to get started, plus a straight answer for Australian traders.',
    keywords: 'Memorifund Ai Platform review, is Memorifund Ai Platform legit, Memorifund Ai Platform scam, Memorifund Ai Platform Australia, automated trading platform review Australia',
    canonical: `${SITE}/memorifund-ai-platform-review-australia-scam`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'article',
    ogImageAlt: 'Memorifund Ai Platform review Australia, is it a scam or legit?',
    schema: [
      webPage('Memorifund Ai Platform Review Australia: Scam or Legit?', `${SITE}/memorifund-ai-platform-review-australia-scam`, 'A straight Memorifund Ai Platform review for Australian traders, features, benefits, getting started, and whether the platform is a scam or legit.'),
      breadcrumb('Memorifund Ai Platform Review', '/memorifund-ai-platform-review-australia-scam'),
    ],
  },

  faq: {
    title: 'Frequently Asked Questions, Memorifund Ai Platform',
    description:
      'Memorifund Ai Platform questions, what the platform does, how reporting works, access requirements, data handling. Not covered? Contact us.',
    keywords: 'Memorifund Ai Platform FAQ, Memorifund Ai Platform questions, how does Memorifund Ai Platform work, Memorifund Ai Platform help, trading platform FAQ',
    canonical: `${SITE}/faq`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Memorifund Ai Platform frequently asked questions',
    schema: [
      webPage('Frequently Asked Questions', `${SITE}/faq`, 'Frequently asked questions about Memorifund Ai Platform, what the platform does, how reporting works, and how to get started.'),
      breadcrumb('FAQ', '/faq'),
      fullFaqSchema(),
    ],
  },

  terms: {
    title: 'Terms of Use, Memorifund Ai Platform Automated Trading Platform',
    description:
      'Read the Memorifund Ai Platform Terms of Use, the rules that govern use of the platform and its services for users in Australia.',
    keywords: 'Memorifund Ai Platform terms of use, automated trading terms, platform terms',
    canonical: `${SITE}/terms`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Memorifund Ai Platform terms of use',
    schema: [
      webPage('Terms of Use', `${SITE}/terms`, 'The Memorifund Ai Platform Terms of Use, the rules governing use of the platform.'),
      breadcrumb('Terms of Use', '/terms'),
    ],
  },

  privacy: {
    title: 'Privacy Policy, Memorifund Ai Platform Automated Trading Platform',
    description:
      'Read the Memorifund Ai Platform Privacy Policy, how it collects, uses, and protects your personal information on the trading platform.',
    keywords: 'Memorifund Ai Platform privacy policy, data protection, trading platform privacy',
    canonical: `${SITE}/privacy`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Memorifund Ai Platform privacy policy',
    schema: [
      webPage('Privacy Policy', `${SITE}/privacy`, 'The Memorifund Ai Platform Privacy Policy, how personal information is collected and protected.'),
      breadcrumb('Privacy Policy', '/privacy'),
    ],
  },

  disclosure: {
    title: 'Risk Disclosure, Memorifund Ai Platform Automated Trading Platform',
    description:
      'Read the Memorifund Ai Platform Risk Disclosure, key information about the risks of trading FX, CFDs, and cryptocurrencies.',
    keywords: 'Memorifund Ai Platform risk disclosure, trading risk warning, CFD crypto risk',
    canonical: `${SITE}/disclosure`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    type: 'website',
    ogImageAlt: 'Memorifund Ai Platform risk disclosure',
    schema: [
      webPage('Risk Disclosure', `${SITE}/disclosure`, 'The Memorifund Ai Platform Risk Disclosure, information about the risks of trading FX, CFDs, and cryptocurrencies.'),
      breadcrumb('Risk Disclosure', '/disclosure'),
    ],
  },

  'thank-you': {
    title: 'Thank You, Memorifund Ai Platform Registration',
    description:
      'Your Memorifund Ai Platform registration has been received. Our team will review your details and contact you shortly to activate your account.',
    keywords: '',
    canonical: `${SITE}/thank-you`,
    robots: 'noindex, nofollow',
    type: 'website',
    ogImageAlt: 'Thank you, Memorifund Ai Platform registration',
    schema: [],
  },

  404: {
    title: 'Page Not Found, Memorifund Ai Platform',
    description: "The page you're looking for doesn't exist or has been moved. Return to the Memorifund Ai Platform homepage or contact support.",
    keywords: '',
    canonical: null, // 404 page carries no canonical, it is noindexed
    robots: 'noindex, nofollow',
    type: 'website',
    ogImageAlt: 'Page not found, Memorifund Ai Platform',
    schema: [],
  },
}
