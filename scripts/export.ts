import { existsSync } from 'node:fs'
import { mkdir, readdir, realpath, rm } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import process from 'node:process'
import { parseArgs } from 'node:util'
import * as clack from '@clack/prompts'
import * as ansis from 'ansis'
import { renderRoute } from './_lib/render.ts'

const root = resolve(import.meta.dirname, '..')
const booksDir = resolve(root, 'content/books')
const publicDir = resolve(root, '.output/public')

const { positionals } = parseArgs({ allowPositionals: true })

clack.intro('Privatdruck PDF Export')

const year = positionals[0] ?? (await findLatestYear(booksDir))
if (!year) {
  clack.cancel(`No books found in ${ansis.dim(relative(root, booksDir))}`)
  process.exit(1)
}

const routeFile = resolve(publicDir, year, 'index.html')
if (!existsSync(routeFile)) {
  clack.cancel(
    `No build output at ${ansis.dim(relative(root, routeFile))}. Run \`pnpm generate\` first.`,
  )
  process.exit(1)
}

const outFile = resolve(root, `exports/${year}.pdf`)
await mkdir(dirname(outFile), { recursive: true })
// Upfront, so a crashed run leaves no file rather than the previous PDF
// looking freshly exported. Past volumes are symlinks into the private content
// repo, so this deletes the link target and writes back through the link.
await rm(await realpath(outFile).catch(() => outFile), { force: true })

await renderRoute({
  publicDir,
  route: year,
  emulatePrint: true,
  render: async (page) => {
    await page.pdf({
      path: outFile,
      preferCSSPageSize: true,
      printBackground: true,
      // Chromium derives the bookmarks from the tagged structure tree, so
      // `outline` produces nothing on its own.
      outline: true,
      tagged: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })
  },
})

clack.outro(`PDF written to ${ansis.cyan(relative(root, outFile))}`)

async function findLatestYear(directory: string) {
  const entries = await readdir(directory)
  return entries
    .filter((name) => /^\d{4}\.md$/.test(name))
    .map((name) => name.slice(0, 4))
    .sort()
    .at(-1)
}
