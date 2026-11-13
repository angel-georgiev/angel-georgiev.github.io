# Open items

Kept current by Claude Code. The **hand-maintained** list comes from PRD §13 plus gaps found while building. The **auto** section at the bottom is regenerated on every build from markers (`TBD`, `TBC`, `VERIFY`, `PLACEHOLDER`, `TO CONFIRM`, `[АНГЕЛ ПИШЕ]`) in `content/*.yml`.

On preview builds, placeholder strings render visibly (yellow, dashed). A production build (`SITE_ENV=production npm run build`) fails while any Phase 1 marker remains.

## Blocking go-live (affect a public page)

| # | Item | Where it shows | Status |
|---|---|---|---|
| G1 | Stripe after-payment redirect points to `angel-georgiev.github.io/support/thanks/` | Stripe dashboard | **At go-live (M6)** change it to `https://daskal.ai/support/thanks/` |
| A1 | Cloudflare Web Analytics token | Cloudflare dashboard + `site.yml` | **At go-live (M6), one time** (Angel, 12 Nov 2026): add `daskal.ai` under Web Analytics (JS snippet, not proxy), put the token in `site.yml → analytics.cloudflare_token`. Off until then |

## Resolved (12 Nov 2026, Angel)

| # | Item | Resolution |
|---|---|---|
| 3 | Photo consent / credits | DK photos only (`photos.yml`). Non-DK photos removed |
| 5 | Book cover | Flat cover taken from uchene.com → `src/assets/book/zelenata-kniga-cover.jpg` (471×650), registered in `site.yml → book.cover` |
| C1 | 404 page copy | `site.yml → pages.not_found` |
| C2 | Fallback link text on `/book/` and `/cv/` | `site.yml → pages.redirect` |
| C3 | Footer link labels "LinkedIn", "The Paideia Method" | Confirmed. URLs from `site.yml → links` (Substack returns 200; LinkedIn blocks automated checks with code 999, so that one is unverified by script) |
| C4 | "Скоро" on disabled CTAs | Confirmed (`site.yml → ui.soon`) |
| C5 | Award pill link | `/resume/#archive` (`landing.yml → hero.award_href`) |
| C6 | Footer photo credit | „Снимка: Даниел Колев / DK Photography“ from `photos.yml`, one per page |
| S1 | 900 € for every school format | Confirmed; VERIFY removed from `schools.yml` |
| 2 | Stripe Payment Link | `https://buy.stripe.com/28E3cufB39tQh2IeYe1ZS01` in `support.yml → product.stripe_link`. One link only, also for `/daskal/` in Phase 2 |
| R1 | Refund window | 2 days, not 7 (Angel, 12 Nov 2026): `support.yml` guarantee + FAQ, PRD §5.3. Must match the refund policy text in Stripe |
| C7 | Case-card labels on `/companies/` („Задача / Истинският проблем / Решение / Резултат“) | Confirmed by Angel (12 Nov 2026), `companies.yml → cases.labels` |
| C8 | Heading „Как мога да помогна още“ on `/support/` | Confirmed by Angel (12 Nov 2026), `support.yml → page.ladder.heading` |
| 2a | Stripe checkout dropdown | Angel chose "Работя в компания" (matches `support.yml`) |
| T1 | Test payment on the live Stripe link | Done by Angel (12 Nov 2026): works end to end |
| D1 | `/daskal/` copy | Approved by Angel (13 Nov 2026). 404 line in „вие“ form |
| 13 | Old daskal.ai paths | None needed (Angel, 13 Nov 2026): teachers used Daskal AI only at daskal.ai. Other old paths land on the 404 page, which mentions Daskal AI first |
| 11 | Daskal skill content, repo, licence | Done by Angel: `github.com/angel-georgiev/daskal.ai`, MIT, plugin + skill, `download/daskal.zip` |
| 12 | Skills/plugins on free plans | Angel checked the install steps in Nov 2026 (repo README): free accounts work on all six platforms. Re-check when the README changes |
| B1 | Book publisher: uchene.com cover shows "A5 books", content said „Локус“ | A5 books is an imprint of Locus. Use "A5 books" everywhere: `site.yml → book.publisher`, landing "Пиша", résumé bio and archive, `cv-master.yml` |
| P1 | EN pronunciation "AHN-gel geh-OR-gee-ev" | Confirmed. Rule: markers in English-only values never block the production build |

## Not blocking / later phases

| # | Item | Status |
|---|---|---|
| 15 | Angel reviews all Bulgarian copy | **Open**, not blocking for now (Angel, 12 Nov 2026) |
| 4 | 11 company logo files | **Open**, not in Phase 1 (Angel, 12 Nov 2026). Names show as grey text (`companies.yml → logos.items`) |
| 1 | Support price | Decided: 29 € (intro), 39 € regular |
| 6 | Founder or co-founder for Sindeo and Znam.be | Open (affects `press.yml`, Phase 3) |
| 7 | Full name of obr.education | Open (`cv-master.yml`, not built) |
| 8 | MSc Digital Business: institution, year | Open (`cv-master.yml`, not built) |
| 9 | Official titles Microsoft AB-730, AB-731 | Open (`cv-master.yml`, not built) |
| 10 | SoftUni "10 000+ students daily" | Omitted on the site |
| 14 | Analytics | **Decided: Cloudflare Web Analytics** (Angel, 12 Nov 2026). Code is ready; stays off until go-live (A1). Page views only, no button-click counts. Exception recorded in PRD §7.6 |
| 16 | 3+ consented testimonials | Later (Angel, 12 Nov 2026). Block hidden until then |
| 17 | "План в 1 страница" template | Angel, outside repo |
| 18–20 | School credit, invoicing, group size, schools page | Resolved |
| 21 | `/now` page | Backlog |
| S2 | Existing `index.html` on `main` was a Chatbase iframe (current bot). The first Pages deploy replaces it | Angel accepted on merge |
| S3 | CV print stylesheet and 2-page check (PRD §7.4) | Dropped by Angel (12 Nov): online only |

<!-- AUTO:START (generated by scripts/open-items.mjs on every build; do not edit by hand) -->
## Unresolved markers in content files

### Phase 1 files (block the production build)

_None._

### English-only values and later-phase files (information only)

_None._

<!-- AUTO:END -->
