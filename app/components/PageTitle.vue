<script setup lang="ts">
defineProps<{
  authorFirst: string
  authorLast: string
  title: string
  roman: string
}>()
</script>

<template>
  <section
    class="page-title flex min-h-(--text-block-height) flex-col text-right"
  >
    <h1 class="mt-(--title-author-offset) text-display-author font-semibold">
      {{ authorFirst }}<br />{{ authorLast }}
    </h1>
    <p class="mt-(--title-work-offset) text-display-work">
      {{ title }}
    </p>
    <div class="mt-auto leading-apparatus">
      <p>Privatdruck</p>
      <p>Kloster Mildenfurth</p>
      <p class="mt-[calc(var(--baseline)*0.25)]">{{ roman }}</p>
    </div>
  </section>
</template>
