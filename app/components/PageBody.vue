<script setup lang="ts">
import type { BookCollectionItem } from '@nuxt/content'

type Epigraph = NonNullable<BookCollectionItem['epigraph']>

defineProps<{
  epigraph?: Epigraph
}>()
</script>

<template>
  <section class="page-body">
    <div class="body-content">
      <div
        v-if="epigraph"
        class="epigraph"
        :data-align="epigraph.align ?? 'left'"
      >
        <MDC :value="epigraph.quote" tag="p" unwrap="p" class="quote" />
        <p class="attribution">
          {{ epigraph.authorName }},
          <span class="work">{{ epigraph.work }}</span>
        </p>
      </div>
      <slot />
    </div>
  </section>
</template>
