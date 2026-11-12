// One content collection per YAML file in /content. Each collection holds a single entry (id = file name).
// Schemas are strict: an unknown or misspelled key, or a missing required one, fails the build.
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { readFileSync } from 'node:fs';
import { load as parseYaml } from 'js-yaml';

const fileEntry = (name: string) => ({
  name: `yaml-${name}`,
  load: async ({ store, parseData }: any) => {
    const raw = parseYaml(readFileSync(new URL(`../content/${name}.yml`, import.meta.url), 'utf8'));
    store.clear();
    store.set({ id: name, data: await parseData({ id: name, data: raw }) });
  },
});

const s = z.string();
const obj = z.strictObject;
const bi = obj({ en: s, bg: s });
const link = obj({ text: s, href: s });
const cta = obj({ text: s, small: s.optional(), href: s });
const phase = z.literal(2).optional();
const textOrPhased = z.union([s, obj({ text: s, phase })]);

const site = obj({
  person: obj({
    name: bi,
    alternate_names: z.array(s),
    email: s,
    location: bi,
    pronunciation: bi,
    languages: z.array(bi),
  }),
  links: obj({ linkedin: s, substack: s, substack_subscribe: s, book_shop: s, tedx: s, github: s }),
  domain: obj({ preview: s, production: s, meaning: bi }),
  nav: z.array(obj({ key: s, bg: s, en: s, href: s, phase })),
  ui: z.record(s, bi),
  footer: obj({ line: bi, rights: bi, links: z.array(obj({ key: s, bg: s })) }),
  numbers: z.array(obj({ value: s, value_bg: s, en: s, bg: s })),
  book: obj({
    title_bg: s, subtitle_bg: s, title_en: s, subtitle_en: s, note_en: s,
    publisher: bi, year: z.number(), isbn: s, pages: s, parts: z.array(bi), url: s,
    cover: obj({ file: s, alt: s }),
  }),
  pages: obj({
    not_found: obj({ meta_title: s, h1: s, text: s, home: s, support: s }),
    redirect: obj({ book_text: s, cv_text: s }),
  }),
});

const photos = obj({
  credits: z.record(s, bi),
  photos: z.array(obj({
    id: s, file: s, credit: s, alt: s,
    focal: z.tuple([z.number(), z.number()]),
    use: z.array(s), why: s.optional(),
  })),
  not_used: z.array(s),
});

const meta = obj({ title: s, description: s });

const landing = obj({
  meta,
  hero: obj({
    award: s, award_href: s, h1_static_lines: z.array(s).length(2), h1_rotating: z.array(s).min(1),
    lede: s, lede_bold: s, cta_primary: cta, cta_secondary: cta, textlink: link,
    photo: s, badge: obj({ value: s, label: s }),
  }),
  numbers: z.array(obj({ value: s, label: s })),
  perspectives: z.array(obj({ title: s, text: s })),
  offers: obj({ id: s, kicker: s, h2: s, intro: s }),
  in_action: obj({
    kicker: s, h2: s, intro: s,
    items: z.array(obj({ src: s, title: s, meta: s, url: s })),
    also: s,
  }),
  book: obj({ kicker: s, h2: s, text: s, cta: link }),
  footer: obj({ meaning: s }),
  daskal_banner: obj({ text: s, href: s, phase }),
});

const offers = obj({
  offers: z.array(obj({
    key: s, title: s, for: s, partner: s.optional(), what: s,
    includes: z.array(s).optional(), price_line: s.optional(), cta: link, note: s.optional(),
  })),
});

const schools = obj({
  meta,
  hero: obj({ kicker: s, h1_before: s, h1_highlight: s, lede: s, cta_primary: cta, cta_secondary: cta, partner: s, photo: s }),
  proof_numbers: z.array(obj({ value: s, label: s })),
  program: obj({ id: s, kicker: s, h2: s, for_whom: s, draft_note: s, blocks: z.array(obj({ title: s, text: s })) }),
  project: obj({ heading: s, text: s, parts: z.array(s) }),
  includes: obj({ heading: s, items: z.array(s), price: s, price_note: s }),
  how: obj({ heading: s, steps: z.array(s) }),
  why: obj({ heading: s, items: z.array(obj({ text: s, href: s.optional() })) }),
  individual: obj({ text: s, cta: link }),
  final_cta: obj({ h2: s, text: s, cta: link }),
});

