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
    class="page-title flex flex-col text-right min-h-(--text-block-height)"
  >
    <h1 class="title-author text-display-author font-bold">
      {{ authorFirst }}<br />{{ authorLast }}
    </h1>
    <p class="title-work text-display-work">
      {{ title }}
    </p>
    <div class="title-imprint mt-auto">
      <p>Privatdruck</p>
      <p>Kloster Mildenfurth</p>
      <p>{{ roman }}</p>
    </div>
  </section>
</template>
