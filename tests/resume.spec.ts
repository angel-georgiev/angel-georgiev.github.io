import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { load } from 'js-yaml';

const r = load(readFileSync('content/resume.yml', 'utf8')) as any;
const total = r.archive.items.length;

test('archive: every item renders, all visible without JavaScript', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/resume/');
  await expect(page.locator('#archive .row')).toHaveCount(total);
  await expect(page.locator('#archive .row:visible')).toHaveCount(total);
  await expect(page.locator('[data-filterbar]')).toBeHidden();
  await ctx.close();
});

test('archive: search, chips, hidden years and empty state', async ({ page }) => {
  await page.goto('/resume/');
  await expect(page.locator('[data-filterbar]')).toBeVisible();
  // Chip filter: awards only
  await page.locator('.chip[data-type="award"]').click();
  const awards = r.archive.items.filter((i: any) => i.type === 'award').length;
  await expect(page.locator('#archive .row:visible')).toHaveCount(awards);
  await expect(page.locator('#archive .row:visible .tag')).toHaveText(Array(awards).fill(r.archive.filters.find((f: any) => f.key === 'award').label));
  // Back to all, then search (case-insensitive, title + outlet)
  await page.locator('.chip[data-type="all"]').click();
  await page.locator('[data-q]').fill('BLOOMBERG');
  const expected = r.archive.items.filter((i: any) => `${i.title} ${i.outlet}`.toLowerCase().includes('bloomberg')).length;
  expect(expected).toBeGreaterThan(0);
  await expect(page.locator('#archive .row:visible')).toHaveCount(expected);
  // Years with no visible rows are hidden
  const visibleYears = await page.locator('[data-year]:visible').count();
  const yearsExpected = new Set(r.archive.items.filter((i: any) => `${i.title} ${i.outlet}`.toLowerCase().includes('bloomberg')).map((i: any) => i.year)).size;
  expect(visibleYears).toBe(yearsExpected);
  // No match → empty message
  await page.locator('[data-q]').fill('zzzz-no-such-item');
  await expect(page.locator('#archive .row:visible')).toHaveCount(0);
  await expect(page.locator('[data-empty]')).toBeVisible();
  await expect(page.locator('[data-empty]')).toHaveText(r.archive.empty);
});

test('bio copy button copies the exact plain text and resets after 1.6 s', async ({ browser }) => {
  const ctx = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await ctx.newPage();
  await page.goto('/resume/');
  const btn = page.locator('[data-copy] button');
  await btn.click();
  await expect(btn).toHaveText(r.bio.copied);
  await expect(page.locator('[data-copy] [data-status]')).toHaveText(r.bio.copied);
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(r.bio.text);
  await expect(btn).toHaveText(r.bio.copy_button, { timeout: 2500 });
  await ctx.close();
});

test('photo downloads point at the full-resolution originals', async ({ page, request }) => {
  await page.goto('/resume/');
  const links = page.locator('#photos a[download]');
  await expect(links).toHaveCount(r.photos.items.length);
  for (const href of await links.evaluateAll((as) => as.map((a) => a.getAttribute('href')!))) {
    const res = await request.get(href);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('image/jpeg');
    expect((await res.body()).length).toBeGreaterThan(1_000_000);
  }
});

test('/cv/ redirects to /resume/ (with and without JS)', async ({ page, browser }) => {
  await page.goto('/cv/');
  await page.waitForURL('**/resume/');
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const p2 = await ctx.newPage();
  await p2.goto('/cv/');
  await p2.waitForURL('**/resume/', { timeout: 3000 });
  await ctx.close();
});
