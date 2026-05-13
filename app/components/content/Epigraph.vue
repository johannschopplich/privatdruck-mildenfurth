<script setup lang="ts">
defineProps<{
  authorName: string
  work: string
  align?: 'left' | 'right'
}>()
</script>

<template>
  <div class="epigraph" :data-align="align">
    <blockquote class="quote">
      <slot />
    </blockquote>
    <p class="attribution">
      {{ authorName }},
      <cite>{{ work }}</cite>
    </p>
  </div>
</template>
