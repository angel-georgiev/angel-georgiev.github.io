# PRD — daskal.ai: Angel Georgiev's personal site

**Version:** 2.0 · 8 Nov 2026 (replaces v1.0 of 25 Oct)
**Owner:** Angel Georgiev (angel@daskal.ai)
**Builder:** Claude Code
**Scope of this PRD:** Phases 1 and 2. Later phases are context only and **out of scope**.

**v2.5 (12 Nov):**
- Photos: Daniel Kolev only, one photo per page (see `photos.yml`). All other photos removed.
- Landing H1: three fixed lines; the whole last line rotates; zero layout shift.
- `/cv/` replaced by `/resume/` ("Резюме"): bio, photo downloads, browsable archive of 150 items. Career history moves to LinkedIn.
- Public email is now **angel@daskal.ai** everywhere (Angel has it working). The companies card on the landing uses the same text-link style as the other cards.
- Nav: Помощ · Училища · Компании · Резюме. The SoftUni hybrid case and the logo list now live in `companies.yml`.

**v2.4 (12 Nov):**
- Final Bulgarian language and anti-slop pass on all content files.
- Nav in `site.yml` matches §4. CV role: "Обучител · Консултант · Автор".
- CV header photo: framed 4:5 rectangle instead of a circle.
- New photos: school photos on /schools/ only, company photos on /companies/ only.

**v2.3 (11 Nov):**
- New `/schools/` page (light only).
- All page copy passed through Angel's write-article skill: no em dashes, active voice, both audiences (schools and companies).

**v2.2 (11 Nov):**
- Landing rebuilt: dark only, rotating verb, general audience (people and teams), and the 4-card offer grid.
- New `/companies/` page (light only), with the diagnostic at 900 €/day and a free 30-min first call.
- The 1:1 product is renamed "Помощ по конкретен въпрос", with the CTA "Поискайте моята помощ".
- Fixed theme per page; the toggle is removed.

**v2.1 (8 Nov):**
- Routes are now `/support/` and `/support/thanks/`.
- Teacher-first H1.
- Support offer now includes the written plan, a refund guarantee, an audience / not-for section, a proof block, a priced CTA, an FAQ, and Stripe settings.
- New: founding sessions (§5.3a); CV case-study format.

**What changed from v1.0**
- The site now starts in Bulgarian only.
- Positioning is now "consultant in AI, technology, learning and teaching".
- A paid **support session** has been added (Stripe link).
- `/daskal` now distributes Daskal AI as a **skill**.
- The English pages, press kit, media list and course move to later phases.

---

## 0. How to use this document (instructions for Claude Code)

1. Read this PRD in full, then read every file in `content/`. Open `docs/mockup-v5.html` in a browser: it is the **visual reference** for layout, spacing, colours and components (switch pages in the black top bar). If the mockup and `content/*.yml` disagree, the YAML wins. `docs/landing-research.md` is background only.
   - **All page copy comes from `content/*.yml`.** Do not write new marketing copy, numbers or claims.
   - If something is missing, render a visible placeholder and list it in `OPEN_ITEMS.md`.
2. Handle strings marked `TBD`, `TBC`, `VERIFY`, `PLACEHOLDER` or `[АНГЕЛ ПИШЕ]` as follows:
   - Render them visibly on preview builds.
   - List them in `OPEN_ITEMS.md`.
   - They block the production deploy (§11).
3. Fields marked `phase: 2` stay hidden until Phase 2.
4. Work milestone by milestone (§10). At the end of each one, stop, run the checks (§11) and summarise for Angel.
5. Keep the site editable by a non-developer: content lives in YAML, and no copy is hard-coded in components.

---

## 1. Purpose

A Bulgarian personal site for Angel as a **consultant in AI, technology, learning and teaching**. It does three jobs:

1. **Shows who Angel is.** The landing page plus a CV that replaces the LinkedIn export and prints as a PDF.
2. **Offers a paid "сесия за подкрепа" of one school class hour (up to 45 minutes) (support session).** The site describes it as support, never as coaching.
3. **Phase 2: brings back Daskal AI** for the teachers who still arrive at daskal.ai. Daskal comes back as a free skill, with a support session as an optional next step.

### Audience
- Phase 1: Bulgarian professionals, organisations and teachers.
- Phase 2: teachers specifically, through /daskal.
- Most visitors arrive from a link and scan before reading. They decide in about 10 seconds whether to stay, and about 74% of attention falls in the first two screens (NN/g).

