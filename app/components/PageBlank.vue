<script setup lang="ts">
defineProps<{
  kind: 'cover-verso' | 'title-verso' | 'frontispiece-verso'
}>()
</script>

<template>
  <section
    class="page-blank"
    :class="`page-blank-${kind}`"
    aria-hidden="true"
  />
</template>
