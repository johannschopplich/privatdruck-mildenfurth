<script setup lang="ts">
const props = defineProps<{
  author: string
  title: string
  roman: string
}>()

const authorParts = computed(() => {
  const trimmed = props.author.trim()
  const lastSpace = trimmed.lastIndexOf(' ')
  if (lastSpace < 0) {
    return { firstNames: trimmed, lastName: '' }
  }
  return {
    firstNames: trimmed.slice(0, lastSpace),
    lastName: trimmed.slice(lastSpace + 1),
  }
})
</script>

<template>
  <section class="page-title">
    <h1 class="title-author">
      {{ authorParts.firstNames }}<br v-if="authorParts.lastName" />{{
        authorParts.lastName
      }}
    </h1>
    <p class="title-work">
      {{ title }}
    </p>
    <div class="title-imprint">
      <p>Privatdruck</p>
      <p>Kloster Mildenfurth</p>
      <p>{{ roman }}</p>
    </div>
  </section>
</template>
