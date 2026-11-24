
  # Personal Portfolio Website

  This is a code bundle for Personal Portfolio Website. The original project is available at https://www.figma.com/design/0LI8rsSbqergOg29pNRaUb/Personal-Portfolio-Website.

  ## Running the code

  Run `npm ci` to install the dependencies.

  Run `npm run dev` to start the development server.

## Languages and deployment

Vite serves local development at `/` and builds for the GitHub Pages project path
`/Personal-Portfolio-Website--1-/`. Run `npm run build` and `npm run preview` to
test the production output at `http://localhost:4173/Personal-Portfolio-Website--1-/`.
The repository root and the `en/` and `ar/` routes have their own static index files.
The root serves English by default and points its canonical URL to `en/`.
`.env.production` provides the public origin for canonical, Open Graph, and
`hreflang` URLs.

In GitHub, set **Settings → Pages → Build and deployment → Source** to
**GitHub Actions**. The Pages workflow installs the locked dependencies, builds,
and publishes the complete `dist` directory on pushes to `main`. It can also be
run manually against `main` from the **Actions** tab.

Copy is in `src/i18n/messages/en.json` and `src/i18n/messages/ar.json`. Both
catalogs use the same keys. Section IDs, contact links, dates, project
identifiers, and graph connections are shared across locales. Each resume is
served from its corresponding PDF in `public/`.
