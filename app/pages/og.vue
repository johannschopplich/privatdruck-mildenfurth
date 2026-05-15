<script setup lang="ts">
const YEAR = 2026

const { data } = await useAsyncData(`og-book-${YEAR}`, () =>
  queryCollection('book').path(`/books/${YEAR}`).first(),
)

if (!data.value) {
  throw createError({
    statusCode: 404,
    message: `Book ${YEAR} not found`,
    fatal: true,
  })
}

const fullAuthor = computed(
  () => `${data.value!.authorFirst} ${data.value!.authorLast}`,
)
const yearRoman = computed(() => toRoman(data.value!.year))

if (import.meta.server) {
  useHead({
    title: 'Privatdruck Mildenfurth',
  })
}
</script>

<template>
  <div class="h-[630px] w-[1200px]">
    <div
      class="og-canvas relative flex h-[630px] w-[1200px] overflow-hidden bg-og-wrapper font-serif text-og-ink before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:bg-[url(/og-grain.svg)] before:opacity-[0.55] before:mix-blend-multiply before:content-['']"
    >
      <div class="relative z-2 grid flex-1 place-items-center p-16">
        <div class="text-center">
          <p class="font-display text-[26pt]/[1.25] tracking-[0.005em]">
            Privatdruck
          </p>
          <p class="font-display text-[26pt]/[1.25] tracking-[0.005em]">
            Kloster Mildenfurth
          </p>
          <hr
            class="mx-auto mt-[18px] mb-[12px] w-16 border-0 border-t-[0.75pt] border-current opacity-85"
          />
          <p
            class="font-display text-[13pt] leading-none tracking-[0.15em] uppercase [font-variant-numeric:oldstyle-nums]"
          >
            {{ yearRoman }}
          </p>
        </div>
      </div>

      <div
        class="relative z-3 grid w-20 [place-items:end_center] bg-og-paper py-9 shadow-og-inset"
      >
        <div
          class="flex flex-row items-center font-display leading-none whitespace-nowrap text-og-ink [writing-mode:sideways-lr]"
        >
          <p class="me-[1.6em] text-[18pt] font-light">{{ fullAuthor }}</p>
          <h1 class="text-[18pt] font-bold">{{ data!.title }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>
