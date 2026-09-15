# Kuvah Website — Template-Driven Redesign

## Status

Supersedes the visual direction of `2026-09-15-kuvah-visual-redesign.md` (that spec's
IA, copy rules, and accessibility floor still apply; its specific visual-language
choices — e.g. "avoid card grids," the ink-hero ray-burst treatment — are replaced by
this spec where they conflict). `2026-09-14-kuvah-website-design.md` remains binding
for copy sourcing, routes, and the non-fabrication rules.

## Context

The client reviewed the shipped visual redesign and found it "too dull." They supplied
a reference: a dark-background digital marketing agency template (screenshots of a
Behance case study) with a card-heavy, high-contrast, single-accent-color visual
system, and asked for the Kuvah site to be rebuilt on that visual system — using
Kuvah's own brand colors and existing approved copy, not the reference's content.

This spec defines how the reference's visual patterns map onto Kuvah's real routes,
data, and content constraints — including where the reference's patterns (fabricated
testimonials, star ratings, stats counters, team headshots, stock photography) are
adapted or dropped to keep the site honest.

## Non-negotiables (carried over, restated for this pass)

- No fabricated testimonials, quotes, ratings, stats, clients, team members, or press
  mentions **in the shipped/launched site**. During this build, the client has asked
  for obviously-placeholder data to be seeded so sections aren't empty while the
  visual work is reviewed — see "Placeholder content" below for how that's kept safe
  to swap out and impossible to mistake for real content.
- No stock photography. All imagery is abstract custom SVG graphics, extending the
  visual language already established for the three case studies
  (`OnPointGraphic`, `DillonGasGraphic`, `WhatsAppGraphic`).
- Existing approved copy (`Kuvah Web Copy.md` and the copy already implemented in
  `lib/data/*` and page components) is reused verbatim. This redesign changes
  presentation, not words.
- Accessibility floor from the original spec still applies: WCAG AA contrast
  (verified numerically, not eyeballed), visible focus indicators on every
  background color in use, `prefers-reduced-motion` respected, semantic heading
  order, no accessibility-tree duplication from responsive show/hide patterns.

## Scope

**Routes touched:** `/`, `/services`, `/work`, `/work/[slug]`, `/about`,
`/start-a-project`, `/insights`, `/not-found` (404) — restyled in place, same copy.

**New route:** `/pricing` — new page, ships with real layout now; pricing tiers and
amounts populate once the client supplies them (see "Content pending" below).

**Explicitly out of scope:** Team page, Team Details page, Careers page, Coming Soon
page, a standalone Testimonials page, a standalone FAQ page. These template pages
either require content Kuvah doesn't have (team headshots, open roles) or don't match
Kuvah's current IA; testimonials and stats appear as *sections within existing pages*
instead of dedicated routes.

## Color system

Reuse existing `@theme` tokens (`app/globals.css`) — no new colors invented:

