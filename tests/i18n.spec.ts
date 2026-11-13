import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { load } from 'js-yaml';

const site = load(readFileSync('content/site.yml', 'utf8')) as any;
const PAIRS = [['/', '/en/'], ['/schools/', '/en/schools/'], ['/companies/', '/en/companies/'], ['/resume/', '/en/resume/'], ['/support/', '/en/support/'], ['/daskal/', '/en/daskal/']];

test('every page links to its counterpart in the other language', async ({ page }) => {
  for (const [bg, en] of PAIRS) {
    await page.goto(bg);
    await expect(page.locator('html')).toHaveAttribute('lang', 'bg');
    await expect(page.locator('header .lang-switch')).toHaveAttribute('href', en);
    await page.goto(en);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('header .lang-switch')).toHaveAttribute('href', bg);
    // English nav stays in English
    for (const href of await page.locator('header nav a').evaluateAll((as) => as.map((a) => a.getAttribute('href')!))) expect(href.startsWith('/en/')).toBe(true);
  }
});

test('English pages: noindex and no hreflang while in draft; not in the sitemap', async ({ page, request }) => {
  test.skip(site.i18n.en_draft !== true, 'English is live');
  await page.goto('/en/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
  expect(await (await request.get('/sitemap-0.xml')).text()).not.toContain('/en/');
});

test('language bar: suggests English to a non-Bulgarian browser, remembers the choice, never redirects', async ({ browser }) => {
  const ctx = await browser.newContext({ locale: 'en-US' });
  const page = await ctx.newPage();
  await page.goto('/schools/');
  expect(new URL(page.url()).pathname).toBe('/schools/'); // no redirect
  const bar = page.locator('[data-lang-bar]');
  await expect(bar).toBeVisible();
  await expect(bar.locator('a')).toHaveAttribute('href', '/en/schools/');
  await bar.locator('[data-lang-close]').click();
  await expect(bar).toBeHidden();
  await page.goto('/companies/');
  await expect(page.locator('[data-lang-bar]')).toBeHidden(); // remembered
  await ctx.close();
});

test('language bar: hidden for Bulgarian browsers on Bulgarian pages, offered on English pages', async ({ browser }) => {
  const ctx = await browser.newContext({ locale: 'bg-BG' });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.locator('[data-lang-bar]')).toBeHidden();
  await page.goto('/en/');
  await expect(page.locator('[data-lang-bar]')).toBeVisible();
  await expect(page.locator('[data-lang-bar] a')).toHaveAttribute('href', '/');
  await ctx.close();
});

test('English support page: CTAs disabled until the English Stripe link exists', async ({ page }) => {
  const en = load(readFileSync('content/en/support.yml', 'utf8')) as any;
  await page.goto('/en/support/');
  const ctas = page.locator('.support-cta');
  await expect(ctas).toHaveCount(2);
  if (!/^https:\/\//.test(en.product.stripe_link)) {
    for (const c of await ctas.all()) await expect(c.locator('.btn-text')).toHaveText(site.ui.soon.en);
  } else {
    for (const c of await ctas.all()) await expect(c.locator('a.btn')).toHaveAttribute('href', en.product.stripe_link);
  }
});

test('404 page is bilingual with one H1', async ({ page }) => {
  await page.goto('/nope-404/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('section[lang="en"] h2')).toHaveText(site.pages.not_found_en.h1);
  await expect(page.locator('section[lang="en"] a[href="/en/daskal/"]')).toHaveCount(1);
});
