# CLAUDE.md

## Project Overview

Astro 6 blog/learning site with React islands. Static by default; React is used only for interactive components. Content is Markdown/MDX managed via Astro Content Collections.

**Stack:** Astro 6, React 19, Tailwind CSS v4, shadcn/ui (base-maia style), TypeScript, Hugeicons.

---

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

For UI work specifically: if a request could mean an Astro component or a React component, or could use an existing shadcn primitive vs. a bespoke component, state the choice and why before writing code.

---

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use components or styles.
- No "flexibility" that wasn't requested — don't add extra variants, props, or config options speculatively.
- No error handling for impossible scenarios (e.g. content schema is validated by Zod at build time — don't defensively guard against missing frontmatter in components).
- If you write a 40-line component and it could be 15, rewrite it.

Ask yourself: "Would a senior Astro/React engineer say this is overcomplicated?" If yes, simplify.

**This site favours simplicity aesthetically too.** When in doubt, do less visually — remove decoration, reduce motion, strip colour.

---

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing components:
- Don't "improve" adjacent markup, class names, or formatting.
- Don't refactor things that aren't broken.
- Match existing style — Astro vs. React, scoped `<style>` vs. Tailwind — even if you'd do it differently.
- If you notice unrelated dead code or stale styles, mention it — don't delete it.

When your changes create orphans:
- Remove imports, variables, or functions that **your** changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: every changed line should trace directly to the user's request.

---

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add a card component" → "Component renders correctly in both light and dark mode, matches the site aesthetic, and is used in at least one page"
- "Fix the layout bug" → "Identify the broken breakpoint, fix it, verify at both mobile (≤720px) and desktop widths"
- "Refactor X" → "Ensure the page still builds (`astro build`) and looks identical before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

For this project, the primary verification methods are:
- `npm run build` — catches TypeScript errors, broken imports, and invalid content schemas
- `npm run dev` — visual check in browser
- Content schema errors surface at build time via Zod — always run build after touching `content.config.ts`

---

## Aesthetic Guidelines

This site has a clean, minimalist aesthetic inspired by Bear Blog. New components must respect this — avoid visual clutter, heavy shadows, busy gradients, or decorative elements that don't serve a purpose.

**Colors:** Always reference CSS custom properties — never hardcode hex/rgb values.
- Primary brand: `var(--accent)` (deep rose/magenta)
- Secondary: `var(--accent-alt)` (Cambridge Blue)
- Text: `var(--foreground)`, muted text: `var(--muted-foreground)`
- Backgrounds: `var(--background)`, `var(--card)`, `var(--muted)`

**Typography:** Body text uses the Atkinson font; UI elements use Figtree Variable. Use the modular type scale defined in `global.css` — don't set arbitrary `text-[Xpx]` sizes when a semantic heading or prose size fits.

**Spacing & Shape:** Use `--radius` and its multiples (`--radius-sm`, `--radius-lg`, etc.) for border radii. Prefer generous, consistent spacing over tight or dense layouts.

**Dark mode:** All components must support dark mode. Use `@media (prefers-color-scheme: dark)` or the dark-mode CSS variable overrides in `global.css` — never hard-code a color that only works in one mode.

**Transitions:** Prefer `transition-all` or short, purposeful CSS transitions. Keep animations subtle — the existing background animation sets the tone.

---

## Component Guidelines

### When to use Astro vs React

- **Astro component (`.astro`)**: Default choice for anything that doesn't need client-side interactivity — layouts, structural UI, typography, navigation, static cards.
- **React component (`.tsx` in `src/components/ui/`)**: Only when the component needs state, event handlers, or browser APIs. Hydrate sparingly using `client:load`, `client:visible`, or `client:idle`.

### Styling approach (in priority order)

1. **Tailwind utility classes** — use these for the vast majority of styling.
2. **CSS custom properties** — for colors, radii, and spacing tokens; always prefer `var(--token)` over literal values.
3. **Scoped `<style>` blocks** — for complex layout logic, multi-step transitions, or pseudo-element styling that Tailwind can't express cleanly.

Use `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) to merge class names in React components.

### Abstraction rules

- **Use CVA (`class-variance-authority`) for any component with meaningful variants** (size, intent, style). See `src/components/ui/button.tsx` as the reference pattern.
- **Don't create an abstraction for a single use case.** If a pattern appears in two or more places, extract it. One-offs stay inline.
- **Prefer composition over configuration.** Expose slots/children rather than a long list of props that reconstruct HTML structure.
- **New shadcn/ui primitives** must be added via the `shadcn` CLI (`npx shadcn add <component>`) into `src/components/ui/` — don't manually copy/create headless component primitives.
- **Props must be typed** with a TypeScript interface. Avoid `any`.

### Accessibility

- Use semantic HTML elements (`<nav>`, `<article>`, `<aside>`, `<header>`, etc.).
- Interactive elements need `aria-label` when their purpose isn't clear from text content alone.
- Use `class="sr-only"` for visually hidden but screen-reader-visible labels.
- Keyboard navigation must work for all interactive components.

---

## File Conventions

| What | Where |
|------|-------|
| Static/structural components | `src/components/` |
| Interactive React UI primitives | `src/components/ui/` |
| Page layouts | `src/layouts/` |
| Global styles and theme tokens | `src/styles/global.css` |
| Shared utilities | `src/lib/utils.ts` |
| Path alias | `@/*` → `src/*` |

---

## Key Patterns

**Class name merging (React):**
```tsx
import { cn } from "@/lib/utils"
<div className={cn("base-classes", conditional && "extra-class", className)} />
```

**CVA variants:**
```tsx
import { cva } from "class-variance-authority"
const cardVariants = cva("base classes", {
  variants: { size: { sm: "...", lg: "..." } },
  defaultVariants: { size: "sm" }
})
```

**Astro component with typed props:**
```astro
---
interface Props { title: string; href?: string }
const { title, href } = Astro.props
---
```

**Dark mode styles (scoped CSS):**
```css
@media (prefers-color-scheme: dark) {
  .element { color: var(--foreground); }
}
```
