// Measures size-adjust for the metric-matched fallback fonts (PRD §6.3). Run: node scripts/measure-fallback.mjs
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const f = (pkg, file) => readFileSync(new URL(`../node_modules/@fontsource-variable/${pkg}/files/${file}`, import.meta.url)).toString('base64');
const body = f('sofia-sans', 'sofia-sans-cyrillic-wght-normal.woff2');
const cond = f('sofia-sans-condensed', 'sofia-sans-condensed-cyrillic-wght-normal.woff2');
const sample = 'От 20 години обучавам хора в училища, компании и онлайн. Помагам на хора и екипи да работят с AI.';
const b = await chromium.launch();
const p = await b.newPage();
await p.setContent(`<style>
@font-face{font-family:B;src:url(data:font/woff2;base64,${body})}
@font-face{font-family:C;src:url(data:font/woff2;base64,${cond})}
span{font-size:100px;white-space:nowrap}</style>
<span id=b style="font-family:B">${sample}</span><br><span id=bf style="font-family:Arial">${sample}</span><br>
<span id=c style="font-family:C;font-weight:850">${sample}</span><br><span id=cf style="font-family:Arial;font-weight:700">${sample}</span>`);
await p.evaluate(() => document.fonts.ready);
const w = await p.evaluate(() => Object.fromEntries(['b', 'bf', 'c', 'cf'].map((id) => [id, document.getElementById(id).getBoundingClientRect().width])));
console.log(`body size-adjust: ${((w.b / w.bf) * 100).toFixed(1)}%  display size-adjust: ${((w.c / w.cf) * 100).toFixed(1)}%`);
await b.close();
