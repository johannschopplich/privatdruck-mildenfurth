<script setup lang="ts">
interface Epigraph {
  quote: string
  authorName: string
  work: string
  align?: 'left' | 'right'
}

defineProps<{
  epigraph?: Epigraph
}>()
</script>

<template>
  <section class="page-body">
    <div class="body-content">
      <div v-if="epigraph" class="epigraph" :data-align="epigraph.align ?? 'left'">
        <p class="quote" v-html="epigraph.quote.replace(/\*([^*]+)\*/g, '<em>$1</em>')" />
        <p class="attribution">
          {{ epigraph.authorName }}, <span class="work">{{ epigraph.work }}</span>
        </p>
      </div>
      <slot />
    </div>
  </section>
</template>
