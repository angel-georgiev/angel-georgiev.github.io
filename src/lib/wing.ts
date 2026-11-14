// The wing as a standalone SVG string (same construction as src/components/Wing.astro), for build-time images.
const LEAF = 'M0 0 C -18 -15, -58 -14, -78 0 C -58 14, -18 15, 0 0 Z';
const F = [[-16, 0.5, 0], [2, 0.7, 4.86], [20, 0.88, 3.86], [38, 1.0, 3.4]] as const;
const t = (r: number, s: number) => `translate(91 80) rotate(${r}) scale(${s})`;

/** Tight crop around the feathers (see Wing.astro). Colours: dark ground → gold #d9a441 + mint #5cc495. */
export function wingSvg(feather = '#d9a441', ai = '#5cc495') {
  const masks = [0, 1, 2].map((i) =>
    `<mask id="m${i}" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120"><rect width="120" height="120" fill="#fff"/>` +
    F.slice(i + 1).map(([r, s, w]) => `<path d="${LEAF}" transform="${t(r, s)}" stroke="#000" stroke-width="${w}" stroke-linejoin="round"/>`).join('') +
    '</mask>').join('');
  const feathers = F.map(([r, s], i) =>
    `<g${i < 3 ? ` mask="url(#m${i})"` : ''}><path d="${LEAF}" transform="${t(r, s)}" fill="${i === 0 ? ai : feather}"/></g>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="23 28 72 68" width="72" height="68"><defs>${masks}</defs>${feathers}</svg>`;
}
