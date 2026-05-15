<script setup lang="ts">
defineProps<{
  author: string
  title: string
}>()
</script>

<template>
  <section
    class="page-cover relative h-(--trim-h) w-(--trim-w) overflow-hidden"
  >
    <div
      class="absolute inset-0 box-border flex flex-row items-end justify-end pt-(--bottom-margin) pr-(--cover-edge) [writing-mode:sideways-lr]"
    >
      <p class="me-[2em] text-display-cover font-light whitespace-nowrap">
        {{ author }}
      </p>
      <h1 class="text-display-cover font-bold whitespace-nowrap">
        {{ title }}
      </h1>
    </div>
  </section>
</template>
