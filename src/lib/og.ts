// Build-time Open Graph images (PRD §7.3): 1200×630 PNG, text from YAML, photo from photos.yml.
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const font = (pkg: string, file: string) =>
  readFileSync(join(process.cwd(), 'node_modules/@fontsource', pkg, 'files', file));
const fonts = [
  // Separate names per subset; fontFamily lists both so each glyph falls back to the subset that has it.
  ...['cyrillic', 'latin'].map((s) => ({ name: `Display-${s}`, data: font('sofia-sans-condensed', `sofia-sans-condensed-${s}-800-normal.woff`), weight: 800 as const, style: 'normal' as const })),
  ...['cyrillic', 'latin'].map((s) => ({ name: `Body-${s}`, data: font('sofia-sans', `sofia-sans-${s}-700-normal.woff`), weight: 700 as const, style: 'normal' as const })),
];

const DISPLAY = 'Display-cyrillic, Display-latin';
const BODY = 'Body-cyrillic, Body-latin';
const C = { bg: '#10261D', text: '#F4EFE4', muted: '#C9D3CC', gold: '#D9A441' };

/** Crop to 4:5 around the focal point, then resize. sharp has no percentage gravity, so the box is computed here. */
async function focalCrop(path: string, focal: [number, number], w: number, h: number) {
  const img = sharp(path);
  const { width = 0, height = 0 } = await img.metadata();
  const ratio = w / h;
  const cw = Math.min(width, Math.round(height * ratio));
  const ch = Math.round(cw / ratio);
  const left = Math.max(0, Math.min(width - cw, Math.round((focal[0] / 100) * width - cw / 2)));
  const top = Math.max(0, Math.min(height - ch, Math.round((focal[1] / 100) * height - ch / 2)));
  const buf = await img.extract({ left, top, width: cw, height: ch }).resize(w, h).jpeg({ quality: 82 }).toBuffer();
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

type El = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): El => ({ type, props: { style, children } });

export async function ogPng(o: { kicker: string; title: string; highlight?: string; name: string; photoPath: string; focal: [number, number]; square?: boolean }) {
  const [pw, ph] = o.square ? [400, 400] : [400, 500];
  const photo = o.square
    ? `data:image/png;base64,${(await sharp(o.photoPath).resize(pw, ph).png().toBuffer()).toString('base64')}`
    : await focalCrop(o.photoPath, o.focal, pw, ph);
  // Satori has no inline layout: flow the title word by word so the highlight continues on the same line.
  const words = (t: string, color: string) => t.split(/\s+/).filter(Boolean).map((w) => h('span', { color, marginRight: 16 }, w));
  const titleParts: El[] = [...words(o.title, C.text), ...(o.highlight ? words(o.highlight, C.gold) : [])];
  const tree = h('div', { width: 1200, height: 630, display: 'flex', background: C.bg, padding: '56px 64px', fontFamily: BODY }, [
    h('div', { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 616, height: 518, flexShrink: 0, marginRight: 56 }, [
      h('div', { display: 'flex', fontFamily: DISPLAY, fontSize: 34, color: C.text }, [h('span', {}, o.name), h('span', { color: C.gold }, '.')]),
      h('div', { display: 'flex', flexDirection: 'column' }, [
        h('div', { display: 'flex', fontSize: 22, color: C.gold, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 18 }, o.kicker),
        h('div', { display: 'flex', flexWrap: 'wrap', fontFamily: DISPLAY, fontSize: 60, lineHeight: 1.05 }, titleParts),
      ]),
      h('div', { display: 'flex', height: 1 }),
    ]),
    { type: 'img', props: { src: photo, width: pw, height: ph, style: { borderRadius: 24, alignSelf: 'center', flexShrink: 0 } } },
  ]);
  const svg = await satori(tree as any, { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
