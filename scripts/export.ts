import { spawn } from 'node:child_process'
import { access, mkdir, readdir } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import process from 'node:process'
import { setTimeout as delay } from 'node:timers/promises'
import { parseArgs } from 'node:util'
import * as clack from '@clack/prompts'
import * as ansis from 'ansis'
import { chromium } from 'playwright'

const STATIC_SERVER_PORT = 4321
const SERVER_READY_TIMEOUT_MS = 10_000

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

const previewServer = spawn(
  'pnpm',
  [
    'exec',
    'serve',
    '-l',
    String(STATIC_SERVER_PORT),
    '--no-clipboard',
    publicDir,
  ],
  { cwd: root, stdio: 'ignore' },
)

const spinner = clack.spinner()
spinner.start(`Starting static server on port ${STATIC_SERVER_PORT}`)

try {
  await waitForServer(
    `http://localhost:${STATIC_SERVER_PORT}/`,
    SERVER_READY_TIMEOUT_MS,
  )

  spinner.message('Launching Chromium')
  const browser = await chromium.launch()
  const page = await browser.newPage()

  const chromiumLabel = ansis.dim('[chromium]')
  page.on('pageerror', (error) =>
    clack.log.error(`${chromiumLabel} ${error.message}`),
  )
  page.on('console', (message) => {
    if (message.type() === 'error')
      clack.log.error(`${chromiumLabel} ${message.text()}`)
  })

  spinner.message(`Navigating to /${year}`)
  await page.emulateMedia({ media: 'print' })
  await page.goto(`http://localhost:${STATIC_SERVER_PORT}/${year}`, {
    waitUntil: 'networkidle',
  })

  spinner.message('Waiting for fonts')
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve())),
  )

  spinner.message('Rendering PDF')
  await page.pdf({
    path: outFile,
    preferCSSPageSize: true,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })

  await browser.close()
  spinner.stop(`PDF written to ${ansis.cyan(relative(root, outFile))}`)
} finally {
  previewServer.kill()
}

clack.outro('Done.')

async function findLatestYear(directory: string) {
  const entries = await readdir(directory)
  return entries
    .filter((name) => /^\d{4}\.md$/.test(name))
    .map((name) => name.slice(0, 4))
    .sort()
    .at(-1)
}

async function waitForServer(url: string, timeoutMs: number) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {}
    await delay(100)
  }
  throw new Error(`Static server did not respond within ${timeoutMs}ms`)
}

async function pathExists(targetPath: string) {
  try {
    await access(targetPath)
    return true
  } catch {
    return false
  }
}
