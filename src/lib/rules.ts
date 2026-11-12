// Pure business rules (no Astro imports), so they can be unit-tested directly.

export type Testimonial = { name: string; role?: string; text: string; consent: boolean };

/** PRD §5.3: render only when at least `min` entries have consent; otherwise render nothing at all. */
export function visibleTestimonials(items: Testimonial[], min: number): Testimonial[] {
  const ok = items.filter((t) => t.consent === true);
  return ok.length >= min ? ok : [];
}

const PLACEHOLDER = /\b(TBD|TBC|VERIFY|PLACEHOLDER)\b|\[АНГЕЛ ПИШЕ/;
/** A Stripe Payment Link is usable only when it is a real https URL (PRD §5.3: otherwise CTAs render disabled). */
export const stripeReady = (link: string) => !PLACEHOLDER.test(link) && /^https:\/\/\S+$/.test(link.trim());

const norm = (s: string) => s.replace(/[\s ]+/g, ' ').trim();
/** PRD §5.3/§11: the price shown on the CTA label and elsewhere must match price.value. Returns a list of problems. */
export function priceProblems(d: { priceValue: string; priceEur: number; ctaButton: string; landingSmall: string; offerLine: string }): string[] {
  const p = norm(d.priceValue);
  const out: string[] = [];
  if (p !== `${d.priceEur} €`) out.push(`support.yml: price.value "${d.priceValue}" ≠ product.price_eur ${d.priceEur}`);
  if (!norm(d.ctaButton).endsWith(p)) out.push(`support.yml: cta.button "${d.ctaButton}" does not end with price.value "${p}"`);
  if (!norm(d.landingSmall).includes(p)) out.push(`landing.yml: hero.cta_primary.small "${d.landingSmall}" does not contain "${p}"`);
  if (!norm(d.offerLine).startsWith(p)) out.push(`offers.yml: session price_line "${d.offerLine}" does not start with "${p}"`);
  return out;
}
