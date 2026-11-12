import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { load } from 'js-yaml';
import { visibleTestimonials, stripeReady, priceProblems } from '../src/lib/rules';

const s = load(readFileSync('content/support.yml', 'utf8')) as any;
const site = load(readFileSync('content/site.yml', 'utf8')) as any;

test('testimonials: hidden below the threshold, shown at 3+ consented', () => {
  const t = (consent: boolean) => ({ name: 'Име', text: 'Текст', consent });
  expect(visibleTestimonials([], 3)).toEqual([]);
  expect(visibleTestimonials([t(true), t(true)], 3)).toEqual([]);
  expect(visibleTestimonials([t(true), t(true), t(false)], 3)).toEqual([]);
  expect(visibleTestimonials([t(true), t(true), t(true)], 3)).toHaveLength(3);
  expect(visibleTestimonials([t(true), t(true), t(true), t(false)], 3)).toHaveLength(3);
});

test('price rule catches a mismatch and passes the real content', () => {
  const land = load(readFileSync('content/landing.yml', 'utf8')) as any;
  const off = load(readFileSync('content/offers.yml', 'utf8')) as any;
  const real = { priceValue: s.page.price.value, priceEur: s.product.price_eur, ctaButton: s.page.cta.button, landingSmall: land.hero.cta_primary.small, offerLine: off.offers.find((o: any) => o.key === 'session').price_line };
  expect(priceProblems(real)).toEqual([]);
  expect(priceProblems({ ...real, ctaButton: 'Поискайте моята помощ · 39 €' })).toHaveLength(1);
});

test('stripe link rule', () => {
  expect(stripeReady('TBD — Angel creates the Stripe Payment Link')).toBe(false);
  expect(stripeReady('')).toBe(false);
  expect(stripeReady('https://buy.stripe.com/test_123')).toBe(true);
});

test('/support/: testimonials block absent, two CTAs in the right places', async ({ page }) => {
  await page.goto('/support/');
  await expect(page.locator('.testimonials')).toHaveCount(visibleTestimonials(s.page.proof.testimonials.items, s.page.proof.testimonials.min_to_show).length ? 1 : 0);
  const ctas = page.locator('.support-cta');
  await expect(ctas).toHaveCount(2);
  await expect(page.locator('#cta')).toHaveCount(1);
  if (!stripeReady(s.product.stripe_link)) {
    // No Stripe link yet: both CTAs disabled with "Скоро"
    for (const c of await ctas.all()) {
      await expect(c.locator('.btn')).toHaveAttribute('aria-disabled', 'true');
      await expect(c.locator('.btn-text')).toHaveText(site.ui.soon.bg);
      await expect(c.locator('a.btn')).toHaveCount(0);
    }
  } else {
    for (const c of await ctas.all()) await expect(c.locator('a.btn')).toHaveAttribute('href', s.product.stripe_link);
  }
  // Order (PRD §5.3): result, audience and proof before the first CTA; guarantee and price before the second.
  const y = async (sel: string) => (await page.locator(sel).first().boundingBox())!.y;
  const h = (t: string) => `h2:text-is("${t}")`;
  const [cta1, cta2] = [(await ctas.nth(0).boundingBox())!.y, (await ctas.nth(1).boundingBox())!.y];
  for (const t of [s.page.outcome.heading, s.page.for_whom.heading, s.page.not_for.heading, s.page.proof.heading]) expect(await y(h(t))).toBeLessThan(cta1);
  for (const t of [s.page.guarantee.heading]) { const v = await y(h(t)); expect(v).toBeGreaterThan(cta1); expect(v).toBeLessThan(cta2); }
  const price = await y('.price-card');
  expect(price).toBeGreaterThan(cta1); expect(price).toBeLessThan(cta2);
  // Phase 2 item hidden
  await expect(page.getByText('Даскал AI за вашия предмет')).toHaveCount(0);
});

test('/support/thanks/ is noindex and has the fallback line', async ({ page }) => {
  await page.goto('/support/thanks/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.locator('h1')).toHaveText(s.thank_you.h1);
  await expect(page.locator(`a[href="mailto:${site.person.email}"]`).first()).toBeVisible();
});

test('/book/ reaches uchene.com within 1 s, with and without JS', async ({ browser }) => {
  for (const javaScriptEnabled of [true, false]) {
    const ctx = await browser.newContext({ javaScriptEnabled });
    await ctx.route('https://uchene.com/**', (r) => r.fulfill({ status: 200, contentType: 'text/html', body: '<title>uchene</title>' }));
    const page = await ctx.newPage();
    const t0 = Date.now();
    await page.goto('/book/', { waitUntil: 'commit' });
    await page.waitForURL('https://uchene.com/**', { timeout: 1000 });
    expect(Date.now() - t0).toBeLessThan(1000);
    await ctx.close();
  }
});

test('404 page: status 404, links home and to /support/', async ({ page }) => {
  const res = await page.goto('/no-such-page/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText(site.pages.not_found.h1);
  await expect(page.locator('main a[href="/"]')).toHaveCount(1);
  await expect(page.locator('main a[href="/support/"]')).toHaveCount(1);
});

test('sitemap and robots', async ({ request }) => {
  const sm = await (await request.get('/sitemap-0.xml')).text();
  for (const p of ['/', '/schools/', '/companies/', '/resume/', '/support/']) expect(sm).toContain(`${p}</loc>`);
  for (const p of ['/book/', '/cv/', '/support/thanks/', '404']) expect(sm).not.toContain(p);
  expect(await (await request.get('/robots.txt')).text()).toContain('Sitemap:');
});

test('every page has a canonical URL and exactly one H1', async ({ page }) => {
  for (const p of ['/', '/schools/', '/companies/', '/resume/', '/support/', '/support/thanks/']) {
    await page.goto(p);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);
  }
});

test('refund window reads the same everywhere it appears (PRD §11)', () => {
  const raw = readFileSync('content/support.yml', 'utf8').split('\n').filter((l) => !l.trim().startsWith('#')).join('\n');
  const days = [...raw.matchAll(/до (\d+) дни след нея/g)].map((m) => m[1]);
  expect(days.length).toBeGreaterThanOrEqual(2);
  expect(new Set(days).size).toBe(1);
});

test('analytics: Cloudflare beacon only when a token is set, never on /support/thanks/', async ({ page }) => {
  const token = String(site.analytics.cloudflare_token ?? '').trim();
  const beacon = 'script[src="https://static.cloudflareinsights.com/beacon.min.js"]';
  for (const p of ['/', '/schools/', '/companies/', '/resume/', '/support/']) {
    await page.goto(p);
    await expect(page.locator(beacon)).toHaveCount(token ? 1 : 0);
    if (token) await expect(page.locator(beacon)).toHaveAttribute('data-cf-beacon', JSON.stringify({ token }));
  }
  await page.goto('/support/thanks/');
  await expect(page.locator(beacon)).toHaveCount(0);
});
