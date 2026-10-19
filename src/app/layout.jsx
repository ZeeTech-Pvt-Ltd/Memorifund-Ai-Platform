import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import '../index.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Reveal from '../components/Reveal.jsx'
import NavHandler from '../components/NavHandler.jsx'
import Analytics from '../components/Analytics.jsx'
import { SITE } from '../data/seo.js'

// Same families, weights and display strategy the site loaded from Google
// Fonts before. next/font self-hosts them at build time, which removes the two
// render-blocking preconnects and the media="print" swap trick.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const SITE_NAME = 'Memorifund Ai Platform'
const DEFAULT_TITLE = 'Memorifund Ai Platform: AI-Powered Trading in Australia'
const DEFAULT_DESCRIPTION =
  'Memorifund Ai Platform, AI-powered automated trading for Australia. 24/7 automated strategies, live signals, bank-grade security. Start with just AU$250.'

// Site-wide defaults. Each page overrides title, description, keywords,
// robots, canonical, Open Graph and Twitter from src/data/seo.js through
// metadataFor(); icons, verification and metadataBase are inherited from here.
export const metadata = {
  metadataBase: new URL(SITE),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  keywords:
    'Memorifund Ai Platform, automated trading platform australia, AI trading platform, automated crypto trading, AI trading Australia',
  openGraph: {
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: `${SITE}/`,
    images: [
      {
        url: `${SITE}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Memorifund Ai Platform, AI-powered automated trading platform for Australia',
        type: 'image/png',
      },
    ],
    type: 'website',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [`${SITE}/og-image.png`],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  verification: {
    google: 'H9lJqhLA0jRKL7jmzHG7UFEYm7PhgF6lOng_oO9BDGc',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B0A08',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Country flags in the phone field come from flagcdn.com. */}
        <link rel="preconnect" href="https://flagcdn.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://flagcdn.com" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />

        {/* Behaviour that used to live in App.jsx. */}
        <Reveal />
        <NavHandler />
        <Analytics />

        {/* Google Analytics (GA4). afterInteractive keeps it off the critical
            path; gtag('config') sends the first page_view. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-86L5V9DC26"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-86L5V9DC26');`}
        </Script>
      </body>
    </html>
  )
}
