<script setup lang="ts">
defineProps<{
  title?: string
  attribution?: string
  date?: string
}>()
</script>

<template>
  <div
    class="mb-[calc(var(--baseline)*1.5)] break-inside-avoid text-left hyphens-none last:mb-0"
  >
    <p v-if="attribution" class="italic">{{ attribution }}</p>
    <h2 v-if="title">{{ title }}</h2>
    <div class="poem-body">
      <slot />
    </div>
    <p v-if="date" class="mt-(--p-gap) text-meta">({{ date }})</p>
  </div>
</template>
