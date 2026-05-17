# AGENTS.md

Private-printing series for the Arbeitskreis Kunst und Kultur am Kloster Mildenfurth – one volume per year, Bringhurst-style.

Pipeline: one Markdown file per year under `content/books/{year}.md` → print-ready PDF under `exports/{year}.pdf`. Stack: Nuxt 4 + @nuxt/content + Tailwind v4 + CSS Paged Media.

The yearly volumes contain copyrighted poetry and live in the sibling private repo `../privatdruck-mildenfurth-content/`.

## Layout

- `app/assets/css/print.css` – design tokens, `@page` rules, baseline rhythm, MDC descendant selectors (e.g. `.body-content p`); imported via `layer(base)` so utilities reliably win
- `app/assets/css/main.css` – Tailwind `@theme` and `@utility` for typography tokens
- `app/components/` – Vue components with Tailwind utilities (no `<style>` blocks); existing CSS variables directly via arbitrary values (`mt-(--title-author-offset)`)
- `content/books/{year}.md` – frontmatter + MDC content (`::poem`, `::epigraph`, `::page-break`, `::note`, `::deck`, `:::aside`)
- `scripts/export.ts` – PDF export via Playwright

## Commands

```bash
pnpm dev              # dev server
pnpm generate         # static build → .output/public/
pnpm export [year]    # render PDF (default: latest year)
pnpm test:types       # vue-tsc typecheck
pnpm lint             # ESLint
```
