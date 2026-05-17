<script setup lang="ts">
import type { Publication } from '~/data/previous-publications'

defineProps<{
  publications: Publication[]
}>()

interface TitlePart {
  kind: 'text' | 'title'
  value: string
}

function renderTitle(publication: Publication): TitlePart[] {
  const parts: TitlePart[] = [{ kind: 'title', value: publication.title }]
  if (publication.supplement) {
    parts.push({ kind: 'text', value: ' ' })
    parts.push(...parseSupplement(publication.supplement))
  }
  return parts
}

function parseSupplement(text: string): TitlePart[] {
  const parts: TitlePart[] = []
  let lastIndex = 0

  for (const match of text.matchAll(/\*([^*]+)\*/g)) {
    if (match.index > lastIndex) {
      parts.push({ kind: 'text', value: text.slice(lastIndex, match.index) })
    }
    parts.push({ kind: 'title', value: match[1]! })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push({ kind: 'text', value: text.slice(lastIndex) })
  }

  return parts
}
</script>

<template>
  <section class="page-list">
    <div>
      <p class="mb-(--h-gap) text-display-heading">Bisher erschienen</p>
      <table
        class="w-full border-collapse leading-apparatus lining-nums tabular-nums [&_td]:pb-[2pt] [&_td]:align-top"
      >
        <tbody>
          <tr
            v-for="publication in publications"
            :key="`${publication.year}-${publication.author}`"
          >
            <td class="pe-[1.5em] tracking-tight whitespace-nowrap">
              {{ publication.year }}
            </td>
            <td class="pe-[1.5em] whitespace-nowrap">
              {{ publication.author }}
            </td>
            <td>
              <div class="whitespace-pre-line">
                <!-- eslint-disable vue/multiline-html-element-content-newline -->
                <component
                  :is="part.kind === 'title' ? 'cite' : 'span'"
                  v-for="(part, index) in renderTitle(publication)"
                  :key="index"
                  :class="part.kind === 'title' ? 'italic' : undefined"
                  >{{ part.value }}</component
                >
                <!-- eslint-enable vue/multiline-html-element-content-newline -->
              </div>
              <div v-if="publication.note" class="text-meta">
                ({{ publication.note }})
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
