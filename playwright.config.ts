import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: 'tests',
  reporter: 'list',
  // Bulgarian browser by default, so the one-time language bar stays out of the way; tests/i18n.spec.ts covers it.
  use: { baseURL: 'http://localhost:4321', trace: 'off', locale: 'bg-BG' },
  webServer: { command: 'npx astro preview --port 4321', url: 'http://localhost:4321', reuseExistingServer: true, timeout: 60_000 },
});
