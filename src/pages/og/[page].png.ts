import type { APIRoute, GetStaticPaths } from 'astro';
import { join } from 'node:path';
import { load, photo } from '../../lib/content';
import { ogPng } from '../../lib/og';

export const getStaticPaths: GetStaticPaths = async () => {
  const site = await load('site');
  const l = await load('landing');
  const sc = await load('schools');
  const co = await load('companies');
  const r = await load('resume');
  const su = await load('support');
  const dk = await load('daskal');
  const name = site.person.name.bg;
  const supTitle = su.page.h1.replace(su.page.h1_highlight, '').trim();
  const pages = [
    { params: { page: 'index' }, props: { name, kicker: l.hero.award, title: l.hero.h1_static_lines.join(' '), highlight: l.hero.h1_rotating[0], photoId: l.hero.photo } },
    { params: { page: 'schools' }, props: { name, kicker: sc.hero.kicker, title: sc.hero.h1_before, highlight: sc.hero.h1_highlight, photoId: sc.hero.photo } },
    { params: { page: 'companies' }, props: { name, kicker: co.hero.kicker, title: co.hero.h1_before, highlight: co.hero.h1_highlight, photoId: co.hero.photo } },
    { params: { page: 'resume' }, props: { name, kicker: r.header.role, title: r.meta.title.split('|')[0].trim(), photoId: r.header.photo } },
    { params: { page: 'daskal' }, props: { name, kicker: dk.hero.eyebrow, title: dk.hero.h1, iconFile: dk.package.icon } },
    { params: { page: 'support' }, props: { name, kicker: su.product.name, title: supTitle, highlight: su.page.h1_highlight, photoId: su.page.proof.photo } },
  ];
  // English versions: same images, English text
  const el = await load('landing', 'en'), es = await load('schools', 'en'), ec = await load('companies', 'en');
  const er = await load('resume', 'en'), eu = await load('support', 'en'), ed = await load('daskal', 'en');
  const nameEn = site.person.name.en;
  const euTitle = eu.page.h1.replace(eu.page.h1_highlight, '').trim();
  pages.push(
    { params: { page: 'en-index' }, props: { name: nameEn, kicker: el.hero.award, title: el.hero.h1_static_lines.join(' '), highlight: el.hero.h1_rotating[0], photoId: el.hero.photo } },
    { params: { page: 'en-schools' }, props: { name: nameEn, kicker: es.hero.kicker, title: es.hero.h1_before, highlight: es.hero.h1_highlight, photoId: es.hero.photo } },
    { params: { page: 'en-companies' }, props: { name: nameEn, kicker: ec.hero.kicker, title: ec.hero.h1_before, highlight: ec.hero.h1_highlight, photoId: ec.hero.photo } },
    { params: { page: 'en-resume' }, props: { name: nameEn, kicker: er.header.role, title: er.meta.title.split('|')[0].trim(), photoId: er.header.photo } },
    { params: { page: 'en-daskal' }, props: { name: nameEn, kicker: ed.hero.eyebrow, title: ed.hero.h1, iconFile: ed.package.icon } },
    { params: { page: 'en-support' }, props: { name: nameEn, kicker: eu.product.name, title: euTitle, highlight: eu.page.h1_highlight, photoId: eu.page.proof.photo } },
  );
  return pages;
};

export const GET: APIRoute = async ({ props }) => {
  const base = { name: props.name, kicker: props.kicker, title: props.title, highlight: props.highlight };
  let png;
  if (props.iconFile) {
    png = await ogPng({ ...base, photoPath: join(process.cwd(), 'src/assets/daskal', props.iconFile), focal: [50, 50], square: true });
  } else {
    const p = await photo(props.photoId);
    png = await ogPng({ ...base, photoPath: join(process.cwd(), 'src/assets/photos', p.file), focal: p.focal as [number, number] });
  }
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
