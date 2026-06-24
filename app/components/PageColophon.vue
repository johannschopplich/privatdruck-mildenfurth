<script setup lang="ts">
defineProps<{
  ordinal: string
  editor: string
  copies: number
  readingDate: string
  location: string
  author: string
  authorGenitive: string
  printer: 'druckerei-oberreuter' | 'druckhaus-gera'
}>()

const slots = defineSlots<{
  imageCredit?: () => any
  note?: () => any
}>()
</script>

<template>
  <section
    class="page-colophon flex min-h-(--text-block-height) flex-col text-meta"
  >
    <div class="space-y-(--colophon-p-gap)">
      <p>
        {{ ordinal }} Privatdruck für den<br />
        Arbeitskreis Kunst und Kultur am Kloster Mildenfurth,<br />
        herausgegeben von {{ editor }}.
      </p>
      <p>
        Erschienen in {{ copies }} Exemplaren<br />
        zur Lesung {{ authorGenitive }} am {{ readingDate }}<br />
        im {{ location }}.
      </p>
      <p>
        Dieses Exemplar trägt die Nummer:<span
          class="inline-block w-[3.5em]"
        />/ {{ copies }}
      </p>
    </div>
    <div class="mt-auto space-y-(--colophon-p-gap)">
      <p>
        Gestaltung und Satz: Johann Schopplich<br />
        Gesetzt in Sirba sowie Trola<br />
        <template v-if="printer === 'druckerei-oberreuter'">
          Gedruckt in der
          <img
            src="/logo-druckerei.svg"
            alt=""
            class="ml-[0.275em] inline-block h-[1.4em] w-auto align-middle"
          />
          Druckerei Oberreuter, Zeulenroda-Triebes<br />
        </template>
        <template v-else-if="printer === 'druckhaus-gera'">
          Gedruckt im Druckhaus Gera GmbH<br />
        </template>
        auf Geese Papier ALSTER 150 bläulichweiß der Firma<br />
        <!-- eslint-disable vue/multiline-html-element-content-newline -->
        Ernst A. Geese GmbH, Henstedt-Ulzburg<template
          v-if="printer === 'druckhaus-gera'"
          >,<br />gebunden in der Druckerei Rüss, Potsdam.</template
        ><template v-else>.</template
        ><template v-if="!slots.imageCredit"
          ><br />Hergestellt im Eigenverlag.</template
        >
        <!-- eslint-enable vue/multiline-html-element-content-newline -->
      </p>
      <slot name="imageCredit" />
      <p v-if="slots.imageCredit">Hergestellt im Eigenverlag.</p>
      <p>
        Erstausgabe<br />
        © {{ author }}
      </p>
      <slot name="note" />
    </div>
  </section>
</template>
