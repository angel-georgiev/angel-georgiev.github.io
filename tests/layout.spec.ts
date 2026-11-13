import { test, expect } from '@playwright/test';

const PAGES = ['/', '/schools/', '/companies/', '/resume/', '/support/', '/support/thanks/', '/daskal/', '/no-such-page/'];

// PRD §5.1: the rotating H1 must never move anything. H1 box and the next element are identical for every item.
for (const [w, h] of [[1440, 900], [390, 844]]) {
  test(`landing H1: zero layout shift across all rotating items at ${w}px`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const items = page.locator('[data-rotator] .item');
    const n = await items.count();
    expect(n).toBeGreaterThan(1);
    const boxes: string[] = [];
    for (let i = 0; i < n; i++) {
      await page.evaluate((i) => {
        document.querySelectorAll('[data-rotator] .item').forEach((el, j) => el.classList.toggle('on', i === j));
      }, i);
      const m = await page.evaluate(() => {
        const h1 = document.querySelector('h1')!.getBoundingClientRect();
        const lede = document.querySelector('.lede')!.getBoundingClientRect();
        return JSON.stringify([h1.x, h1.y, h1.width, h1.height, lede.y]);
      });
      boxes.push(m);
    }
    expect(new Set(boxes).size, `boxes per item: ${boxes.join(' | ')}`).toBe(1);
    // The longest item fits on one line inside the viewport
    const overflow = await page.evaluate(() => document.querySelector('h1')!.scrollWidth > document.querySelector('h1')!.clientWidth + 1);
    expect(overflow).toBe(false);
  });
}

test('landing H1 stays on the first item under reduced motion', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('/');
  const first = await page.locator('[data-rotator] .item.on').textContent();
  await page.waitForTimeout(2800);
  expect(await page.locator('[data-rotator] .item.on').textContent()).toBe(first);
  await ctx.close();
});

for (const path of PAGES) {
  test(`no horizontal scroll at 320px: ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(sw).toBeLessThanOrEqual(320);
  });
}

// PRD §5.1: hero text and both CTAs above the fold at 1440×900 and 390×844.
for (const [w, h] of [[1440, 900], [390, 844]]) {
  test(`landing hero CTAs above the fold at ${w}×${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const bottoms = await page.evaluate(() => Array.from(document.querySelectorAll('.home-hero .cta-row .btn')).map((b) => b.getBoundingClientRect().bottom));
    expect(bottoms.length).toBe(2);
    for (const b of bottoms) expect(b).toBeLessThanOrEqual(h);
  });
}
