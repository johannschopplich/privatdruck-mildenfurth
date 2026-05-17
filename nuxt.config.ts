import * as fsp from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'

const booksDir = resolve(import.meta.dirname, 'content/books')

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
      routes: ['/og'],
      crawlLinks: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  hooks: {
    'prerender:routes': async function (ctx) {
      const entries = await fsp.readdir(booksDir)
      for (const name of entries) {
        if (!/^\d{4}\.md$/.test(name)) continue
        // Skip dangling symlinks
        try {
          await fsp.access(resolve(booksDir, name))
        } catch {
          continue
        }
        ctx.routes.add(`/${basename(name, '.md')}`)
      }
    },
    'prepare:types': ({ nodeTsConfig }) => {
      nodeTsConfig.include ||= []
      nodeTsConfig.include.push('../scripts/**/*')
      nodeTsConfig.compilerOptions ||= {}
      nodeTsConfig.compilerOptions.allowImportingTsExtensions = true
    },
  },
})
