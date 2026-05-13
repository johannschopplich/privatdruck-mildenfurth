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

const roman = toRoman(book.value.year)
const earlierPublications = previousPublications.filter(
  (publication) => publication.year < currentYear,
)

useHead({
  title: `${book.value.author} – ${book.value.title}`,
  htmlAttrs: { lang: 'de' },
})
</script>

<template>
  <article v-if="book" class="book">
    <PageCover :author="book.author" :title="book.title" />
    <PageBlank />
    <PageTitle :author="book.author" :title="book.title" :roman="roman" />
    <PageBlank />
    <PageBody :epigraph="book.epigraph">
      <ContentRenderer :value="book" />
    </PageBody>
    <PageList :publications="earlierPublications" />
    <PageColophon
      :ordinal="book.sequenceOrdinal"
      :editor="book.editor"
      :copies="book.copies"
      :reading-date="book.readingDate"
      :location="book.location"
      :author="book.author"
    />
  </article>
</template>
