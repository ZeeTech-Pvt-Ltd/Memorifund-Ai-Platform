# Memorifund Ai Platform

Marketing site for Memorifund Ai Platform, built with Next.js (App Router) and
plain CSS. No TypeScript, no component library.

## Commands

```bash
npm install
npm run dev      # next dev
npm run build    # next build, all routes prerender statically
npm start        # next start, serves the production build
npm run lint     # oxlint src/
```

## Layout

```
src/app/          route files, one folder per URL, each exporting metadata
src/components/   UI. Anything with hooks or event handlers starts with 'use client'
src/data/         content.js, countries.js, seo.js (single source of SEO copy)
src/lib/          submitLead (lead form POST), metadata (seo.js -> Next Metadata)
src/hooks/        useReveal, useScrollSpy, useCountUp
src/index.css     the whole design system, imported once from the root layout
public/           favicons, og-image, robots.txt, sitemap.xml
```

## Notes

- SEO lives in `src/data/seo.js`. Each page builds its metadata from it via
  `metadataFor()`, and renders its JSON-LD through `<JsonLd>`.
- Internal links are plain `<a>` tags. `src/components/NavHandler.jsx` is the
  single click handler that turns them into client navigation and implements
  the `data-scroll` anchor behaviour.
- The legacy `/How-It-Works` redirect is in `src/middleware.js`, not
  `next.config.mjs`: Next matches redirect sources case-insensitively, so a
  config rule would redirect `/how-it-works` to itself.
- `src/assets` images are imported as modules. The components read `.src` from
  the resulting `StaticImageData` and render a plain `<img>`.
