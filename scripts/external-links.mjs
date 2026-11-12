// Post-build: every link to another site opens in a new window (Angel, 12 Nov 2026).
// Adds target="_blank" rel="noopener" to <a href="http(s)://other-host…">. Leaves internal links, mailto:,
// and links marked data-same-window (redirect fallbacks) untouched. Idempotent.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Internal paths that immediately send the visitor to another site (redirect pages) count as external.
export const LEAVING_PATHS = ['/book/'];

export function isExternal(href, siteHost) {
  if (LEAVING_PATHS.includes(href)) return true;
  if (!/^https?:\/\//i.test(href)) return false;
  try { return new URL(href).host !== siteHost; } catch { return false; }
}

export function rewrite(html, siteHost) {
  return html.replace(/<a\b([^>]*)>/g, (tag, attrs) => {
    const href = attrs.match(/\shref="([^"]*)"/)?.[1];
    if (!href || !isExternal(href, siteHost)) return tag;
    if (/\sdata-same-window\b/.test(attrs) || /\starget=/.test(attrs)) return tag;
    const rel = attrs.match(/\srel="([^"]*)"/)?.[1];
    let out = attrs;
    if (rel) { if (!/\bnoopener\b/.test(rel)) out = out.replace(/\srel="[^"]*"/, ` rel="${rel} noopener"`); }
    else out += ' rel="noopener"';
    return `<a${out} target="_blank">`;
  });
}

export function processDist(distDir, siteUrl) {
  const host = new URL(siteUrl).host;
  let files = 0, links = 0;
  const walk = (d) => readdirSync(d).forEach((f) => {
    const p = join(d, f);
    if (statSync(p).isDirectory()) return walk(p);
    if (!p.endsWith('.html')) return;
    const src = readFileSync(p, 'utf8');
    const out = rewrite(src, host);
    if (out !== src) { writeFileSync(p, out); files++; links += (out.match(/target="_blank"/g) || []).length; }
  });
  walk(distDir);
  return { files, links };
}
