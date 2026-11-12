// Screenshots of the built site at 1440×900 and 390×844 (above the fold + full page).
// Usage: node scripts/screens.mjs <outDir> [routes...]   (expects `astro preview` on :4321)
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const [out = 'screenshots', ...args] = process.argv.slice(2);
const routes = args.length ? args : ['/', '/schools/', '/companies/', '/resume/', '/support/'];
const BASE = process.env.BASE ?? 'http://localhost:4321';
mkdirSync(out, { recursive: true });
const b = await chromium.launch();
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  for (const r of routes) {
    await p.goto(BASE + r, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const name = r === '/' ? 'home' : r.replace(/^\/|\/$/g, '').replace(/\//g, '-');
    const sw = await p.evaluate(() => document.documentElement.scrollWidth);
    if (sw > w) console.warn(`! ${r} at ${w}px: horizontal overflow (${sw}px)`);
    await p.screenshot({ path: `${out}/${name}-${w}-fold.png` });
    await p.screenshot({ path: `${out}/${name}-${w}-full.png`, fullPage: true });
  }
  await ctx.close();
}
await b.close();
console.log(`saved to ${out}/`);
