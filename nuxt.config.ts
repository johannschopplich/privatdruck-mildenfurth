import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/content'],

  compatibilityDate: '2026-01-01',

  nitro: {
    prerender: {
      routes: ['/2025', '/2026'],
      crawlLinks: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  hooks: {
    'prepare:types': ({ nodeTsConfig }) => {
      nodeTsConfig.include ||= []
      nodeTsConfig.include.push('../scripts/**/*')
    },
  },
})
