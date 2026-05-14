<script setup lang="ts">
defineProps<{
  author: string
  title: string
}>()
</script>

<template>
  <section class="page-cover relative overflow-hidden w-(--trim-w) h-(--trim-h)">
    <div class="cover-canvas">
      <p class="cover-author text-display-cover font-light whitespace-nowrap">
        {{ author }}
      </p>
      <h1 class="cover-title text-display-cover font-bold whitespace-nowrap">
        {{ title }}
      </h1>
    </div>
  </section>
</template>