### The load-bearing assumption
A visitor who arrives knowing nothing must understand **who Angel is and what he can help with** from the first screen. They must also be able to reach either the CV or the support session in one click.

---

## 2. Phases

| Phase | Scope | In this PRD? | Where |
|---|---|---|---|
| **1. Bulgarian landing + schools + companies + résumé + support** | `/` (BG), `/schools/`, `/companies/`, `/resume/` (+ `/cv/` redirect), `/support/`, `/support/thanks/`, `/book/` redirect, 404 | ✅ | angel-georgiev.github.io (preview) |
| **2. Daskal revival** | `/daskal/` (skill install, fallback, support entry), Daskal banner on the landing page, legacy redirects, **go live on daskal.ai** | ✅ | → **daskal.ai** at the end of Phase 2 |
| 3. English + profile layer | `/en/` landing, `/en/resume/`, press kit (`content/press.yml`), media list | ❌ later | daskal.ai |
| 4. Course | Free intro course "The Paideia Method" (`content/course.yml`), book as textbook | ❌ later | daskal.ai/course |
| 5. English digital book + paid course | — | ❌ later | uchene.com is then repointed (Angel's own task) |

**Architecture must not block later phases:**
- Use Astro i18n with `defaultLocale: 'bg'` and `prefixDefaultLocale: false`, so Bulgarian lives at the root and English is added later under `/en/`.
- Keep `press.yml`, `course.yml` and the EN fields in the repo, unused.

---

## 3. Site map and page rules

| Route | Phase | Language | Theme | Notes |
|---|---|---|---|---|
| `/` | 1 | BG | **Dark only** | Landing; no third-party brand logos |
| `/schools/` | 1 | BG | **Light only** | Schools: the full-day AI training (900 €, 1 credit, SmarTest) |
| `/companies/` | 1 | BG | **Light only** | Companies: consulting + training, processes with and without AI |
| `/resume/` | 1 | BG | Light only | Bio, photo downloads, archive. `/cv/` redirects here |
| `/support/` | 1 | BG | **Dark only** | "Помощ по конкретен въпрос" page with the Stripe button |
| `/support/thanks/` | 1 | BG | Dark only | Stripe post-payment redirect; `noindex` |
| `/book/` | 1 | — | — | Redirects to https://uchene.com |
| `/404.html` | 1 (map in 2) | BG | Light | Legacy daskal.ai path map added in Phase 2 |
| `/daskal/` | 2 | BG | **Dark only** | Skill install + fallback + support entry |

- **Language:**
  - `<html lang="bg">` everywhere.
  - **No language switch** in Phases 1–2. Add it in Phase 3, when `/en/` exists.
  - Never redirect automatically based on browser language.
- **`/book/`:** a static page that sends the visitor to uchene.com in four ways at once:
  - a meta refresh to https://uchene.com;
  - a JS `location.replace` to the same URL;
  - a canonical tag pointing to uchene.com;
  - a visible fallback link.

  Exclude it from the sitemap.
- **Nav (header):** Помощ (`/support/`) · Училища (`/schools/`) · Компании (`/companies/`) · CV. "Даскал AI" is added in Phase 2.

---

## 4. Content sources

| File | Feeds | Phase |
|---|---|---|
| `content/site.yml` | person, links, nav, UI strings, numbers, book facts (use the `bg` fields) | 1 |
| `content/landing.yml` | `/` | 1 |
| `content/schools.yml` | `/schools/` | 1 |
| `content/companies.yml` | `/companies/` | 1 |
| `content/resume.yml` | `/resume/` | 1 |
| `docs/cv-master.yml` | not built (source for tailored CVs) | – |
| `content/support.yml` | `/support/`, `/support/thanks/` | 1 |
| `content/offers.yml` | the offer ladder: session + school training (on `/support/`, with short links from the landing page and CV) | 1 |
| `content/photos.yml` + `public/photos/` | every photo: file, alt text, focal point, credit, where it is used | 1 |
| `content/daskal.yml` | `/daskal/` | 2 |
| `content/press.yml`, `content/course.yml` | — (kept for Phases 3–4) | later |

### Content rules
- **Numbers** are always shown separately: 20 000+ обучени · 20 000+ ученици с кариерна диагностика · 85 епизода · 100+ медийни участия.
  - Never show a combined total.
  - Never use "трансформирах" or "transformed".
  - In Bulgarian, write numbers with a non-breaking space: `20 000+`.
- **Awards:**
  - List personal awards separately from awards won by ventures Angel founded.
  - Do not show awards won by employers.
  - Every award links to its source.
- **Support wording:** always "сесия за подкрепа". Never "коучинг" or "менторство".
- Do not use animated counters, stock photos or unnamed testimonials.
- **Photos:** pages reference a photo by its `id` in `photos.yml`. Generate responsive AVIF/WebP from the originals (never upscale; crop around `focal`). Show the credit in the press kit and in the footer (`Снимки: …`). Keep the high-res originals downloadable only from the press kit.

---

## 5. Page specifications

### 5.1 Landing — `/` (`landing.yml`) · Phase 1 · dark only
Rebuilt on 11 Nov 2026 after research on active personal-brand homepages (`landing-research.md`). Sections, top to bottom:
1. **Header:** wordmark ("Ангел Георгиев" with a gold full stop) and nav. No theme toggle.
2. **Hero, two columns:**
   - Left column:
     - gold award pill;
     - H1 on **three fixed lines**: `h1_static_lines` (lines 1–2, never wrap) and line 3 = one item of `h1_rotating` ("работят с AI." / "учат с AI." / "преподават с AI." / "създават с AI."), gold, 2.4 s, fade/slide 0.3 s, `aria-live="off"`, first item only under `prefers-reduced-motion`;
     - **No layout shift (hard rule):** line 3 is a grid box that stacks all items invisibly (`visibility:hidden` ghosts) under the visible one, with `white-space:nowrap`, so its width and height always equal the longest item. Size the H1 so "преподават с AI." fits at 390 px. The H1 height and the position of everything below it must be identical for all four items (test this in CI with Playwright);
     - lede with the bold phrase;
     - primary CTA ("Поискайте моята помощ", gold) and secondary CTA ("Обучение за вашия екип", outline), each with a small sub-line;
     - "Вижте резюмето ми" text link → `/resume/`.
   - Right column: the photo (`desk-smile`, eye contact, height min(640px, 100vh − 150px)), with the "20 000+" gold badge.
   - Mobile: text first, photo after.
3. **Numbers strip:** 4 static numbers, gold left border.
4. **Heritage motif divider.**
5. **Преподавам · Говоря · Пиша:** 3 cards.
6. **"Как да работим заедно" (`#offers`):** 4 cards from `offers.yml`, in a 2×2 grid.
   - **Session:** featured, gold card.
   - **School training.**
   - **Companies:** a teaser with **only a button** to `/companies/`, and no price.
   - **Events and media.**
7. **"Вижте ме в действие":** 4 clip cards linking out, plus a line of other outlets.
8. **Book block.**
9. **Footer.**
10. **Daskal banner** (Phase 2).

Hero text and both CTAs must fit above the fold at 1440×900 and 390×844. **One moving element per screen** (the rotating verb). No "now" / "this month" blocks: a `/now` page is in the long-term backlog only.

### 5.1b Schools — `/schools/` (`schools.yml`) · Phase 1 · light only
The same layout system as `/companies/`:
1. Hero: kicker, H1 with highlight, lede, partner line, CTAs (mailto + anchor), photo `with-teachers`.
2. Proof numbers strip.
3. "Програмата": a for-whom line plus 4 blocks (confirmed). Format: one full day in school, two days × 4 h, or online in real time (all 8 academic hours together). Then "Проектът след обучението": short text plus the 3 project parts.
4. "Какво включва": a list plus the price card (900 €).
5. "Как протича": 4 steps.
6. "Защо мен": a linked list.
7. A line for individual teachers, linking to `/support/`.
8. Final gold CTA.

The school card on the landing page links to `/schools/`.

### 5.1a Companies — `/companies/` (`companies.yml`) · Phase 1 · light only
1. **Header.**
2. **Hero:**
   - kicker, H1 (with the gold highlight), lede;
   - "Поискайте среща" (mailto) + "Вижте услугите ↓" (anchor);
   - the photo `vsm-teaching`.
3. **Logo strip** (the same component as on the CV).
4. **"Как работя":** 3 numbered steps.
5. **"Услуги":** 3 cards.
   - **Диагностика на процесите:** featured, **900 € for one day**, the same price as the school training.
   - **AI в работата на екипа:** по запитване.
   - **Внедряване с подкрепа:** по запитване.

   Followed by an "Също" line.
6. **"От практиката":** 2 case cards (task / real problem / decision / result) plus the credentials chips.
7. **Final gold CTA block:** "Първият разговор е безплатен и отнема 30 минути" + "Поискайте среща".
8. **Footer.**

All CTAs are mailto links with a prefilled subject. No forms, no Stripe.

### 5.2 Резюме — `/resume/` (`resume.yml`) · Phase 1 · light only
Replaces the CV page (decided 12 Nov 2026). The full career history lives on **LinkedIn only**; this page is easy to keep current. `/cv/` redirects to `/resume/`. No PDF download, no experience timeline, no credentials list.
- **Section order:** header → `#bio` → `#photos` → `#archive`.
- **Header:** `portrait-light` as a framed 4:5 rectangle (240 px desktop, 180 px mobile, radius 18 px, gold block offset 14 px behind it, bottom-right; never circular), name, role line, then the bio box. Buttons: LinkedIn (primary, "Пълният професионален опит е в LinkedIn →") and the email.
- **Bio box:** heading "Кратко резюме", the third-person paragraph from `bio.text` (about 130 words, for organisers to paste), a "Копирайте текста" button (Clipboard API; label changes to "Копирано" for 1.6 s) and the small note.
- **Photos to download:** 4 cards from `photos.items` (portrait light, portrait dark, square, desk-smile): thumbnail, label, "JPG · W×H", and an "Изтеглете" link to the **full-resolution original** with the `download` attribute. Credit line above the grid.
- **Archive:** every item in `archive.items`, grouped by year (newest first, then by month), each row = type tag, title (linked when `url` exists), "outlet · month year".
  - Sticky filter bar: search input (matches title + outlet, case-insensitive) and filter chips with counts (`archive.filters`; hide a chip whose count is 0).
  - Hide a year heading when all its rows are filtered out; show `archive.empty` when nothing matches.
  - Works without JavaScript (all rows visible). No browser storage.
  - Type tags: tv, radio, press, talk, video, training, award, article, book. Award rows have no outlet.
- **JSON-LD:** `Person` with `sameAs` (LinkedIn, Substack, GitHub, TEDx) and `image` = `portrait-light`.
- **Source data and upkeep:** the archive comes from the project docs "Media Appearances" and "Awards". New items are one line each in `resume.yml`. `docs/cv-master.yml` is the old CV data: **not built**, kept as source for tailored CVs.

### 5.3 Support session — `/support/` (`support.yml`) · Phase 1
**One product, one price, one Stripe Payment Link,** entered from the landing page, the CV and (in Phase 2) `/daskal/`. The offer: **one class hour online (up to 45 min; may end earlier) + a written „План в 1 страница“ within 24 h + a no-questions refund within 2 days.** *(Changed from 7 days by Angel, 12 Nov 2026.)*

- **Page order** (NN/g commitment levels: show relevance and proof before asking for payment):
  1. eyebrow, H1, intro;
  2. **"Какво получавате"** (3 items: session, plan, refund);
  3. "С какво мога да помогна" (5 items; the Daskal item has `phase: 2`);
  4. **"За кого е" / "За кого не е"**, shown side by side on desktop and stacked on mobile;
  5. **"Защо мен"** proof block: 4 items, 3 of them linking to evidence on `/resume/#archive`;
  6. **testimonials**: rendered only when `proof.testimonials.items` has ≥ `min_to_show` (3) entries with `consent: true`; otherwise the block is not rendered at all (no empty frame);
  7. **first CTA**;
  8. "Как работи" (4 numbered steps);
  9. **"Без риск"** guarantee box;
  10. **price** in large type with "includes" line;
  11. FAQ (`<details>` items);
  12. **second CTA**;
  13. **"Как мога да помогна още"**: the offer ladder from `offers.yml`, as two cards. The session card links up to the CTA. The school-training card shows its price and a mailto CTA. Never show the group size or a per-teacher price.

  There are no other CTAs on this page (no newsletter, no LinkedIn button). The footer stays as is.
- **CTA label:** `cta.button` shows the price ("Плати и запази сесия за подкрепа — 29 €"), taken from the same value as `price.value`. A build check fails if the two prices differ.
- **Placeholders:** while `stripe_link` is `TBD`, both CTAs render disabled with the label "Скоро" on preview builds. This blocks the production deploy.
- **Stripe setup:** Angel does this in the Stripe dashboard (`product.stripe_settings`):
  - `locale=bg`;
  - name and email collected;
  - a required dropdown "Вие сте" (Учител / Организация / Друго) plus the required text field "С какво да помогна?";
  - automatic receipts;
  - refund policy and contact shown at checkout;
  - redirect to `/support/thanks/` after payment.
  - Optional: a second link at the same price used only on `/daskal/`, to see where buyers come from.
- **The gate:** after payment, Angel contacts the buyer personally within 1 working day and sends a booking link. The site has **no calendar embed and no forms**. If volume grows, a later option is Calendly + Stripe (pay at booking).
- **`/support/thanks/`:**
  - H1 and text;
  - the **fallback line** (spam folder + email);
  - the **"Докато чакате"** preparation prompt;
  - back link.

  `noindex`, excluded from the sitemap, no tracking pixels.
- **JSON-LD:** `Service` with `offers` (`price`, `priceCurrency: EUR`) once the price is set, and a `hasMerchantReturnPolicy`-style refund note in the description text.

### 5.3a Founding sessions (before launch — Angel's process, outside the code)
Before going live, Angel runs **5–10 free sessions with warm contacts**, following his founding-sessions kit (kept outside this repo). They produce three things:
1. **Named testimonials** with consent, which fill `support.yml → proof.testimonials`.
2. **Facts for the price research:** what the problem already costs people in time and money, and which questions keep coming up.
3. **Real "План в 1 страница" examples.** With permission, one anonymised example can later be shown on `/support/`.

Testimonials from free sessions are genuine, but they are not presented as paid. Claude Code builds nothing for this step. The testimonials block simply renders once the data exists.

### 5.4 Daskal — `/daskal/` (`daskal.yml`) · Phase 2
Dark only. Sections, top to bottom:
1. **Hero.**
2. **Story:** facts, plus "why it comes back as a skill".
3. **Install:** tabs **Claude · ChatGPT · Чрез AI агент**.
   - Each tab has: an availability note, numbered steps, screenshot slots, and a copy block where one is defined.
   - A download button for the skill `.zip` and a link to the GitHub repo.
   - The Claude tab also links to the Claude skills directory listing, once the skill is published there.
4. **Fallback ("като проект"):** steps plus a copyable instructions block. Place it **directly after the install tabs, not at the bottom**: free ChatGPT users will need it.
5. **Support entry:** gold card linking to `/support/`. The page states that installing is fully covered by the written guide and needs no paid help.
6. **"Писаха за Даскал AI":** text links.
7. **Next links.**

Every copy block has a Copy button that announces the result through `aria-live`.

**Separate Phase 2 deliverable: the skill repository.**
- Repo: `angel-georgiev/daskal-skill` (name TBC), public.
- Structure: a skill folder with `SKILL.md` (frontmatter `name`, `description`) plus reference `.md` files, a `README.md` in Bulgarian, a `LICENSE` and a GitHub Release with the zipped skill folder.
- Content: Angel writes the skill. Claude Code scaffolds the structure and the release workflow only.
- Platform facts checked on 8 Nov 2026:
  - Claude Free has skills (since Feb 2026), but whether free users can upload a custom skill was **not confirmed**.
  - ChatGPT Skills are on paid plans only, according to a secondary source.
  - Re-verify both before launch and update the availability notes in `daskal.yml`.

### 5.5 404 and legacy redirects
- `404.html` shows a friendly Bulgarian 404 with links to `/` and `/support/` (and `/daskal/` once Phase 2 ships).
- In Phase 2, add a path map from `daskal.yml → legacy_redirects.paths`. A matching path triggers `location.replace(target)`.

---

## 6. Design system

### 6.1 Colour — "Тракийско злато" (Thracian gold)
Implement these as CSS custom properties under `:root[data-theme="light"|"dark"]`. All pairs pass WCAG 2.2 AA.

| Token | Dark | Light | Notes |
|---|---|---|---|
| `--bg` | `#10261D` | `#F4EFE4` | |
| `--text` | `#F4EFE4` (13.91:1) | `#10261D` (13.91:1) | |
| `--text-muted` | `#C9D3CC` | `#4F5E57` (5.96:1) | CI checks dark muted ≥ 4.5:1 |
| `--gold` | `#D9A441` (7.09:1) | fills only | Gold text on parchment fails (1.96:1) |
| `--gold-text` | `#D9A441` | `#7A5A14` (5.55:1) | |
| `--link` | `#5CC495` (7.43:1) | `#237653` (4.83:1) | |
| `--brand` | `#2C8861` | `#2C8861` | Fills, buttons, borders and icons only; never text |
| `--on-gold` | `#10261D` | `#10261D` | |
| `--surface` | `#16332A` | `#FFFFFF` | |
| `--border` | `#2A4A3D` | `#DDD5C4` | |

- Approximate proportions: 60% neutral, 30% forest/brand, 10% gold.
- Success, warning and error colours are defined separately from the brand colours.
- **Heritage motif:** an original SVG divider (a gold ring with a mint centre on a gold line, repeated), `aria-hidden`. Place it under the hero and above the footer. It must not copy any specific traditional or museum artwork.

### 6.2 Theme behaviour (revised 11 Nov 2026)
Each page has **one fixed theme**: `data-theme` is set server-side, with no toggle and no `prefers-color-scheme` switching.
- **Dark:** `/`, `/support/`, `/support/thanks/`, `/daskal/`.
- **Light:** `/schools/`, `/companies/`, `/resume/`, `/404`.

Keep both token sets in CSS, so a page's theme can change with one attribute.

### 6.3 Typography
- **Fonts:**
  - **Sofia Sans** (variable, wght 1–1000, italic; Lettersoup, OFL) for body text and UI.
  - **Sofia Sans Condensed** (weight 800–900) for H1/H2.
- **Loading:**
  - Self-host via `@fontsource-variable/sofia-sans` and `@fontsource-variable/sofia-sans-condensed` (v5.3.0).
  - Subsets: cyrillic, latin, latin-ext.
  - Preload only the body roman file.
  - Use `font-display: swap` with a fallback font adjusted via `size-adjust`.
- Verified: Sofia Sans uses Bulgarian Cyrillic letterforms by default (the Russian forms sit behind `locl` RUS only).
- **Sizing:**
  - Body 18 px (17 px on mobile), line height 1.5, maximum line length 66ch.
  - Type scale ratio 1.25.
  - H1: `clamp(2.25rem, 6vw, 4rem)`, line height 1.02.
- **No serif fonts.**

### 6.4 Layout and components
- **Layout:**
  - A single reading column: about 720 px wide for text, 1120 px for grids.
  - 16 px gutters on mobile, and no horizontal scrolling at a 320 px width.
- **Cards:** used only for the doors, areas, perspectives and the support/install blocks.
- **Photos:** real photos only, with a consistent warm grade.
- **Icons:** none, or inline Lucide icons at a single stroke weight.
- **Motion:**
  - Transitions of 150 ms or less.
  - All motion off under `prefers-reduced-motion`.
  - No parallax, autoplay or counters.
- **Accessibility minimums:**
  - Interactive targets at least 24×24 px.
  - Focus never hidden behind sticky elements.

---

## 7. Technical requirements

### 7.1 Stack
- **Astro 7.x** (7.4.2 at time of writing), `output: 'static'`, no UI framework.
- Vanilla JS only for the theme toggle, copy buttons and 404 mapping.
- i18n: `defaultLocale: 'bg'`, `locales: ['bg','en']`, `prefixDefaultLocale: false`. EN routes come later.
- Content collections with a zod schema per YAML file. A typo in the YAML fails the build.
- `@astrojs/sitemap`.
- npm scripts: `dev`, `build`, `preview`, `check`. `check` runs `astro check`, a link check, axe and a contrast check.

### 7.2 Repository and deploy
- **Site repo:** `angel-georgiev/angel-georgiev.github.io`. Deploy runs on GitHub Actions (`withastro/action` → `actions/deploy-pages`).
- **End of Phase 2 — going live:**
  1. Add `public/CNAME` containing `daskal.ai`.
  2. Angel sets DNS: apex A/AAAA records for GitHub Pages, and `www` as a CNAME to `angel-georgiev.github.io`.
  3. Verify the domain and turn on Enforce HTTPS.
  4. Switch `site` in a single config value.
- **Skill repo:** `angel-georgiev/daskal-skill`. A GitHub Action builds the release zip on tag.

### 7.3 SEO and sharing
- `<title>` and meta description come from each page's YAML.
- **JSON-LD:**
  - Landing and CV: `ProfilePage` with `Person` as main entity (name "Ангел Георгиев", alternateName "Angel Georgiev", jobTitle, image, email, `sameAs`: LinkedIn, Substack, TEDx, uchene.com), plus `dateModified`.
  - CV also gets `Book` (isbn, inLanguage bg, publisher, url uchene.com).
  - `/support/`: `Service` (provider Person, areaServed BG, `offers` with price once set).
  - `/daskal/` (Phase 2): `SoftwareApplication` or `CreativeWork` with `isAccessibleForFree: true`.
- **Open Graph:** a 1200×630 image per page, generated at build time.
- `robots.txt`; sitemap excludes `/book/`, `/404` and `/support/thanks/`. Every page has a canonical URL.

### 7.4 CV print stylesheet
- A4 page with margins of 14 mm × 16 mm.
- Ink on white; URLs printed after links; nav, toggles and footer hidden.
- `<details>` expanded; `break-inside: avoid` on items.
- Target: 2 pages. CI checks this with Playwright `page.pdf()` and warns if the CV runs longer.

### 7.5 Performance
- Core Web Vitals at p75: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.
- Lighthouse mobile ≥ 95 in all four categories.
- Landing page ≤ 500 KB excluding fonts.

### 7.6 Privacy
- No cookies and no third-party scripts on page load.
- The Stripe Payment Link is a plain outbound link: no embedded Stripe.js.
- Analytics stay off until Angel decides. If added, use a cookieless tool such as GoatCounter.
- **Decision (Angel, 12 Nov 2026):** Cloudflare Web Analytics, cookieless, page views only. This is the one allowed exception to "no third-party scripts": the beacon from `static.cloudflareinsights.com`, loaded as `type="module"` (deferred), never on `/support/thanks/`. Token in `site.yml → analytics.cloudflare_token`; empty = off.
- Contact is by mailto only. No forms.

---

## 8. Accessibility (WCAG 2.2 AA)
- Semantic landmarks, one H1 per page, a skip link ("Към съдържанието").
- Contrast tokens as in §6.1. CI fails the build below 4.5:1 for text and 3:1 for UI elements.
- Full keyboard support, with a visible 2 px focus ring.
- Copy buttons announce the result through `aria-live="polite"`.
- Tabs on `/daskal/` follow the WAI-ARIA tabs pattern.

---

## 9. Assets checklist (supplied by Angel)

| Asset | Phase | Spec |
|---|---|---|
| Portrait (see project doc `claude/headshot.md`) | 1 | 2000 px or larger, JPG |
| 11 company logos | 1 | Official SVG/PNG |
| Book cover | 1 | Flat 2D image |
| Support price + Stripe Payment Link | 1 | — |
| Daskal skill content + fallback instructions | 2 | Bulgarian `.md` |
| Install screenshots (Claude, ChatGPT) | 2 | PNG, current UI |
| Old daskal.ai paths | 2 | List |

---

## 10. Milestones

1. **M1 — Scaffold:**
   - Astro project with BG at the root (i18n set up for later EN);
   - theme system, tokens and fonts;
   - base layout, header and footer;
   - Actions deploy to angel-georgiev.github.io.
2. **M2 — Landing (`/`), Schools (`/schools/`), Companies (`/companies/`):** as specified in §5.1, §5.1b and §5.1a, plus OG images.
3. **M3 — Резюме (`/resume/`):** bio with copy button, photo downloads, filterable archive, JSON-LD, `/cv/` redirect.
4. **M4 — Support:** `/support/` (full page order, guarantee, FAQ, hidden testimonials block, two CTAs), the thank-you page, `/book/` redirect, 404, sitemap and robots, CI checks. **This ends Phase 1.**
   - *In parallel (Angel):* founding sessions (§5.3a), price research, Stripe setup.
5. **M5 — Daskal:**
   - `/daskal/` page and the landing banner;
   - Daskal item on `/support/`;
   - legacy redirect map;
   - skill repo scaffold and release workflow.
6. **M6 — Go live on daskal.ai,** once the open items are resolved. **This ends Phase 2.**

---

## 11. Acceptance criteria

**Content**
- [ ] All visible strings come from `content/*.yml`; components contain no hard-coded copy.
- [ ] No hype words, no combined reach number, and no "коучинг" in any page copy.
- [ ] Every award links to its source.
- [ ] `OPEN_ITEMS.md` is current. **M6 is blocked while any item that affects a public page is open,** including the price and the Stripe link.

**Behaviour**
- [ ] Landing, `/support/` and `/daskal/` are always dark. `/schools/`, `/companies/` and `/resume/` are always light. No theme toggle anywhere.
- [ ] The landing companies card shows only the teaser text and the button to `/companies/`.
- [ ] The H1 verb rotates, and stays static under reduced motion.
- [ ] Both support CTAs open the Stripe Payment Link. After a test payment, Stripe shows Bulgarian checkout, sends a receipt and redirects to `/support/thanks/`.
- [ ] The CTA label and the price block show the same price (build check).
- [ ] The testimonials block is absent with fewer than 3 consented entries and appears with 3 or more.
- [ ] On `/support/`, the result, audience and proof appear before the first CTA. The guarantee and price appear before the second.
- [ ] The guarantee, response time (1 working day) and plan delivery (24 h) read the same wherever they appear: landing teaser, `/support/`, thank-you page, `/daskal/`.
- [ ] `/book/` reaches uchene.com within 1 s, including with JS disabled.
- [ ] CV prints on 2 A4 pages or fewer.
- [ ] Copy buttons copy exact plain text.

**Quality**
- [ ] Lighthouse mobile ≥ 95 in all four categories, on every page.
- [ ] axe reports 0 violations; contrast passes in both themes.
- [ ] No horizontal scroll at 320 px. The hero and both doors fit above the fold at 390×844.
- [ ] 0 broken internal links. HTML and JSON-LD validate.
- [ ] Cyrillic renders with Bulgarian letterforms (visual check on д, л, в, ж, и, к).

---

## 12. Out of scope (Phases 1–2)
- English pages, press kit, media list (Phase 3).
- Course (Phase 4); payments for anything other than the support session.
- A booking calendar on the site; forms of any kind.
- Writing the Daskal skill content (Angel writes it; Claude Code only scaffolds the repo).
- Rebuilding the book page; uchene.com stays as it is.

---

## 13. Open items
Claude Code copies these into `OPEN_ITEMS.md` and keeps the file current.

1. ~~Support-session price~~ decided: **€29** for one class hour (up to 45 min), Angel 8 Nov 2026. Reviewed using the founding-sessions thresholds (`founding-sessions-kit.md` §6).
2. Stripe Payment Link (plus an optional second link for the `/daskal/` entry).
3. ~~Photos~~ resolved: 6 photos by Daniel Kolev / DK Photography in `public/photos/`, registered in `content/photos.yml`. Angel holds full rights. Credit line: "Снимка: Даниел Колев / DK Photography". Update 11 Nov 2026: 3 of Angel's own photos added (`ai-governance-studio`, `training-group`, `aicerts-studio`), used ONLY on /companies/. Added 12 Nov: `vsm-teaching` (hero) and `vsm-group`; gallery above the cases = `vsm-group` large + `training-group` and `ai-governance-studio` small. School photos added: `with-teachers` (/schools/ hero) and `classroom-students` + `street-lesson` + `classroom-selfie` (/schools/ "Защо мен", three small photos in a row); use only on /schools/. Open: consent, above all for the students in `classroom-students`. Open: credit line for them, and consent from the people in `training-group`. Footer credit becomes "Снимки: Даниел Колев / DK Photography и лични".
4. 11 logo files.
5. Book cover.
6. Founder or co-founder for Sindeo and Znam.be.
7. Full name of obr.education.
8. MSc Digital Business: institution and expected year.
9. Official titles for Microsoft AB-730 and AB-731.
10. SoftUni hybrid setup: whether "10 000+ students daily" is still current (currently omitted).
11. Daskal: skill content, fallback instructions, repo name, licence, install steps checked against the current UI, screenshots, Claude directory listing.
12. Re-verify skills availability on free plans (Claude custom upload; ChatGPT Free/Go).
13. Old daskal.ai paths.
14. Analytics: none, or cookieless. *Recommendation:* GoatCounter (cookieless, no banner), counting only page views and clicks on the support CTA, so CTA clicks can be compared with Stripe payments.
16. Testimonials: at least 3 from the founding sessions (recommended before go-live, but not blocking).
17. "План в 1 страница": Angel confirms the template in his founding-sessions kit (outside this repo).
18. ~~School training credit~~ resolved (11 Nov 2026): the credit is confirmed through SmarTest, the accredited provider. Show the bullet.
20. ~~Schools page~~ decided: its own page `/schools/`. Resolved 11 Nov 2026: programme blocks confirmed (last block = students and AI); credit = 8 academic hours in school + 8 academic hours project sent to Angel, no pre-task. Hero photo `writing-laugh`. Classroom photo: not now.
21. `/now` page: long-term backlog, not in phases 1–2.
19. ~~Invoicing and group size~~ resolved: SmarTest invoices the school. One group is up to 20 teachers; more than 20 means a second group. Neither the group size nor the per-teacher price appears on the site.
15. Angel reviews all Bulgarian copy before M6.
