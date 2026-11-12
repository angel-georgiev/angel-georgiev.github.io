// Measures size-adjust for the metric-matched fallback faces in src/styles/global.css (PRD §6.3).
// Compares Sofia Sans (body 400 and 800) and Sofia Sans Condensed (850) with the fallback face the browser really uses.
// Run: node scripts/measure-fallback.mjs
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const f = (pkg, file) => readFileSync(new URL(`../node_modules/@fontsource-variable/${pkg}/files/${file}`, import.meta.url)).toString('base64');
const body = f('sofia-sans', 'sofia-sans-cyrillic-wght-normal.woff2');
const cond = f('sofia-sans-condensed', 'sofia-sans-condensed-cyrillic-wght-normal.woff2');
const sample = 'От 20 години обучавам хора в училища, компании и онлайн. По-добри процеси в екипа с AI там, където помага.';
const b = await chromium.launch();
const p = await b.newPage();
await p.setContent(`<style>
@font-face{font-family:B;src:url(data:font/woff2;base64,${body});font-weight:1 1000}
@font-face{font-family:C;src:url(data:font/woff2;base64,${cond});font-weight:1 1000}
@font-face{font-family:FR;src:local('Arial'),local('ArialMT'),local('Liberation Sans'),local('LiberationSans');font-weight:1 550}
@font-face{font-family:FB;src:local('Arial Bold'),local('Arial-BoldMT'),local('Liberation Sans Bold'),local('LiberationSans-Bold');font-weight:551 1000}
span{font-size:100px;white-space:nowrap}</style>
<span id=b4 style="font-family:B;font-weight:400">${sample}</span><br><span id=f4 style="font-family:FR;font-weight:400">${sample}</span><br>
<span id=b8 style="font-family:B;font-weight:800">${sample}</span><br><span id=f8 style="font-family:FB;font-weight:800">${sample}</span><br>
<span id=c style="font-family:C;font-weight:850">${sample}</span><br><span id=fc style="font-family:FB;font-weight:850">${sample}</span>`);
await p.evaluate(() => document.fonts.ready);
const w = await p.evaluate(() => Object.fromEntries(['b4', 'f4', 'b8', 'f8', 'c', 'fc'].map((id) => [id, document.getElementById(id).getBoundingClientRect().width])));
const pct = (a, b) => ((w[a] / w[b]) * 100).toFixed(1) + '%';
console.log(`body 400: ${pct('b4', 'f4')}  body 800: ${pct('b8', 'f8')}  condensed 850: ${pct('c', 'fc')}`);
await b.close();
