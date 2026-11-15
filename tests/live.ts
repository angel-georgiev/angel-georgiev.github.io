import { readFileSync } from 'node:fs';
import { load } from 'js-yaml';
/** site.yml → live: pages built only while switched on. */
export const COMPANIES_LIVE = (load(readFileSync('content/site.yml', 'utf8')) as any).live.companies === true;
export const companies = (...p: string[]) => (COMPANIES_LIVE ? p : []);
