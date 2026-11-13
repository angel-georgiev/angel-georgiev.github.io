import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = ['/', '/schools/', '/companies/', '/resume/', '/support/', '/support/thanks/', '/daskal/', '/cv/', '/no-such-page/'];
for (const [w, h] of [[1440, 900], [390, 844]]) {
  for (const path of PAGES) {
    test(`axe: 0 violations on ${path} at ${w}px`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      const summary = r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 5).join(', ')}`);
      expect(summary, summary.join('\n')).toEqual([]);
    });
  }
}
