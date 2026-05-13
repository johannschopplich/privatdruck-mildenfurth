<script setup lang="ts">
defineProps<{
  ordinal: string
  editor: string
  copies: number
  readingDate: string
  location: string
  author: string
}>()
</script>

<template>
  <section class="page-colophon">
    <div class="colophon-upper">
      <p class="stanza">
        {{ ordinal }} Privatdruck für den<br>
        Arbeitskreis Kunst und Kultur am Kloster Mildenfurth,<br>
        herausgegeben von {{ editor }}.
      </p>
      <p class="stanza">
        Erschienen in {{ copies }} Exemplaren<br>
        zur Lesung der Autorin am {{ readingDate }}<br>
        im {{ location }}.<br>
        Dieses Exemplar trägt die Nummer:<span class="copy-number-blank" />/ {{ copies }}
      </p>
    </div>
    <div class="colophon-lower">
      <p class="stanza">
        Gestaltung und Satz: Stube Umlauts GbR<br>
        Gesetzt in Sirba sowie Trola (Deckblatt)<br>
        Gedruckt in der <img src="/logo-druckerei.svg" alt="" class="colophon-logo"> Druckerei Oberreuter/Zeulenroda-Triebes<br>
        auf Geese Papier ALSTER 150 bläulichweiß der Firma<br>
        Ernst A. Geese GmbH, Henstedt-Ulzburg.<br>
        Hergestellt im Eigenverlag.
      </p>
      <p class="stanza">
        Erstausgabe<br>
        © {{ author }}
      </p>
    </div>
  </section>
</template>
