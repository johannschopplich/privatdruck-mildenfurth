# Privatdruck Mildenfurth

Private-printing series for the Arbeitskreis Kunst und Kultur am Kloster Mildenfurth – one volume per year, Bringhurst-style: `content/books/{year}.md` becomes the print-ready `exports/{year}.pdf`.

The yearly volumes contain copyrighted poetry and live in the sibling private repo `../privatdruck-mildenfurth-content/`.

## Commands

```bash
pnpm generate
pnpm export [year]    # render the PDF, the latest year by default
pnpm test:types
pnpm lint
```

## Conventions

- `app/assets/css/print.css` holds the design tokens, the `@page` rules, the baseline rhythm, and the MDC descendant selectors (`.body-content p`); `main.css` imports it into `layer(base)`, so a utility always wins over it.
- Components are styled with Tailwind utilities alone, no `<style>` block; an existing CSS variable goes in as an arbitrary value (`mt-(--title-author-offset)`).