const companies = obj({
  meta,
  hero: obj({ kicker: s, h1_before: s, h1_highlight: s, lede: s, cta_primary: cta, cta_secondary: cta, photo: s }),
  logos: obj({ label: s, items: z.array(s) }),
  how: obj({ kicker: s, h2: s, steps: z.array(obj({ title: s, text: s })) }),
  services: obj({
    id: s, kicker: s, h2: s,
    items: z.array(obj({
      key: s, label: s, title: s, bullets: z.array(s), price: s, price_note: s.optional(),
      cta: link, featured: z.boolean().optional(),
    })),
    also: s,
  }),
  cases: obj({
    kicker: s, h2: s,
    items: z.array(obj({ title: s, meta: s, ask: s, problem: s, decision: s, result: s })),
    credentials: z.array(s),
  }),
  final_cta: obj({ h2: s, text: s, cta: link }),
});

const archiveType = z.enum(['tv', 'radio', 'press', 'talk', 'video', 'training', 'award', 'article', 'book']);
const resume = obj({
  meta,
  header: obj({ name: s, role: s, photo: s, linkedin: link, email: link }),
  bio: obj({ heading: s, note: s, text: s, copy_button: s, copied: s }),
  photos: obj({ heading: s, note: s, items: z.array(obj({ id: s, label: s })), button: s }),
  archive: obj({
    heading: s, intro: s, search_placeholder: s,
    filters: z.array(obj({ key: z.union([z.literal('all'), archiveType]), label: s })),
    months: z.array(s).length(12),
    empty: s,
    items: z.array(obj({
      year: z.number().int(), month: z.number().int().min(1).max(12).optional(),
      type: archiveType, outlet: s, title: s, url: s.optional(),
    })),
  }),
});

const support = obj({
  meta,
  product: obj({
    name: s, length_min: z.number(), format: s, deliverable: s, price_eur: z.number(), stripe_link: s,
    stripe_settings: z.record(s, z.unknown()),
  }),
  page: obj({
    eyebrow: s, h1: s, h1_highlight: s, intro: s,
    outcome: obj({ heading: s, items: z.array(s) }),
    for_what: obj({ heading: s, items: z.array(textOrPhased) }),
    for_whom: obj({ heading: s, items: z.array(s) }),
    not_for: obj({ heading: s, items: z.array(s) }),
    proof: obj({
      photo: s, heading: s,
      items: z.array(obj({ text: s, href: s.optional() })),
      testimonials: obj({
        min_to_show: z.number().int(),
        items: z.array(obj({ name: s, role: s.optional(), text: s, consent: z.boolean() })),
      }),
    }),
    how: obj({ heading: s, steps: z.array(s) }),
    guarantee: obj({ heading: s, text: s }),
    price: obj({ label: s, value: s, intro_note: s, includes: s }),
    faq: obj({ heading: s, items: z.array(obj({ q: s, a: s })) }),
    cta: obj({ button: s, note: s, repeat: s }),
  }),
  thank_you: obj({
    path: s, robots: s, h1: s, text: s, fallback: s,
    prepare: obj({ heading: s, text: s }), back: s,
  }),
  follow_up: z.array(s),
});

export const collections = {
  site: defineCollection({ loader: fileEntry('site'), schema: site }),
  photos: defineCollection({ loader: fileEntry('photos'), schema: photos }),
  landing: defineCollection({ loader: fileEntry('landing'), schema: landing }),
  offers: defineCollection({ loader: fileEntry('offers'), schema: offers }),
  schools: defineCollection({ loader: fileEntry('schools'), schema: schools }),
  companies: defineCollection({ loader: fileEntry('companies'), schema: companies }),
  resume: defineCollection({ loader: fileEntry('resume'), schema: resume }),
  support: defineCollection({ loader: fileEntry('support'), schema: support }),
};
