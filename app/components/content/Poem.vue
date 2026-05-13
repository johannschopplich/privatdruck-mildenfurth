<script setup lang="ts">
defineProps<{
  title?: string
  date?: string
}>()
</script>

<template>
  <div class="poem">
    <h2 v-if="title" class="poem-title">{{ title }}</h2>
    <div class="poem-body">
      <slot />
    </div>
    <p v-if="date" class="poem-date">({{ date }})</p>
  </div>
</template>
