import { getEntry, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

type Name = 'site' | 'photos' | 'landing' | 'offers' | 'schools' | 'companies' | 'resume' | 'support';
export async function load<K extends Name>(name: K): Promise<CollectionEntry<K>['data']> {
  const entry = await getEntry(name as any, name);
  if (!entry) throw new Error(`content/${name}.yml did not load`);
  return entry.data as CollectionEntry<K>['data'];
}

/** Strings that are not final copy. They render visibly on preview builds and block production (PRD §0.2). */
export const PLACEHOLDER_RE = /\b(TBD|TBC|VERIFY|PLACEHOLDER)\b|\[АНГЕЛ ПИШЕ/;
export const isPlaceholder = (s: unknown) => typeof s === 'string' && PLACEHOLDER_RE.test(s);

/** Phase gate: items marked phase: 2 stay hidden until Phase 2. */
export const CURRENT_PHASE = 1;
export const inPhase = (x: unknown) =>
  !(x && typeof x === 'object' && 'phase' in x && typeof (x as any).phase === 'number' && (x as any).phase > CURRENT_PHASE);

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/photos/*.jpg', { eager: true });

export async function photo(id: string) {
  const { photos, credits } = await load('photos');
  const p = photos.find((x) => x.id === id);
  if (!p) throw new Error(`photos.yml has no photo with id "${id}"`);
  const mod = files[`/src/assets/photos/${p.file}`];
  if (!mod) throw new Error(`photo file missing: src/assets/photos/${p.file}`);
  const credit = credits[p.credit];
  if (!credit) throw new Error(`photos.yml: unknown credit "${p.credit}" on ${id}`);
  return { ...p, img: mod.default, credit: credit.bg, position: `${p.focal[0]}% ${p.focal[1]}%` };
}
