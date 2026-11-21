import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { load } from 'js-yaml';

const site = load(readFileSync('content/site.yml', 'utf8')) as any;
const ct = load(readFileSync('content/contact.yml', 'utf8')) as any;

test('nav: Резюме is second to last and Контакт is last, in both languages', async ({ page }) => {
  for (const [p, last, prev] of [['/', '/contact/', '/resume/'], ['/en/', '/en/contact/', '/en/resume/']]) {
    await page.goto(p);
    const hrefs = await page.locator('header nav a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs.at(-1)).toBe(last);
    expect(hrefs.at(-2)).toBe(prev);
  }
});

test('each card button opens a pre-filled email with its own subject and body', async ({ page }) => {
  await page.goto('/contact/');
  await expect(page.locator('h1')).toHaveText(ct.hero.h1);
  for (const card of ct.cards) {
    const href = await page.locator(`a[data-mail="${card.key}"]`).getAttribute('href');
    expect(href!.startsWith(`mailto:${site.person.email}?`)).toBe(true);
    const q = new URLSearchParams(href!.split('?')[1]);
    expect(q.get('subject')).toBe(card.subject);
    expect(q.get('body')).toBe(card.body.trimEnd().replace(/\n/g, '\r\n'));
  }
});

test('talk card lists the press-kit topics; no fees on the page', async ({ page }) => {
  await page.goto('/contact/');
  const press = load(readFileSync('content/press.yml', 'utf8')) as any;
  for (const t of press.topics.items) await expect(page.locator('#talk')).toContainText(t.bg);
  await expect(page.locator('main')).not.toContainText('€');
});

test('direct contact card: location, email and a working copy button', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/contact/');
  const card = page.locator('.direct');
  await expect(card).toContainText(site.person.location.bg);
  await expect(card.locator(`a[href="mailto:${site.person.email}"]`)).toBeVisible();
  const buttons = card.locator('button');
  await expect(buttons).toHaveCount(2);
  await buttons.nth(0).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(site.person.email);
  await expect(card.locator(`a[href="${site.links.linkedin}"]`)).toBeVisible();
  await buttons.nth(1).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(site.links.linkedin);
});

test('landing talks card points to the contact page', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main a[href="/contact/"]').first()).toBeVisible();
});
