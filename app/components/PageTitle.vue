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
    <h1 class="mt-(--title-author-offset) text-display-author">
      {{ authorFirst }}<br />{{ authorLast }}
    </h1>
    <p class="mt-(--title-work-offset) text-display-work">
      {{ title }}
    </p>
    <div class="mt-auto text-meta leading-apparatus tracking-widest uppercase">
      <div class="inline-block">
        <hr
          class="w-full border-x-0 border-t-[0.5pt] border-b-0 border-black"
        />
        <p class="mt-(--p-gap)">Privatdruck</p>
        <p>Kloster Mildenfurth</p>
        <p class="mt-[calc(var(--baseline)*0.5)]">{{ roman }}</p>
      </div>
    </div>
  </section>
</template>
