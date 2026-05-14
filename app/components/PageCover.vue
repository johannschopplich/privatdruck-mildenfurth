<script setup lang="ts">
defineProps<{
  author: string
  title: string
}>()
</script>

<template>
  <section class="page-cover">
    <div class="cover-canvas">
      <p class="cover-author text-display-cover font-light">{{ author }}</p>
      <h1 class="cover-title text-display-cover font-bold">{{ title }}</h1>
    </div>
  </section>
</template>
