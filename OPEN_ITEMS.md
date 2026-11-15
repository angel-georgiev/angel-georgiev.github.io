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
| U2 | uchene.com redirect | **Angel:** Cloudflare Redirect Rule on the uchene.com zone, 301 every path to `https://daskal.ai/book/`; apex and `www` records proxied (orange cloud). The Vercel project stays (Angel, 15 Nov 2026) as the old version of the page, used in his courses: remove only the uchene.com domain from it, keep the project and its repo |
| U4 | Book after-payment page | Done (Angel, 15 Nov 2026): the book Stripe link redirects to `https://daskal.ai/book/thanks/` after payment |
| U3 | English book page `/en/book/` | Later, with the English digital edition |

## Links to check in a browser (L1, 14 Nov 2026)

These 19 external links could not be checked by script: the sites block automated requests or are unreachable from the build container. They stay as links until someone opens them in a normal browser. Dead → keep the entry as plain text (comment out `url:` as done for the six dead links in `resume.yml`); alive → delete the row. Every other external link on the site was checked on 14 Nov 2026.

| Link | In | Why unchecked |
|---|---|---|
| https://bnr.bg/burgas/post/101323631/parvi-mladejki-startup-fest-shte-pomaga-v-izbora-na-profesia | `content/resume.yml:878` | bnr.bg sends it to old-news.bnr.bg, which refuses scripts |
| https://bnr.bg/horizont/post/101281606/angel-georgiev-znambe-iskame-da-pomognem-na-balgarskite-uchiteli | `content/resume.yml:907` | bnr.bg sends it to old-news.bnr.bg, which refuses scripts |
| https://bnr.bg/post/101474795/elektronen-almanah-na-balgarskoto-obrazovanie-sastavat-sled-konkurs-ot-znambe | `content/resume.yml:759` | bnr.bg sends it to old-news.bnr.bg, which refuses scripts |
| https://bnr.bg/sofia/post/101374863/40-ot-profesiite-na-badeshteto-predstoi-da-badat-otkriti-i-sazdadeni | `content/resume.yml:860` | bnr.bg sends it to old-news.bnr.bg, which refuses scripts |
| https://bnr.bg/sofia/post/101411649/da-nauchim-neshto-novo | `content/resume.yml:807` | bnr.bg sends it to old-news.bnr.bg, which refuses scripts |
| https://bnr.bg/sofia/post/101525827/obrazovatelnata-platforma-znambe-s-platforma-za-interaktivni-uroci | `content/resume.yml:705` | bnr.bg sends it to old-news.bnr.bg, which refuses scripts |
| https://digitalk.bg/career/2021/05/24/4212861_suzdavat_purviia_almanah_za_obrazovanie_v_podkrepa_na/ | `content/resume.yml:771` | site refuses scripts (403) |
| https://digitalk.bg/digitalk_awards/2025/03/12/4755597_transform_it_awards_25_ai_instrumentut_daskal_gpt/ | `content/daskal.yml:129, content/en/daskal.yml:138, content/resume.yml:288` | site refuses scripts (403) |
| https://digitalk.bg/entrepreneurship/2024/04/15/4614605_digitalka1_awards_24_kak_da_obuchim_uchiteli_i_za/ | `content/resume.yml:513` | site refuses scripts (403) |
| https://economy.bg/innovations/view/60990/Daskal-GPT-V-Bylgariya-startira-pyrviya-bezplaten-AI-instrument-za-uchiteli | `content/daskal.yml:128, content/en/daskal.yml:137, content/resume.yml:282` | site refuses scripts (403) |
| https://kmeta.bg/каква-е-ролята-на-изкуствения-интелек/ | `content/resume.yml:378` | site refuses scripts (403) |
| https://www.computerworld.bg/entrepreneurship/2021/01/21/4165754_znambe_startira_platforma_za_interaktivni_uroci/ | `content/resume.yml:813` | host unreachable from the build container |
| https://www.dnevnik.bg/specialproject/2020/12/09/4137321_internet_kaji_mi_kakuv_iskam_da_stana/ | `content/resume.yml:836` | site refuses scripts (403) |
| https://www.economy.bg/bulgaria/view/60750/Kak-shte-izglezhda-uchilishteto-na-bydeshteto-i-kakva-shte-e-rolyata-na-AI-v-nego | `content/resume.yml:312` | site refuses scripts (403) |
| https://www.economy.bg/management/view/61597/Irina-Radoeva-beshe-preizbrana-za-predsedatel-na-US-na-BAIT- | `content/resume.yml:234` | site refuses scripts (403) |
| https://www.economy.bg/management/view/62425/Angel-Georgiev-se-prisyedinyava-kym-ITCE | `content/resume.yml:193` | site refuses scripts (403) |
| https://www.economy.bg/marketing/view/60459/Sindeo%E2%80%9C-organizira-bezplatno-obuchenie-za-prilozhenie-na-AI-v-obrazovanieto- | `content/resume.yml:360` | site refuses scripts (403) |
| https://www.karieri.bg/news/34614_angel_georgiev_vseki_sam_suzdava_svoia_put | `content/resume.yml:970` | site refuses scripts (403) |
| https://www.plovdiv-press.bg/2025/06/12/%D0%B0%D0%BD%D0%B3%D0%B5%D0%BB-%D0%B3%D0%B5%D0%BE%D1%80%D0%B3%D0%B8%D0%B5%D0%B2-%D0%B5-%D0%B8%D0%B7%D0%B1%D1%80%D0%B0%D0%BD-%D0%B7%D0%B0-%D1%87%D0%BB%D0%B5%D0%BD-%D0%BD%D0%B0-%D1%83%D0%BF%D1%80%D0%B0/474393/ | `content/resume.yml:222` | site refuses scripts (403) |

