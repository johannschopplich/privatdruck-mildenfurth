import { mkdir, readdir } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import process from 'node:process'
import { parseArgs } from 'node:util'
import * as clack from '@clack/prompts'
import * as ansis from 'ansis'
import { pathExists, renderRoute } from './_lib/render.ts'

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

if (!(await pathExists(publicDir))) {
  clack.cancel(
    `No build output at ${ansis.dim(relative(root, publicDir))}. Run \`pnpm generate\` first.`,
  )
  process.exit(1)
}

const outFile = resolve(root, `exports/${year}.pdf`)
await mkdir(dirname(outFile), { recursive: true })

await renderRoute({
  publicDir,
  port: 4321,
  route: year,
  emulatePrint: true,
  render: async (page, spinner) => {
    spinner.message('Rendering PDF')
    await page.pdf({
      path: outFile,
      preferCSSPageSize: true,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })
    spinner.stop(`PDF written to ${ansis.cyan(relative(root, outFile))}`)
  },
})

clack.outro('Done.')

async function findLatestYear(directory: string) {
  const entries = await readdir(directory)
  return entries
    .filter((name) => /^\d{4}\.md$/.test(name))
    .map((name) => name.slice(0, 4))
    .sort()
    .at(-1)
}
