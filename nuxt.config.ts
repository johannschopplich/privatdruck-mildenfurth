import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/content'],

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2026-01-01',

  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },

  nitro: {
    prerender: {
      routes: ['/2025', '/2026', '/og'],
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
      nodeTsConfig.compilerOptions ||= {}
      nodeTsConfig.compilerOptions.allowImportingTsExtensions = true
    },
  },
})