## Phase 4: courses (scope added 15 Nov 2026)

Phase 4 now has two parts. Nothing is built yet; both start with a planning pass.

| # | Item | Status |
|---|---|---|
| C1 | **Course history**: the free and paid courses Angel has taught, shown on his own site (daskal.ai), with the option of moving course material here instead of linking elsewhere. Example: [Приложение на ИИ в образованието, януари 2025](https://sindeo.org/trainings/passed/prilozhenie-na-ii-v-obrazovanieto/) (Синдео, with Светлин Наков, free, online, recordings with lifetime access, 4 modules and an exam, supported by the SoftUni Foundation) | Open. Inventory started, see below |
| C2 | **The Paideia Method**, the free intro course (`content/course.yml`, placeholder only) | Open, as before |

**C1 inventory so far.** The résumé archive already lists 15 courses (`resume.yml`, type `training`: Синдео 2024–2026, СофтУни 2015–2023, Коалиция за медийна грамотност 2021). The Синдео "past trainings" list (checked 15 Nov 2026) has 8 courses with Angel as a teacher, with dates and listed prices:

| Course (Синдео) | With | Date | Listed price |
|---|---|---|---|
| Успешни стратегии и подходи за продуктивни учебни часове | — | 10 Mar 2024 | 50.62 € |
| Приложение на изкуствен интелект в образованието | Светлин Наков | 22 Jan 2025 | free (was 46.01 €) |
| Експертно използване на изкуствен интелект в образованието | Джеймс Йоловски | 23 Apr 2025 | 40.00 € |
| Работа с информация | Ирина Филипова | 7 Oct 2025 | 25.05 € |
| Комуникация и колаборация | Ирина Филипова | 21 Oct 2025 | 25.05 € |
| Създаване на съдържание | Ирина Филипова | 4 Nov 2025 | 25.05 € |
| Киберсигурност и защита | Ирина Филипова | 18 Nov 2025 | 25.05 € |
| Решаване на технически проблеми | Ирина Филипова | 2 Dec 2025 | 25.05 € |

**To decide in the planning pass:**
- Which courses to show (Синдео, СофтУни, Коалиция, others) and whether the course history is its own page or a section of `/resume/` or the course page.
- What each entry shows: title, date, format, free or paid, co-teachers, what participants learned, a link.
- **Moving material here (load-bearing):** the recordings and materials sit on Синдео and СофтУни, several were co-taught, and some were supported by the SoftUni Foundation. Moving them needs agreement from co-teachers and the platform owners. Until then, the site can list the courses and link to them.

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
