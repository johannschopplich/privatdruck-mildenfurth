# AGENTS.md

Privatdruck-Reihe für den Arbeitskreis Kunst und Kultur am Kloster Mildenfurth – jährlich ein Band, kleine Auflage, satztypografisch hochwertig.

## Woher und wohin

Ursprünglich in Word gesetzt. Migriert auf Nuxt 4 + @nuxt/content + CSS Paged Media; PDF-Rendering via Playwright/Chromium. Ein Markdown-File pro Jahr unter `content/books/{year}.md` → ein druckfertiges PDF unter `exports/{year}.pdf`.

## Typografisches Fundament

Robert Bringhurst, _The Elements of Typographic Style_. Konkret:

- **Modifizierter Tschichold-Margin-Kanon**: inner < top < outer < bottom
- **Baseline-Grid**: vertikale Offsets im Body-Flow (zwischen Blöcken: `p`, `h1`, `h2`, `.poem`, `.epigraph` außen) leiten sich aus `--baseline = 11pt × 1.5` ab. Sub-block-Spacing innerhalb geschlossener typografischer Einheiten (Listenzellen, Quote/Attribution, Inline-Bildränder) und physische Page-Chrome (Trim, Page-Margins) dürfen direkt in pt/mm notiert sein.
- **Folios**: Front- und Back-Matter bleiben unfoliated
- **Hierarchie**: weight first, size second

## Stack & Befehle

```bash
pnpm dev              # Dev-Server
pnpm build            # Statisches Build → .output/public/
pnpm export [year]    # PDF erzeugen (Default: neuestes Jahr)
pnpm test:types       # vue-tsc Typecheck
pnpm lint             # ESLint
```

## Layout-Konventionen

- **`app/assets/css/print.css` ist das Stylebook.** Vue-Components sind absichtlich headless (Struktur + Daten, keine `<style>` Blöcke).
- **MDC für Content, Frontmatter für Metadaten**: Content-Elemente als MDC-Block (`::poem`, `::epigraph`, `::page-break`); Frontmatter trägt nur strukturelle Daten (Jahr, Autor, Editor, Auflage, Lesungsdatum).
