import { getImage } from 'astro:assets';
import { load, photo } from './content';
import type { Lang } from './i18n';

/** Person entity (PRD §7.3), from site.yml + resume.yml. */
export async function person(site: URL, lang: Lang = 'bg') {
  const s = await load('site');
  const r = await load('resume', lang);
  const p = await photo('portrait-light');
  const img = await getImage({ src: p.img, width: 800, format: 'jpg' });
  return {
    '@type': 'Person',
    '@id': new URL('/#person', site).href,
    name: s.person.name[lang],
    alternateName: s.person.name[lang === 'bg' ? 'en' : 'bg'],
    jobTitle: r.header.role,
    image: new URL(img.src, site).href,
    email: `mailto:${s.person.email}`,
    url: new URL('/', site).href,
    sameAs: [s.links.linkedin, s.links.substack, s.links.tedx, s.links.book_shop, s.links.github],
  };
}

export async function profilePage(site: URL, pageUrl: string, lang: Lang = 'bg') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: pageUrl,
    dateModified: new Date().toISOString().slice(0, 10),
    inLanguage: lang,
    mainEntity: await person(site, lang),
  };
}
