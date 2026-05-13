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
    statusMessage: `Book ${year} not found`,
    fatal: true,
  })
}

const fullAuthor = `${book.value.authorFirst} ${book.value.authorLast}`
const roman = toRoman(book.value.year)
const earlierPublications = previousPublications.filter(
  (publication) => publication.year < currentYear,
)

useHead({
  title: `${fullAuthor} – ${book.value.title}`,
  htmlAttrs: { lang: 'de' },
})
</script>

<template>
  <article v-if="book" class="book">
    <PageCover :author="fullAuthor" :title="book.title" />
    <PageBlank />
    <PageTitle
      :author-first="book.authorFirst"
      :author-last="book.authorLast"
      :title="book.title"
      :roman="roman"
    />
    <PageBlank />
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
    />
  </article>
</template>
