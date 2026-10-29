import { defineConfig, devices } from '@playwright/test'

/**
 * Component tests run against the real stories in a real browser.
 *
 * Port 6011 rather than Storybook's default 6006, so a Storybook already
 * running for another project on this machine is left alone.
 *
 * Paths here resolve from this file's folder, so each one climbs back to the
 * repository root, where the stories, the specs and the reports belong.
 */
const PORT = Number(process.env.STORYBOOK_PORT ?? 6011)

export default defineConfig({
  testDir: '../tests/e2e',
  outputDir: '../test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `npx storybook dev -c config/storybook -p ${PORT} --no-open --ci`,
    cwd: '..',
    url: `http://localhost:${PORT}/index.json`,
    reuseExistingServer: true,
    timeout: 180_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
})
