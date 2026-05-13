<script setup lang="ts">
defineProps<{
  author: string
  title: string
}>()
</script>

<template>
  <section class="page-cover">
    <div class="cover-canvas">
      <p class="cover-author">{{ author }}</p>
      <h1 class="cover-title">{{ title }}</h1>
    </div>
  </section>
</template>
