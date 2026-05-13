<script setup lang="ts">
import type { Publication } from '~/data/previous-publications'

defineProps<{
  publications: Publication[]
}>()
</script>

<template>
  <section class="page-list">
    <div class="list-block">
      <p class="list-heading">Bisher erschienen:</p>
      <table class="list-table">
        <tbody>
          <tr v-for="p in publications" :key="p.year">
            <td class="list-year">{{ p.year }}</td>
            <td class="list-author">{{ p.author }}</td>
            <td class="list-title">
              <div>{{ p.title }}</div>
              <div v-if="p.note" class="list-note">({{ p.note }})</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
