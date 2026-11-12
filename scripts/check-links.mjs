// Fails if any internal link, image or anchor in dist/ points nowhere (PRD §11: 0 broken internal links).
// Also parses every JSON-LD block. External URLs are not fetched here (they are not ours to keep stable).
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const pages = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && pages.push(p); });
walk(DIST);

const ids = new Map();
const html = new Map();
for (const p of pages) {
  const s = readFileSync(p, 'utf8');
  html.set(p, s);
  ids.set(p, new Set([...s.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}
const fileFor = (path) => {
  const clean = decodeURIComponent(path.split('#')[0].split('?')[0]);
  const f = join(DIST, clean);
  if (clean.endsWith('/')) return join(f, 'index.html');
  if (existsSync(f) && statSync(f).isFile()) return f;
  return existsSync(join(f, 'index.html')) ? join(f, 'index.html') : f;
};

const errors = [];
for (const [p, s] of html) {
  const from = '/' + relative(DIST, p);
  const refs = [
    ...[...s.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]),
    ...[...s.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((x) => x.trim().split(/\s+/)[0])),
  ];
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
    if (ref.startsWith('#')) { if (ref.length > 1 && !ids.get(p).has(ref.slice(1))) errors.push(`${from}: missing anchor ${ref}`); continue; }
    if (!ref.startsWith('/')) { errors.push(`${from}: relative URL ${ref}`); continue; }
    const target = fileFor(ref);
    if (!existsSync(target)) { errors.push(`${from}: broken ${ref}`); continue; }
    const hash = ref.split('#')[1];
    if (hash && target.endsWith('.html') && !ids.get(target)?.has(hash)) errors.push(`${from}: missing anchor ${ref}`);
  }
  for (const m of s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const j = JSON.parse(m[1]); if (!j['@context']) errors.push(`${from}: JSON-LD without @context`); }
    catch (e) { errors.push(`${from}: invalid JSON-LD (${e.message})`); }
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`links: ${pages.length} pages, 0 broken internal links or anchors, JSON-LD parses`);
