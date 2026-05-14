<script setup lang="ts">
defineProps<{
  authorFirst: string
  authorLast: string
  title: string
  roman: string
}>()
</script>

<template>
  <section class="page-title">
    <h1 class="title-author text-display-author font-bold">
      {{ authorFirst }}<br />{{ authorLast }}
    </h1>
    <p class="title-work text-display-work">
      {{ title }}
    </p>
    <div class="title-imprint">
      <p>Privatdruck</p>
      <p>Kloster Mildenfurth</p>
      <p>{{ roman }}</p>
    </div>
  </section>
</template>
