
  # Personal Portfolio Website

  This is a code bundle for Personal Portfolio Website. The original project is available at https://www.figma.com/design/0LI8rsSbqergOg29pNRaUb/Personal-Portfolio-Website.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## Languages and deployment

The React portfolio uses Vite. `npm run build` writes the English and Arabic
HTML pages to `dist/en/index.html` and `dist/ar/index.html`. Publish the complete
`dist` directory to a static host with directory indexes. Serve `/en` and `/ar`
from their respective indexes instead of rewriting those requests to the root page.

Set `VITE_SITE_URL` to the public HTTPS origin at build time to emit absolute
canonical, Open Graph, and `hreflang` URLs in the static HTML. The root page is
the English fallback and its canonical URL points to `/en`.

Copy is in `src/i18n/messages/en.json` and `src/i18n/messages/ar.json`. Both
catalogs use the same keys. Section IDs, contact links, dates, project
identifiers, and graph connections are shared across locales. Each resume is
served from its corresponding PDF in `public/`.
