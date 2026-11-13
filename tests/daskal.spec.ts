import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { load } from 'js-yaml';

const d = load(readFileSync('content/daskal.yml', 'utf8')) as any;
const site = load(readFileSync('content/site.yml', 'utf8')) as any;
const tabs = d.install.tabs;

test('install tabs follow the WAI-ARIA pattern (click and keyboard)', async ({ page }) => {
  await page.goto('/daskal/');
  const tab = page.getByRole('tab');
  await expect(tab).toHaveCount(tabs.length);
  await expect(page.getByRole('tabpanel')).toHaveCount(1); // only the selected panel is visible
  await expect(tab.first()).toHaveAttribute('aria-selected', 'true');
  await tab.first().focus();
  await page.keyboard.press('ArrowRight');
  await expect(tab.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(tab.nth(1)).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText(tabs[1].availability);
  await page.keyboard.press('End');
  await expect(tab.last()).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('ArrowRight'); // wraps to the first
  await expect(tab.first()).toHaveAttribute('aria-selected', 'true');
  await tab.nth(2).click();
  await expect(page.getByRole('tabpanel')).toContainText(tabs[2].steps[0]);
});

test('without JavaScript every install panel is visible', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/daskal/');
  await expect(page.locator('[role="tablist"]')).toBeHidden();
  for (const t of tabs) await expect(page.locator(`#install-tabs-panel-${t.key}`)).toBeVisible();
  await ctx.close();
});

test('copy buttons copy the exact command', async ({ browser }) => {
  const ctx = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await ctx.newPage();
  await page.goto('/daskal/');
  const cc = tabs.find((t: any) => t.copy_blocks);
  await page.getByRole('tab', { name: cc.label }).click();
  const btn = page.getByRole('tabpanel').locator('[data-copy] button').first();
  await btn.click();
  await expect(btn).toHaveText(site.ui.copied.bg);
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(cc.copy_blocks[0]);
  await ctx.close();
});

test('download and repo links, Phase 2 entry points', async ({ page }) => {
  await page.goto('/daskal/');
  await expect(page.locator(`a[href="${d.package.zip}"]`)).toHaveCount(1);
  await expect(page.locator(`a[href="${d.package.repo}"]`)).toHaveCount(1);
  await expect(page.locator(`main a[href="${d.support.href}"]`)).toHaveCount(1);
  // nav item and landing banner
  await page.goto('/');
  await expect(page.locator('header a[href="/daskal/"]')).toHaveCount(1);
  const banner = page.locator('.daskal-banner');
  await expect(banner).toHaveAttribute('href', '/daskal/');
  // first thing on the landing page: above the header
  expect((await banner.boundingBox())!.y).toBeLessThan((await page.locator('header').boundingBox())!.y);
  // landing page only
  for (const p of ['/schools/', '/companies/', '/resume/', '/support/', '/daskal/']) {
    await page.goto(p);
    await expect(page.locator('.daskal-banner')).toHaveCount(0);
  }
});

test('404 page mentions Daskal AI first', async ({ page }) => {
  await page.goto('/old-daskal-path/');
  const first = page.locator('main .dk-first').first();
  await expect(first).toContainText(site.pages.not_found.daskal);
  await expect(first.locator('a')).toHaveAttribute('href', '/daskal/');
  const yFirst = (await first.boundingBox())!.y;
  const yH1 = (await page.locator('main h1').boundingBox())!.y;
  expect(yFirst).toBeLessThan(yH1);
});

test('legacy daskal.ai paths redirect from the 404 page', async ({ page }) => {
  const entries = Object.entries(d.legacy_redirects.paths ?? {}) as [string, string][];
  test.skip(entries.length === 0, 'no legacy paths (Angel, 13 Nov 2026): old daskal.ai paths land on the 404 page');
  for (const [from, to] of entries) {
    await page.goto(from);
    await page.waitForURL((u) => u.pathname === new URL(to, 'http://x').pathname, { timeout: 2000 });
  }
});
