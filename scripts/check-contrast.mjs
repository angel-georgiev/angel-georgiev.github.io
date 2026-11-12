// WCAG 2.2 contrast of the design tokens in both themes (PRD §6.1, §8): text ≥ 4.5:1, UI ≥ 3:1.
import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const theme = (name) => {
  const block = css.match(new RegExp(`:root\\[data-theme='${name}'\\]\\s*\\{([^}]*)\\}`))[1];
  return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]));
};
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const TEXT = [['text', 'bg'], ['text', 'surface'], ['text-muted', 'bg'], ['text-muted', 'surface'], ['gold-text', 'bg'], ['gold-text', 'surface'], ['link', 'bg'], ['link', 'surface'], ['on-gold', 'gold']];
const UI = [['brand', 'bg'], ['gold', 'bg']];
let fail = 0;
for (const name of ['dark', 'light']) {
  const t = theme(name);
  for (const [fg, bg] of TEXT) { const r = ratio(t[fg], t[bg]); const ok = r >= 4.5; fail += ok ? 0 : 1; console.log(`${ok ? 'ok  ' : 'FAIL'} ${name} text ${fg} on ${bg}: ${r.toFixed(2)}:1`); }
  for (const [fg, bg] of UI) {
    if (name === 'light' && fg === 'gold') continue; // light: gold is a fill only, never on parchment as UI
    const r = ratio(t[fg], t[bg]); const ok = r >= 3; fail += ok ? 0 : 1; console.log(`${ok ? 'ok  ' : 'FAIL'} ${name} UI   ${fg} on ${bg}: ${r.toFixed(2)}:1`);
  }
}
if (fail) { console.error(`${fail} contrast failures`); process.exit(1); }
