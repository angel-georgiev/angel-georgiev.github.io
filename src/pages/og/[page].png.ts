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
  const name = site.person.name.bg;
  const supTitle = su.page.h1.replace(su.page.h1_highlight, '').trim();
  return [
    { params: { page: 'index' }, props: { name, kicker: l.hero.award, title: l.hero.h1_static_lines.join(' '), highlight: l.hero.h1_rotating[0], photoId: l.hero.photo } },
    { params: { page: 'schools' }, props: { name, kicker: sc.hero.kicker, title: sc.hero.h1_before, highlight: sc.hero.h1_highlight, photoId: sc.hero.photo } },
    { params: { page: 'companies' }, props: { name, kicker: co.hero.kicker, title: co.hero.h1_before, highlight: co.hero.h1_highlight, photoId: co.hero.photo } },
    { params: { page: 'resume' }, props: { name, kicker: r.header.role, title: r.meta.title.split('|')[0].trim(), photoId: r.header.photo } },
    { params: { page: 'support' }, props: { name, kicker: su.product.name, title: supTitle, highlight: su.page.h1_highlight, photoId: su.page.proof.photo } },
  ];
};

export const GET: APIRoute = async ({ props }) => {
  const p = await photo(props.photoId);
  const path = join(process.cwd(), 'src/assets/photos', p.file);
  const png = await ogPng({ name: props.name, kicker: props.kicker, title: props.title, highlight: props.highlight, photoPath: path, focal: p.focal as [number, number] });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
