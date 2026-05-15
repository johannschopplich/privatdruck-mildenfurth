# AGENTS.md

Privatdruck-Reihe für den Arbeitskreis Kunst und Kultur am Kloster Mildenfurth – jährlich ein Band, kleine Auflage, satztypografisch hochwertig nach Bringhurst (_The Elements of Typographic Style_).

Pipeline: ein Markdown-File pro Jahr unter `content/books/{year}.md` → druckfertiges PDF unter `exports/{year}.pdf`. Stack: Nuxt 4 + @nuxt/content + Tailwind v4 + CSS Paged Media; PDF-Rendering via Playwright/Chromium.

## Wo was lebt

- `app/assets/css/print.css` – Design-Tokens, `@page`-Rules, Baseline-Rhythmus, MDC-Descendant-Selektoren (z. B. `.body-content p`); per `layer(base)` importiert, damit Utilities reliable gewinnen
- `app/assets/css/main.css` – Tailwind `@theme` und `@utility` für Typo-Tokens
- `app/components/` – Vue-Components mit Tailwind-Utilities (keine `<style>`-Blöcke); existierende CSS-Variablen direkt via arbitrary values (`mt-(--title-author-offset)`)
- `content/books/{year}.md` – Frontmatter + MDC-Content (`::poem`, `::epigraph`, `::page-break`, `::note`, `::deck`, `:::aside`)
- `scripts/export.ts` – PDF-Export via Playwright

## Befehle

```bash
pnpm dev              # Dev-Server
pnpm generate         # Statisches Build → .output/public/
pnpm export [year]    # PDF erzeugen (Default: neuestes Jahr)
pnpm test:types       # vue-tsc Typecheck
pnpm lint             # ESLint
```
