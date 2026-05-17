<script setup lang="ts">
import { previousPublications } from '~/data/previous-publications'

const route = useRoute()
const year = String(route.params.year)
const currentYear = Number(year)

const { data: book } = await useAsyncData(`book-${year}`, () =>
  queryCollection('book').path(`/books/${year}`).first(),
)

if (!book.value) {
  throw createError({
    statusCode: 404,
    message: `Book ${year} not found`,
    fatal: true,
  })
}

const fullAuthor = `${book.value.authorFirst} ${book.value.authorLast}`
const roman = toRoman(book.value.year)
const earlierPublications = previousPublications.filter(
  (publication) => publication.year < currentYear,
)

const AUTHOR_GENITIVE_BY_GENDER = {
  m: 'des Autors',
  f: 'der Autorin',
  d: 'der lesenden Person',
} as const

const authorGenitive = AUTHOR_GENITIVE_BY_GENDER[book.value.authorGender]

if (import.meta.server) {
  useHead({
    title: `${fullAuthor} – ${book.value.title}`,
  })
}
</script>

<template>
  <article v-if="book" class="book">
    <PageCover :author="fullAuthor" :title="book.title" />
    <PageBlank kind="cover-verso" />
    <PageTitle
      :author-first="book.authorFirst"
      :author-last="book.authorLast"
      :title="book.title"
      :roman="roman"
    />
    <PageBlank kind="title-verso" />
    <PageBody>
      <ContentRenderer :value="book" />
    </PageBody>
    <PageList :publications="earlierPublications" />
    <PageColophon
      :ordinal="book.sequenceOrdinal"
      :editor="book.editor"
      :copies="book.copies"
      :reading-date="book.readingDate"
      :location="book.location"
      :author="fullAuthor"
      :author-genitive="authorGenitive"
    >
      <template v-if="book.colophonNote" #note>
        <MDC :value="book.colophonNote" tag="p" unwrap="p" />
      </template>
    </PageColophon>
  </article>
</template>
