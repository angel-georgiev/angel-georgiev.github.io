import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { load as parseYaml } from 'js-yaml';
import { scan, writeOpenItems } from './scripts/open-items.mjs';
import { priceProblems } from './src/lib/rules.ts';
import { processDist } from './scripts/external-links.mjs';
import { fileURLToPath } from 'node:url';

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
      // Build check (PRD §11): the support price reads the same everywhere.
      const y = (f) => parseYaml(readFileSync(new URL(`./content/${f}.yml`, import.meta.url), 'utf8'));
      const sup = y('support'), land = y('landing'), off = y('offers');
      const problems = priceProblems({
        priceValue: sup.page.price.value, priceEur: sup.product.price_eur, ctaButton: sup.page.cta.button,
        landingSmall: land.hero.cta_primary.small, offerLine: off.offers.find((o) => o.key === 'session').price_line,
      });
      if (problems.length) throw new Error(`Price mismatch:\n- ${problems.join('\n- ')}`);
      if (process.env.SITE_ENV === 'production' && blocking.length) {
        throw new Error(`Production build blocked: ${blocking.length} unresolved markers in Phase 1 content. See OPEN_ITEMS.md.`);
      }
    },
    // External links open in a new window (Angel, 12 Nov 2026)
    'astro:build:done': ({ dir, logger }) => {
      const r = processDist(fileURLToPath(dir), SITE);
      logger.info(`external links open in a new window: ${r.links} links in ${r.files} pages`);
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
