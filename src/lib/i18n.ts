// Phase 3 language layer. Bulgarian lives at the root, English under /en/ (PRD §2).
export type Lang = 'bg' | 'en';
export const LANGS: Lang[] = ['bg', 'en'];

export const langFromPath = (path: string): Lang => (path === '/en' || path.startsWith('/en/') ? 'en' : 'bg');

/** Path without the language prefix: /en/support/ → /support/ */
export const basePath = (path: string) => (path.startsWith('/en/') ? path.slice(3) : path === '/en' ? '/' : path);

/** The same page in another language. */
export const pathIn = (path: string, lang: Lang) => {
  const b = basePath(path);
  return lang === 'en' ? (b === '/' ? '/en/' : `/en${b}`) : b;
};

// Internal paths that exist in both languages. Others (/book/, /cv/, assets) are shared.
const LOCALIZED = ['/', '/schools/', '/companies/', '/resume/', '/support/', '/support/thanks/', '/daskal/'];

/** Prefix an internal link for the given language when that page exists in it. Leaves external, mailto and anchors alone. */
export function localize(href: string, lang: Lang) {
  if (lang === 'bg' || !href.startsWith('/') || href.startsWith('/en/')) return href;
  const [p, hash = ''] = href.split('#');
  return LOCALIZED.includes(p) ? `${pathIn(p, 'en')}${hash ? `#${hash}` : ''}` : href;
}
