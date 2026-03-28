# Learning

A personal learning project built with Astro, React, and Tailwind CSS.

## Tech Stack

### Volta — Node version manager
Volta pins the Node and npm versions so every developer uses exactly the same toolchain automatically. When you `cd` into the repo, Volta switches Node without any manual action.
Docs: https://docs.volta.sh

### Node.js
Runtime requirement: `>=22.12.0`. Managed via Volta.
Docs: https://nodejs.org/docs/latest/api

### Astro
The site framework. Astro renders pages to static HTML at build time and ships zero JS by default. Interactive islands (React components) are hydrated on demand. Configuration lives in `astro.config.mjs`.

Key integrations: `@astrojs/react`, `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss`.
Docs: https://docs.astro.build

### React
Used for interactive UI components (Astro islands). React 19 via `@astrojs/react`. Use the `client:*` directive in `.astro` files to control hydration.
Docs: https://react.dev

### Tailwind CSS v4
Handles all styling. Tailwind v4 uses a CSS-first config model — no `tailwind.config.js`. The Vite plugin is registered in `astro.config.mjs` and the theme is defined with `@theme` in `src/styles/global.css`.
Docs: https://tailwindcss.com/docs

### shadcn/ui
Copy-paste React components styled with Tailwind. Components live in `src/components/ui/` and are added via the `shadcn` CLI. Config is in `components.json` (style: `base-maia`, icons: `hugeicons`). Utility helpers (`cn`, `cva`, etc.) are in `src/lib/utils.ts`.
Docs: https://ui.shadcn.com/docs | https://hugeicons.com/docs/react-icons

## How the pieces fit together

```
Volta
  └─ pins Node version

Node / npm
  └─ runs Astro CLI and dev server

Astro
  ├─ builds pages from src/pages/ (static HTML, Markdown, MDX)
  ├─ manages content collections in src/content/
  └─ hydrates React islands via @astrojs/react

React
  └─ powers interactive UI components (src/components/)
       └─ shadcn/ui components live in src/components/ui/

Tailwind CSS v4
  └─ styles everything; theme defined in src/styles/global.css

shadcn/ui
  └─ pre-built, customisable React components
       └─ styled with Tailwind, using CSS variables from global.css
```

## Project Structure

```
├── public/              Static assets served as-is
├── src/
│   ├── components/      Astro and React components
│   │   └── ui/          shadcn/ui components
│   ├── content/         Markdown / MDX content collections
│   ├── layouts/         Shared page layouts
│   ├── lib/             Utilities (cn helper, etc.)
│   ├── pages/           File-based routes
│   └── styles/
│       └── global.css   Tailwind import + theme config
├── astro.config.mjs     Astro + Vite + integration config
├── components.json      shadcn/ui config
├── package.json
└── tsconfig.json
```

Astro looks for `.astro`, `.md`, or `.mdx` files in `src/pages/` — each file becomes a route. Content collections in `src/content/` are retrieved with `getCollection()` and type-checked via a schema in `src/content.config.ts`. Static assets go in `public/`.

## Commands

| Command             | Action                                          |
| :------------------ | :---------------------------------------------- |
| `npm install`       | Install dependencies                            |
| `npm run dev`       | Start dev server at `localhost:4321`            |
| `npm run build`     | Build production site to `./dist/`              |
| `npm run preview`   | Preview production build locally                |
| `npm run astro ...` | Run Astro CLI (e.g. `astro add`, `astro check`) |
