import { getImage } from 'astro:assets';
import { load, photo } from './content';

/** Person entity (PRD §7.3), from site.yml + resume.yml. */
export async function person(site: URL) {
  const s = await load('site');
  const r = await load('resume');
  const p = await photo('portrait-light');
  const img = await getImage({ src: p.img, width: 800, format: 'jpg' });
  return {
    '@type': 'Person',
    '@id': new URL('/#person', site).href,
    name: s.person.name.bg,
    alternateName: s.person.name.en,
    jobTitle: r.header.role,
    image: new URL(img.src, site).href,
    email: `mailto:${s.person.email}`,
    url: new URL('/', site).href,
    sameAs: [s.links.linkedin, s.links.substack, s.links.tedx, s.links.book_shop, s.links.github],
  };
}

export async function profilePage(site: URL, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: pageUrl,
    dateModified: new Date().toISOString().slice(0, 10),
    mainEntity: await person(site),
  };
}
