import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    book: defineCollection({
      type: 'page',
      source: 'books/*.md',
      schema: z.object({
        year: z.number(),
        authorFirst: z.string(),
        authorLast: z.string(),
        authorGender: z.enum(['m', 'f', 'd']),
        title: z.string(),
        subtitle: z.string().optional(),
        copies: z.number(),
        readingDate: z.string(),
        location: z.string(),
        editor: z.string(),
        sequenceOrdinal: z.string(),
        printer: z.enum(['druckerei-oberreuter', 'druckhaus-gera']),
        colophonNote: z.string().optional(),
        frontispiece: z
          .object({
            image: z.string(),
            title: z.string(),
            artist: z.string(),
            year: z.number(),
            credit: z.string(),
          })
          .optional(),
      }),
    }),
  },
})
