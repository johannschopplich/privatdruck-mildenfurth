# Trennlinie zwischen print.css und Vue-Components

`print.css` trägt Design-Tokens, `@page`-Rules samt Folio-Counter, und Baseline-Rhythmus – sowohl auf @nuxt/content-gerendertes MDC-HTML (`.body-content p`, `.poem-body p`) als auch auf Component-eigene Hooks (`.page-title .title-author`, `.page-colophon .stanza`). Vue-Components tragen Tailwind-Utilities für Struktur, Font und Farbe; kein direktes pt/mm-Spacing in Templates.

Token-Vokabular ist asymmetrisch nach typografischer Wirklichkeit aufgesplittet:

- **`@theme` für Body-Register** (`text-meta`, `text-body-small`, `text-body`, `text-heading`) – atomare Size-Tokens, frei mit Family/Weight/Italic kombinierbar.
- **`@utility` für Display-Composites** (`text-display-cover|work|author`) – bündeln Family + Size + Leading, weil diese Rollen *Signaturen* sind. Weight bleibt separat: Cover-Author (Light) und Cover-Title (Bold) teilen sich dieselbe Display-Rolle bei unterschiedlichen Gewichten.

Folio: eigener `book-folio` Counter (nicht der UA-`page`), der erst ab Title incrementiert. Cover und Cover-Verso bleiben außerhalb des Buchblocks; `PageBlank` braucht eine `kind`-Prop (`cover-verso` / `title-verso`), die auf distinkte `@page`-Klassen routet.

## Verworfen

- **Alles in print.css, Tailwind raus.** Bespoke Klassennamen pro Element sind Memorier-Vokabular ohne Generalisierbarkeit.
- **Tailwind ohne `@theme`-Erweiterung.** `text-[22pt] leading-[1.2]`-arbitrary-value-Soup verliert die typografische Semantik.
- **Spacing-Tokens auch im Component-Template** (`mt-title-author`, `mb-stanza`). Baseline-Rhythmus bleibt zentralisiert in print.css, sonst nicht mehr auditierbar.
