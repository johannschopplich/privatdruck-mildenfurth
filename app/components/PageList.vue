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
  const embeddedTitleRegex = /\*([^*]+)\*/g
  let lastIndex = 0
  let regexMatch: RegExpExecArray | null = embeddedTitleRegex.exec(text)
  while (regexMatch !== null) {
    if (regexMatch.index > lastIndex) {
      parts.push({
        kind: 'text',
        value: text.slice(lastIndex, regexMatch.index),
      })
    }
    parts.push({ kind: 'title', value: regexMatch[1]! })
    lastIndex = embeddedTitleRegex.lastIndex
    regexMatch = embeddedTitleRegex.exec(text)
  }
  if (lastIndex < text.length) {
    parts.push({ kind: 'text', value: text.slice(lastIndex) })
  }
  return parts
}
</script>

<template>
  <section class="page-list">
    <div class="list-block">
      <p class="list-heading">Bisher erschienen:</p>
      <table class="list-table">
        <tbody>
          <tr
            v-for="publication in publications"
            :key="`${publication.year}-${publication.author}`"
          >
            <td class="list-year">{{ publication.year }}</td>
            <td class="list-author">{{ publication.author }}</td>
            <td class="list-title">
              <div>
                <!-- eslint-disable vue/multiline-html-element-content-newline -->
                <component
                  :is="part.kind === 'title' ? 'cite' : 'span'"
                  v-for="(part, index) in renderTitle(publication)"
                  :key="index"
                  >{{ part.value }}</component
                >
                <!-- eslint-enable vue/multiline-html-element-content-newline -->
              </div>
              <div v-if="publication.note" class="list-note">
                ({{ publication.note }})
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
