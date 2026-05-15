import type { Page } from 'playwright'
import { access } from 'node:fs/promises'
import * as clack from '@clack/prompts'
import * as ansis from 'ansis'
import { chromium } from 'playwright'
import { serve } from 'srvx'
import { serveStatic } from 'srvx/static'

export interface RenderOptions {
  publicDir: string
  port: number
  route: string
  viewport?: { width: number; height: number }
  deviceScaleFactor?: number
  emulatePrint?: boolean
  render: (page: Page, spinner: clack.SpinnerResult) => Promise<void>
}

export async function renderRoute(options: RenderOptions) {
  const spinner = clack.spinner()
  spinner.start(`Starting static server on port ${options.port}`)

  const previewServer = serve({
    port: options.port,
    middleware: [serveStatic({ dir: options.publicDir })],
    fetch: () => new Response('Not found', { status: 404 }),
  })

  try {
    await previewServer.ready()

    spinner.message('Launching Chromium')
    const browser = await chromium.launch()
    const page = await browser.newPage({
      viewport: options.viewport,
      deviceScaleFactor: options.deviceScaleFactor,
    })

    const chromiumLabel = ansis.dim('[chromium]')
    page.on('pageerror', (error) =>
      clack.log.error(`${chromiumLabel} ${error.message}`),
    )
    page.on('console', (message) => {
      if (message.type() === 'error')
        clack.log.error(`${chromiumLabel} ${message.text()}`)
    })

    if (options.emulatePrint) await page.emulateMedia({ media: 'print' })

    spinner.message(`Navigating to /${options.route}`)
    await page.goto(new URL(options.route, previewServer.url).href, {
      waitUntil: 'networkidle',
    })

    spinner.message('Waiting for fonts')
    await page.evaluate(() => document.fonts.ready)
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => requestAnimationFrame(() => resolve())),
    )

    await options.render(page, spinner)

    await browser.close()
  } finally {
    await previewServer.close(true)
  }
}

export async function pathExists(targetPath: string) {
  try {
    await access(targetPath)
    return true
  } catch {
    return false
  }
}
