import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { load } from 'js-yaml';

const b = load(readFileSync('content/book.yml', 'utf8')) as any;
const site = load(readFileSync('content/site.yml', 'utf8')) as any;

test('/book/ is a real page: one H1, both order buttons go to the book Stripe link in a new window', async ({ page }) => {
  await page.goto('/book/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText(site.book.title_bg);
  const buy = page.locator(`main a[href="${b.product.stripe_link}"]`);
  await expect(buy).toHaveCount(2);
  for (const a of await buy.all()) await expect(a).toHaveAttribute('target', '_blank');
  await expect(page.locator('.parts > li')).toHaveCount(7);
  await expect(page.locator('main')).toContainText(`${site.book.pages} страници`);
});

test('/book/ has Book JSON-LD with the ISBN and the price', async ({ page }) => {
  await page.goto('/book/');
  const ld = JSON.parse(await page.locator('script[type="application/ld+json"]').first().textContent() ?? '{}');
  expect(ld['@type']).toBe('Book');
  expect(ld.isbn).toBe(site.book.isbn);
  expect(ld.offers.price).toBe(b.product.price_eur.toFixed(2));
});

test('/book/ is Bulgarian only: no language switch, no hreflang', async ({ page }) => {
  await page.goto('/book/');
  await expect(page.locator('.lang-switch')).toHaveCount(0);
  await expect(page.locator('link[hreflang]')).toHaveCount(0);
});

test('internal links to /book/ stay in the same window', async ({ page }) => {
  await page.goto('/');
  const a = page.locator('main a[href="/book/"]').first();
  await expect(a).not.toHaveAttribute('target', '_blank');
});
