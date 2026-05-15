<script setup lang="ts">
import '~/assets/css/main.css'

if (import.meta.server) {
  useHead({
    htmlAttrs: { lang: 'de' },
  })
}
</script>

<template>
  <NuxtPage />
</template>
