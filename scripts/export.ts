import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const year = process.argv[2] ?? '2025'
const outFile = resolve(root, `exports/${year}.pdf`)

await mkdir(dirname(outFile), { recursive: true })

const port = 4321

const publicDir = resolve(root, '.output/public')
console.log(`[export] Serving ${publicDir} on port ${port}…`)
const preview = spawn('pnpm', ['exec', 'serve', '-l', String(port), '--no-clipboard', publicDir], {
  cwd: root,
  stdio: ['ignore', 'pipe', 'pipe'],
})

const ready = new Promise<void>((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error('Static server did not start within 15s')), 15_000)
  const onData = (buf: Buffer) => {
    const text = buf.toString()
    process.stdout.write(text)
    if (text.includes(`localhost:${port}`) || text.includes('Accepting connections')) {
      clearTimeout(timeout)
      resolve()
    }
  }
  preview.stdout?.on('data', onData)
  preview.stderr?.on('data', onData)
  preview.on('exit', code => reject(new Error(`Static server exited early with code ${code}`)))
})

try {
  await ready
  await new Promise(r => setTimeout(r, 1000))

  console.log('[export] Launching Chromium…')
  const browser = await chromium.launch()
  const page = await browser.newPage()

  page.on('console', msg => console.log(`[chrome ${msg.type()}]`, msg.text()))
  page.on('pageerror', err => console.log('[chrome pageerror]', err.message))

  const url = `http://localhost:${port}/${year}`
  console.log(`[export] Navigating to ${url}`)
  await page.emulateMedia({ media: 'print' })
  await page.goto(url, { waitUntil: 'networkidle' })

  console.log('[export] Waiting for fonts…')
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => r(null))))

  console.log(`[export] Rendering PDF → ${outFile}`)
  await page.pdf({
    path: outFile,
    preferCSSPageSize: true,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })

  await browser.close()
  console.log('[export] Done.')
}
finally {
  preview.kill()
}
