import { mkdir } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import process from 'node:process'
import * as clack from '@clack/prompts'
import * as ansis from 'ansis'
import { pathExists, renderRoute } from './_lib/render.ts'

const root = resolve(import.meta.dirname, '..')
const publicDir = resolve(root, '.output/public')
const outFile = resolve(root, '.github/og.png')

clack.intro('Privatdruck OG image')

if (!(await pathExists(publicDir))) {
  clack.cancel(
    `No build output at ${ansis.dim(relative(root, publicDir))}. Run \`pnpm generate\` first.`,
  )
  process.exit(1)
}

await mkdir(dirname(outFile), { recursive: true })

await renderRoute({
  publicDir,
  port: 4321,
  route: 'og',
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
  render: async (page, spinner) => {
    spinner.message('Rendering PNG')
    await page.locator('.og-canvas').screenshot({ path: outFile, type: 'png' })
    spinner.stop(`PNG written to ${ansis.cyan(relative(root, outFile))}`)
  },
})

clack.outro('Done.')
