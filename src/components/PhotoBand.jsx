import marketLines from '../assets/photos/market-lines.jpg'
import chartMonitors from '../assets/photos/chart-monitors.jpg'

// A wide photographic break between sections.
//
// Three rules decided what is in here.
//
// The subject is never a person. The site carries testimonials further down the
// page, and a photograph of a face anywhere near them reads as a customer who
// does not exist. So the photography is of the market and the tools, not the
// people using them.
//
// The photo is a background, never the subject. It sits behind a statement in
// the site's own voice, so it reads as atmosphere rather than as a screenshot
// of the product. These screens belong to other people.
//
// The files are self hosted, so the page still makes no third party request at
// runtime and the privacy policy stays true. The treatment (desaturate, darken,
// warm) is applied in CSS rather than baked into the files, because the palette
// is dark gold and an untreated stock photo lands in the middle of it as blue
// grey.
//
// Source: Pexels, free to use commercially under the Pexels license.

const PHOTOS = {
  // Deliberately a chart without legible figures. The first choice here was a
  // photo of a stock ticker board, and the company names and prices on it were
  // sharp enough to be read, which reads as market data this site is offering.
  lines: {
    src: marketLines,
    alt: 'Price lines crossing a dark chart screen, with the trend running diagonally',
    pos: 'center 50%',
  },
  charts: {
    src: chartMonitors,
    alt: 'Monitors on a desk displaying candlestick charts and price lines',
    pos: 'center 50%',
  },
}

export default function PhotoBand({ photo = 'lines', kicker, title, text, height }) {
  const p = PHOTOS[photo]
  if (!p) return null

  return (
    <section className="photo-band" style={height ? { '--band-h': `${height}px` } : undefined}>
      <img
        className="photo-band-img"
        src={p.src.src}
        alt={p.alt}
        width="1400"
        height="933"
        loading="lazy"
        decoding="async"
        style={{ objectPosition: p.pos }}
      />
      <span className="photo-band-wash" aria-hidden="true" />
      <div className="container photo-band-inner">
        <div className="photo-band-copy">
          {kicker && <span className="photo-band-kicker">{kicker}</span>}
          {title && <h2 className="photo-band-title">{title}</h2>}
          {text && <p className="photo-band-text">{text}</p>}
        </div>
      </div>
    </section>
  )
}
