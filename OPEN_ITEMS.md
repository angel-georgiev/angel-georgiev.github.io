# Open items

Kept current by Claude Code. The **hand-maintained** list comes from PRD §13 plus gaps found while building. The **auto** section at the bottom is regenerated on every build from markers (`TBD`, `TBC`, `VERIFY`, `PLACEHOLDER`, `TO CONFIRM`, `[АНГЕЛ ПИШЕ]`) in `content/*.yml`.

On preview builds, placeholder strings render visibly (yellow, dashed). A production build (`SITE_ENV=production npm run build`) fails while any Phase 1 marker remains.

## Live on daskal.ai (13 Nov 2026)

DNS on Cloudflare (DNS only, grey cloud) → GitHub Pages; Let's Encrypt certificate for daskal.ai, HTTPS enforced; `www`, `http` and angel-georgiev.github.io redirect (301) to https://daskal.ai. Production build (`SITE_ENV=production`) with 0 open markers. Google Workspace MX/SPF records unchanged. Domain verified for the GitHub account (TXT `_github-pages-challenge-angel-georgiev`).

## Still to do after go-live

Nothing blocking. Open but not blocking: testimonials (16), below.

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
| G1 | Stripe after-payment redirect | Changed to `https://daskal.ai/support/thanks/` by Angel (13 Nov 2026) |
| 15 | Bulgarian copy review | Done by Angel (13 Nov 2026). Last edits: school-training sentence aligned on landing, `/support/` and `/schools/`; „Какво е Даскал AI“ + Даскал GPT origin (end of 2024) |
| 4 | Company logo files | Closed (Angel, 13 Nov 2026): no logos. `/companies/` keeps the organisation names as text |
| A1 | Cloudflare Web Analytics | On since 13 Nov 2026: site `daskal.ai`, token in `site.yml → analytics.cloudflare_token`. Page views only; not on `/support/thanks/` or redirect pages |
| B1 | Book publisher: uchene.com cover shows "A5 books", content said „Локус“ | A5 books is an imprint of Locus. Use "A5 books" everywhere: `site.yml → book.publisher`, landing "Пиша", résumé bio and archive, `cv-master.yml` |
| P1 | EN pronunciation "AHN-gel geh-OR-gee-ev" | Confirmed. Rule: markers in English-only values never block the production build |
| 6 | Founder or co-founder for Sindeo and Znam.be | „Основател“ / "Founder" everywhere (Angel, 13 Nov 2026) |
| 7–9 | obr.education full name, MSc Digital Business details, Microsoft AB-730/731 titles | Closed (Angel, 14 Nov 2026): no full CV on the site, `cv-master.yml` will not be built |

## Phase 5 repoint: uchene.com → daskal.ai/book/ (14 Nov 2026)

| # | Item | Status |
|---|---|---|
| U1 | `/book/` page on daskal.ai | Built from the uchene.com copy (write-article pass, approved by Angel). Same Stripe link (`book.yml → product.stripe_link`), confirmation stays in Stripe, Angel ships. 300+ pages (book has 325). Signed-copy offer dropped (not running). No privacy/terms pages: Angel collects no personal data on the site |
| U2 | uchene.com redirect | Done (Angel, 15 Nov 2026), checked: `uchene.com`, `www.uchene.com`, `http://` and any path 301 to `https://daskal.ai/book/`, query strings kept. The old Vercel project stays (Angel) as the earlier version of the page, used in his courses; only the domain was removed from it |
| U4 | Book after-payment page | Done (Angel, 15 Nov 2026): the book Stripe link redirects to `https://daskal.ai/book/thanks/` after payment |
| U3 | English book page `/en/book/` | Later, with the English digital edition |

## Links checked in a browser (L1, done 17 Nov 2026)

Angel opened the 19 links that scripts could not check. 12 work and stay as links (digitalk.bg ×3, economy.bg ×5, kmeta.bg, dnevnik.bg, karieri.bg, plovdiv-press.bg). 7 are dead and are now plain text in `resume.yml`: the six old bnr.bg articles (they forward to old-news.bnr.bg) and the computerworld.bg article.

## Contact page (17 Nov 2026)

`/contact/` and `/en/contact/`: invitations for talks and panels, moderating and hosting, trainings and interviews. Copy approved by Angel (write-article pass). Each button opens a pre-filled email; no form, nothing stored on the site; no fees on the page. Reply promise: 2 working days. Menu order: … · Резюме · Контакт (last). The landing „Лекции, панели и интервюта“ card now links here.

## Hidden pages

| # | Item | Status |
|---|---|---|
| H1 | `/companies/` and `/en/companies/` | Hidden since 15 Nov 2026 (Angel): `site.yml → live.companies: false`. Not built (404), no nav item, no landing card, no share image, not in the sitemap. Content, view and photo stay in the repo. To publish: set it to `true` and merge. The landing hero button and the „За кого не е“ line on `/support/` were reworded while hidden; check them when it goes live |

## Not blocking / later phases

| # | Item | Status |
|---|---|---|
| 1 | Support price | Decided: 29 € (intro), 39 € regular |
| 10 | SoftUni "10 000+ students daily" | Omitted on the site |
| 14 | Analytics | Cloudflare Web Analytics, on since go-live (see A1). Exception recorded in PRD §7.6 |
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
