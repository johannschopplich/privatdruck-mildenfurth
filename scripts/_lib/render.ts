import type { Page } from 'playwright'
import * as clack from '@clack/prompts'
import * as ansis from 'ansis'
import { chromium } from 'playwright'
import { serve } from 'srvx'
import { serveStatic } from 'srvx/static'

export interface RenderOptions {
  publicDir: string
  route: string
  viewport?: { width: number; height: number }
  deviceScaleFactor?: number
  emulatePrint?: boolean
  render: (page: Page) => Promise<void>
}

/**
 * Renders `route` from the static build in Chromium. Throws if any resource
 * failed to load, so no artifact is written in fallback fonts.
 */
export async function renderRoute(options: RenderOptions) {
  const spinner = clack.spinner()
  spinner.start('Starting static server')

  const previewServer = serve({
    port: 0,
    hostname: 'localhost',
    middleware: [serveStatic({ dir: options.publicDir })],
    fetch: () => new Response('Not found', { status: 404 }),
  })

  try {
    await previewServer.ready()

    spinner.message('Launching Chromium')
    const browser = await chromium.launch()

    try {
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

      const failedRequests: string[] = []
      page.on('requestfailed', (request) => {
        failedRequests.push(
          `${request.url()} – ${request.failure()?.errorText ?? 'unknown error'}`,
        )
      })

      // `page.pdf()` emulates print itself, but the media type has to be set
      // before navigation so that `@media print` font declarations are in
      // effect while `document.fonts.ready` settles.
      if (options.emulatePrint) await page.emulateMedia({ media: 'print' })

      spinner.message(`Navigating to /${options.route}`)
      await page.goto(new URL(options.route, previewServer.url).href)

      spinner.message('Waiting for fonts')
      await page.evaluate(async () => {
        await document.fonts.ready
        // Two frames: the first schedules the paint, the second runs after it.
        await new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        )
      })

      if (failedRequests.length > 0) {
        throw new Error(
          `${failedRequests.length} resource(s) failed to load:\n${failedRequests.map((entry) => `  ${entry}`).join('\n')}`,
        )
      }

      spinner.message('Rendering')
      await options.render(page)
      spinner.stop(`Rendered /${options.route}`)
    } catch (error) {
      spinner.error('Render failed')
      throw error
    } finally {
      await browser.close()
    }
  } finally {
    await previewServer.close(true)
  }
}
