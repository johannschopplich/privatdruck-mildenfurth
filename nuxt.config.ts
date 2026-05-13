import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
  ],

  css: [
    '~/assets/css/main.css',
  ],

  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  nitro: {
    prerender: {
      routes: ['/2025', '/2026'],
      crawlLinks: false,
      failOnError: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
