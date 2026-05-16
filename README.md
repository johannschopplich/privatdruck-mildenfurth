[![Privatdruck Mildenfurth – MMXXVI](./.github/og.png)](https://github.com/johannschopplich/privatdruck-mildenfurth)

# Privatdruck Mildenfurth

Annual private printing of contemporary German poetry for the Arbeitskreis Kunst und Kultur am Kloster Mildenfurth – the arts-and-culture circle at a former Thuringian monastery. One markdown file per year, one PDF out.

## Why

Since 2003 the circle has published one slim volume of contemporary German poetry each year – fifty numbered copies, handed out at a reading in the cloister garden. Edited by Sebastian Schopplich. Wulf Kirsten advised the series for two decades, until his death in 2022.

I took over the typesetting from a Word-based layout in 2026 and rebuilt production around the stack below. The constraint is Bringhurst's _Elements of Typographic Style_; every choice the book makes has a reason on a page somewhere.

## Typographic Principles

- **Fonts** – Sirba (body), Trola (display)
- **Page** – modified Tschichold canon; inner < top < outer < bottom
- **Rhythm** – every vertical gap a rational fraction of one body line (¾, 1, 1½, 2)
- **Caps** – letterspaced wherever they appear
- **Figures** – oldstyle; folios tabular oldstyle
- **Punctuation** – hanging at line starts and ends
- **Apparatus** – source notes set close under their poem
- **Folios** – book block counted from the title page

## How It's Built

- [Nuxt 4](https://nuxt.com) + [@nuxt/content](https://content.nuxt.com) – markdown → routes
- [Tailwind v4](https://tailwindcss.com) – design tokens, utility classes
- [CSS Paged Media](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_paged_media) – `@page` rules, folio positioning, custom counters
- [Playwright](https://playwright.dev) – Chromium headless, prints the route to PDF

```bash
pnpm install
pnpm dev              # preview in the browser
pnpm export [year]    # render exports/<year>.pdf (default: newest year)
```

## Yearly Workflow

One file per year under `content/books/{year}.md`. Frontmatter for metadata, MDC components for the body:

```markdown
---
year: 2026
author: Michael Wüstefeld
title: Schattenwurf
---

::poem{title="Altes Lied" date="1985"}
Wer spricht hier von Gestern
Dreht sich sehnsüchtig um
…
::
```

`pnpm export 2026` renders the book to `exports/2026.pdf`. That's the whole pipeline.

A runnable demonstration ships in `content/books/1914.md` — a small selection from Georg Trakl's _Sebastian im Traum_ (public domain). Run `pnpm dev` or `pnpm export 1914` to see the typography system in action without needing the private content repository.

## Content & Copyright

The actual yearly volumes contain contemporary German poetry under copyright of the respective authors. The poems are licensed for the numbered private printing only and are **not** part of this repository – they live in a private companion repo and are pulled in via gitignored symlinks at `content/books/{year}.md` and `exports/{year}.pdf`. This repository contains the typesetting system; the only poetry committed here is the Trakl example.

## License

[MIT](./LICENSE) License © 2026-PRESENT [Johann Schopplich](https://github.com/johannschopplich)

The MIT license applies to the code and typography system in this repository. It does **not** apply to any poetry rendered through it — those texts remain the copyright of their respective authors.