| Template role | Kuvah token |
|---|---|
| Near-black background | `--color-ink` (#1E1E2F) |
| Lead accent (lime, used everywhere: buttons/tags/underlines/icon fills) | `--color-topaz` (#FFCB77) |
| Secondary/support accent (sparing use) | `--color-sky` (#5BC0EB) |
| Light section background | `--color-mist` (#F4F4F6) / `--color-paper` (#FFFFFF) |
| Deep-accent panels (dark, non-ink sections) | `--color-topaz-deep` / `--color-sky-deep` (already defined, AA-verified against `--color-paper`) |

Rule: topaz is the single "pop" color carrying the template's visual energy. Sky is
used only where a second accent is needed for hierarchy (e.g. distinguishing two
adjacent icon groups) — never as a competing lead color on the same section as topaz.

## Recurring motif: pill-tag divider strip

The template repeats a band of rounded pill-shaped labels between most sections as a
visual-rhythm device. Rebuild this as a `TagStrip` component: a horizontal row of
pill-shaped chips on an accent or ink background, populated with real short phrases —
service names (`Digital Experiences`, `Digital Products`, `Systems & Automation`) and
brand phrases already used elsewhere in the copy (e.g. `Build with Purpose`,
`Technology should serve a purpose`). No marketing filler phrases invented for this.

Used as a section-transition device in place of (or alongside) the existing
`SectionDivider` diagonal-wedge component — both may coexist; `TagStrip` is for
rhythm/energy, `SectionDivider` for color-block transitions.

## Component & page changes

### Cards are back in scope

The prior redesign spec's "avoid card grids" rule is superseded — the template leads
with card-based layouts (service cards, project cards, pricing cards) and that's the
visual language being adopted. Cards should still avoid being generic (icon + heading
+ paragraph, no distinguishing treatment) — use the numbered/icon treatment already
present in the codebase (`ServicesIndex`'s numeral pattern) rather than a bare
Bootstrap-style card.

### Home (`app/page.tsx`)

- **Hero** — same headline/body copy. Composed on `ink` background with an abstract
  graphic composition (extend `SignatureRays` or a new abstract composition) in place
  of the template's photo collage. Fix the existing text-overflow defect (headline
  clamp/line-height causing clipping at desktop widths — confirmed by user
  screenshot) as part of this rebuild, not as a separate patch.
- **Services** (`ServicesIndex`) — numbered icon-card grid, three cards (one per
  service from `lib/data/services.ts`), topaz accent on the numeral/icon.
- **Process** (`Approach`) — restyle the existing four-step process copy
  ("Understand / Clarify / Build / Improve") into the template's numbered step-rail
  treatment. (The template also has a separate "why clients believe we're different"
  section; there's no distinct approved copy for that claim, so it's not built as a
  second section — the process rail is the one restyle here, not duplicated content
  in two layouts.)
- **Featured Work** (`FeaturedWork`) — project cards restyled to match, abstract SVGs
  standing in for template photography.
- **Stats section** (new component, `Stats`) — data-driven from `lib/data/stats.ts`.
  Ships with clearly-marked placeholder figures (see "Placeholder content" below).
- **Testimonials section** (new component, `Testimonials`) — data-driven from
  `lib/data/testimonials.ts`. Ships with clearly-marked placeholder quotes/attribution.
  No star rating displayed — that stays out even as a placeholder, since a fabricated
  numeric rating is the one element of this pattern with no honest placeholder form.
- **WhoWeWorkWith, AboutTeaser, FinalCTA** — restyled to the new visual system,
  copy unchanged.

### Services (`app/services/page.tsx`)

Restyle service list to match the card treatment; reuse `pageIntro`/`pageCapabilities`
copy already in `lib/data/services.ts`.

### Work (`app/work/page.tsx`, `app/work/[slug]/page.tsx`)

Restyle project grid and case-study template to the new visual system; existing
abstract graphics (`OnPointGraphic`, `DillonGasGraphic`, `WhatsAppGraphic`) reused,
extended in style if needed to match the new composition language.

### About (`app/about/page.tsx`)

Restyle existing sections (belief statement, values, "where we're going") to the new
system. Values section can adopt the card treatment. No team section added.

### Pricing (`app/pricing/page.tsx`, new)

Page shell, nav entry, and card layout ship now, seeded with clearly-marked
placeholder tiers (`lib/data/pricing.ts`) until real packages/amounts are supplied.

## Placeholder content

Where the client has asked for placeholder data rather than an empty section
(testimonials, stats, pricing), every placeholder entry must be unambiguous as a
placeholder, not merely generic-sounding:

- Data lives in `lib/data/testimonials.ts`, `lib/data/stats.ts`, `lib/data/pricing.ts`,
  each with a top-of-file comment: `// PLACEHOLDER — replace before launch, see
  docs/superpowers/specs/2026-09-15-kuvah-template-redesign.md`.
- Placeholder names/companies use clearly fictitious labels (e.g. "Client Name,
  Company Name") rather than realistic-sounding fabricated people or businesses —
  never a name specific enough to be mistaken for a real client if seen out of
  context (e.g. in a screenshot or shared link before the client edits it).
- Placeholder stats use round, obviously-illustrative numbers with a label indicating
  they're illustrative (e.g. "XX projects delivered") rather than precise-looking
  fake figures ("347").
- No star rating is added even as a placeholder (see above) — that pattern has no
  honest placeholder form and is dropped from the design entirely unless real.

### Start a Project, Insights, 404

Restyled to the new system; copy unchanged (Insights keeps its current placeholder
copy — no fabricated articles added).

## Content pending from the client

These sections ship now with placeholder data (see "Placeholder content" above) and
must be swapped for the real thing before the site is considered launch-ready:

1. **Testimonials** — real quotes with name, role, and company for each.
2. **Stats** — real figures (e.g. years active, projects delivered) and what each
   number represents.
3. **Pricing** — tiers/packages, what's included in each, and pricing model (fixed
   amounts, "starting at," or custom quote).

## Non-goals

- No Team, Team Details, Careers, or Coming Soon pages.
- No standalone Testimonials or FAQ routes.
- No stock photography anywhere on the site.
- No star ratings, client logos, award badges, or press mentions unless real and
  supplied by the client.
- No new brand colors — only the four existing tokens and their already-defined
  deep/tint variants.

## Testing & QA

Same bar as the prior redesign: full `npm test` suite (not just build) required on
every task; WCAG contrast verified numerically for any new color combination
introduced (e.g. topaz-on-ink for `TagStrip`, card backgrounds); manual QA pass for
overflow/clipping regressions given the Hero defect this redesign is explicitly fixing.
