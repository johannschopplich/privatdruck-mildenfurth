<script setup lang="ts">
defineProps<{
  authorName: string
  work: string
  align?: 'left' | 'right'
}>()
</script>

<template>
  <div
    class="mb-[calc(var(--baseline)*2)] hyphens-none"
    :class="[align === 'right' && 'text-right']"
  >
    <blockquote class="quote mb-[6pt] hyphens-none">
      <slot />
    </blockquote>
    <p class="m-0">
      {{ authorName }},
      <cite class="italic">{{ work }}</cite>
    </p>
  </div>
</template>
