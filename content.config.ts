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
        title: z.string(),
        subtitle: z.string().optional(),
        copies: z.number(),
        readingDate: z.string(),
        location: z.string(),
        editor: z.string(),
        sequenceOrdinal: z.string(),
        epigraph: z
          .object({
            quote: z.string(),
            authorName: z.string(),
            work: z.string(),
            align: z.enum(['left', 'right']).optional(),
          })
          .optional(),
      }),
    }),
  },
})
