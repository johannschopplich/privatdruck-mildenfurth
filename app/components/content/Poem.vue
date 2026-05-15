<script setup lang="ts">
defineProps<{
  title?: string
  attribution?: string
  date?: string
}>()
</script>

<template>
  <div
    class="poem mb-(--gap-stanza) last:mb-0 break-inside-avoid text-left hyphens-none"
  >
    <p v-if="attribution" class="text-meta">{{ attribution }}</p>
    <h2 v-if="title">{{ title }}</h2>
    <div class="poem-body">
      <slot />
    </div>
    <p v-if="date" class="mt-(--p-gap) text-meta">({{ date }})</p>
  </div>
</template>
