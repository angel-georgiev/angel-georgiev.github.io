import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { load as parseYaml } from 'js-yaml';
import { scan, writeOpenItems } from './scripts/open-items.mjs';

const siteYml = parseYaml(readFileSync(new URL('./content/site.yml', import.meta.url), 'utf8'));
// The one value to switch at go-live (PRD §7.2): preview → production.
const SITE = process.env.SITE_ENV === 'production' ? siteYml.domain.production : siteYml.domain.preview;

const openItems = {
  name: 'open-items',
  hooks: {
    'astro:build:start': ({ logger }) => {
      const hits = writeOpenItems(scan());
      const blocking = hits.filter((h) => h.phase1);
      logger.info(`OPEN_ITEMS.md updated: ${blocking.length} Phase 1 markers`);
      if (process.env.SITE_ENV === 'production' && blocking.length) {
        throw new Error(`Production build blocked: ${blocking.length} unresolved markers in Phase 1 content. See OPEN_ITEMS.md.`);
      }
    },
  },
};

const NOT_IN_SITEMAP = ['/book/', '/cv/', '/404', '/support/thanks/'];

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  i18n: { defaultLocale: 'bg', locales: ['bg', 'en'], routing: { prefixDefaultLocale: false } },
  integrations: [
    openItems,
    sitemap({ filter: (page) => !NOT_IN_SITEMAP.some((p) => new URL(page).pathname.startsWith(p)) }),
  ],
});
