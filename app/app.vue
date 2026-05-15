<script setup lang="ts">
if (import.meta.server) {
  useHead({
    htmlAttrs: { lang: 'de' },
  })
}
</script>

<template>
  <NuxtPage />
</template>
