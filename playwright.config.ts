import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: 'tests',
  reporter: 'list',
  use: { baseURL: 'http://localhost:4321', trace: 'off' },
  webServer: { command: 'npx astro preview --port 4321', url: 'http://localhost:4321', reuseExistingServer: true, timeout: 60_000 },
});
