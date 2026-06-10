<script setup lang="ts">
defineProps<{
  frontispiece: {
    image: string
    title: string
    artist: string
    year: number
    credit: string
  }
}>()
</script>

<template>
  <section
    class="page-frontispiece flex min-h-(--text-block-height) flex-col items-center justify-center"
  >
    <figure class="m-0 flex flex-col items-center">
      <img
        :src="frontispiece.image"
        alt=""
        class="max-h-[calc(var(--text-block-height)-var(--baseline)*4)] w-auto max-w-full object-contain"
      />
      <figcaption class="mt-(--baseline) text-center text-meta">
        <cite class="italic">{{ frontispiece.title }}</cite
        ><br />
        {{ frontispiece.artist }} · {{ frontispiece.year }}
      </figcaption>
    </figure>
  </section>
</template>
