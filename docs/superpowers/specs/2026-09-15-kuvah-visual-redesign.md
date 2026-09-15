# Kuvah Technologies Website — Visual Redesign Spec

Status: Approved for implementation
Date: 2026-09-15
Supersedes: the **visual system** sections of `docs/superpowers/specs/2026-09-14-kuvah-website-design.md` (color, typography scale, layout composition, motion, signature device). That spec's **information architecture, routes, data layer, copy, and accessibility floor remain in force and unchanged** — this document only replaces how the site looks and moves.

## Scope and non-negotiables

This is a visual design pass on an existing, working, fully-built site (see the original spec and its implementation plan, `docs/superpowers/plans/2026-09-14-kuvah-website.md`, both already implemented and shipped). It is explicitly **not**:

- A copy rewrite. Every string of approved copy (from `Kuvah Web Copy.md`) stays exactly as it is, in the same reading order, in the same sections. Small UI-necessity edits (nav labels, alt text) remain permitted, exactly as before — nothing more.
- A restructure of the IA. All 7 routes (`/`, `/services`, `/work`, `/work/[slug]`, `/about`, `/start-a-project`, `/insights`) stay. No sections are removed or added.
- A rebuild from scratch. The existing data layer (`lib/data/services.ts`, `lib/data/projects.ts`, `lib/data/social.ts`), the existing component boundaries (`components/ui`, `components/layout`, `components/home`, `components/work`, `components/contact`), and the existing test suite are the foundation this redesign works within — components get restyled and recomposed, not deleted and reinvented, unless a specific section's redesign genuinely requires new structure (e.g., the Work section's new per-project graphics need new components — that's fine; wholesale duplication of already-correct logic, like the data layer or form validation, is not).
- No fabrication: the "do not invent" list from the original spec (no testimonials, clients, awards, stats, results, team members, logos) still applies in full, including to any new graphic content — a per-project graphic is abstract/typographic, never a fake screenshot presented as real.

## Design decisions made during brainstorming

1. **No real project screenshots exist.** Each of the 3 case studies gets a bold, custom-designed abstract/typographic graphic composition (not a photo, not a fake UI mockup) built from brand colors and geometric shapes, distinct per project. Swappable for real screenshots later without restructuring — the graphic is a separate component per project, not baked into the shared template.
2. **Typography stays Bricolage Grotesque (display) + Inter (body).** The brief's "vibrant/bold" goal is achieved through scale, color, and layout, not a typeface change.
3. **No new hues.** All new color tokens are computed tonal variants of the four existing brand colors (see below), not designer's-choice additions.

## Color system

Extends the original 6 tokens with 2 new "deep" tonal variants, each contrast-verified (WCAG relative luminance) against `paper` (`#FFFFFF`) text:

| Token | Hex | Contrast vs. paper text | Role |
|---|---|---|---|
| `ink` | `#1E1E2F` | — (already dark) | Primary text; full dark "brand moment" sections (Process, About) |
| `paper` | `#FFFFFF` | — | Primary light surface |
| `mist` | `#F4F4F6` | — | Secondary light surface |
| `topaz` | `#FFCB77` | (hosts `ink` text, not `paper`) | Primary vibrant accent — light color blocks/graphics/hover fills, always paired with `ink` text |
| `topaz-deep` | `#8A5A22` | 5.89:1 | **New.** Same hue as topaz, darkened. Hosts `paper` text. Anchors the Final CTA (the visual climax) |
| `sky` | `#5BC0EB` | (hosts `ink` text, not `paper`) | Secondary vibrant accent — reserved for Systems & Automation and cooler compositional moments |
| `sky-deep` | `#164C63` | 9.34:1 | **New.** Same hue as sky, darkened. Hosts `paper` text. Anchors the Systems & Automation service band |
| `ink-muted` | `#6B6B7D` | — | Secondary/caption text on light backgrounds |

Rule carried over from the original spec, unchanged: `topaz` and `sky` (the light variants) are never used as text color on light backgrounds — fills, borders, graphics, or hosting `ink` text only. The two new `-deep` variants exist specifically so a confident color block can host light (`paper`) text without violating that rule or failing contrast.

## Page-level color rhythm

A designed journey, not mechanical alternation:

```
Hero          paper + large topaz ray-burst graphic field
Introduction  mist, asymmetric, with a topaz-tonal pull-quote block
Services      paper → mist → sky-deep   (3 bands, ending on a color beat; Systems & Automation = sky-deep)
Process       ink (full dark section — first "pause" beat)
Work          paper/mist alternating per project; each project's own accent-color graphic
Who We Work..  mist
About         ink (second dark "brand moment")
Final CTA     topaz-deep (the climax — most saturated moment on the site)
```

## Typography

- Display family: Bricolage Grotesque, pushed to a much larger, more dramatic scale than the original build.
  - Hero H1: `clamp(3.5rem, 8vw, 8rem)`, weight 650-700, line-height ~1.0, tracking -0.02 to -0.03em.
  - Section H2: `clamp(2.5rem, 5vw, 4.5rem)` (up from the original spec's `clamp(2rem, 3vw+1rem, 3rem)`).
  - Oversized structural numerals (Services band numbers, Process step numbers): scaled independently, large enough to function as a compositional graphic element (roughly 30-40% of section height on desktop), not just a small label.
- Body family: Inter, unchanged from the original spec's scale.
- No word/phrase-level color or weight accenting inside a headline (the explicit AI-design tell) — where a headline needs emphasis, it comes from scale, position, or a full-line/full-block color treatment, never a single highlighted word.

## Signature visual language

Two devices, used consistently so a Kuvah graphic becomes recognizable on sight — "spend the boldness in a controlled number of places" per the design process, not scattered everywhere:

1. **The ray-burst** (`components/graphics/SignatureRays.tsx`, already built) — evolved from a single quiet hero appearance into the site's core recurring graphic: large-scale and central to the hero composition; reappearing at small scale as tick-mark accents near Process step numerals and Service band numerals. Not used decoratively beyond these anchored, meaningful placements.
2. **Angled color-block transitions** — where two sections of different background color meet (e.g., Services' sky-deep band into Process' ink band), the boundary is a diagonal clipped edge (CSS `clip-path`), not a straight horizontal line. Used at color-transition boundaries only, not as decoration on every section.

## Section-by-section composition

- **Hero**: oversized left-aligned headline (single solid `ink` color, no per-word accenting), overlapping the edge of a large `topaz` ray-burst field positioned asymmetrically to the right. Copy unchanged; composition entirely new. One orchestrated entrance: headline lines stagger in, ray-burst draws in.
- **Introduction**: asymmetric two-column split (not 50/50). The line "It's about whether it solves the right problem." gets its own oversized display treatment on a `topaz`-tonal block; the explanatory paragraphs sit in a narrower column beside it.
- **Services**: full-bleed alternating bands (`paper` → `mist` → `sky-deep`), each with a large asymmetric Bricolage numeral (numbering justified — the source copy already numbers these 01/02/03), capability list styled as interactive hover rows (color/underline shift on hover, revealing which capability is focused) rather than a bullet list. Systems & Automation's band is `sky-deep` with `paper` text.
- **Process**: horizontal connected sequence (numerals 01-04 on a drawn connecting line with small ray-tick end caps) on a full `ink` section; collapses to a vertical connected sequence on mobile. This is the first dark "pause" beat in the page rhythm.
- **Work** (homepage Featured Work teaser, `/work` index, and all 3 `/work/[slug]` case studies — all three surfaces share the same underlying project data and grid/typography system, so it still reads as one site): each project gets a large editorial "cover" moment — its own custom abstract graphic component plus a large project treatment, deliberately different in composition from the other two projects:
  - **OnPoint Clothing** (fashion/ecommerce): soft angled color panels plus a stylized garment-tag abstraction, `topaz`-toned, editorial/fashion feel.
  - **Dillon Gas** (mobile/product): an abstracted geometric device-silhouette (an outline/frame suggesting a phone, not a fake screenshot inside it) in `sky` tones, suggesting an ordering flow.
  - **WhatsApp Automation Platform** (software/systems): layered overlapping chat-bubble shapes plus a connecting-node motif, `ink`/`sky` toned, suggesting multi-conversation automation.
  - Each graphic is a distinct, named component (e.g. `OnPointGraphic`, `DillonGasGraphic`, `WhatsAppGraphic`) under `components/work/graphics/`, swappable independently for a real screenshot later.
- **Who We Work With**: three large statement headlines; supporting body copy is hover-revealed on desktop (a controlled, reason-driven interaction — it shows what's under the headline) and always-expanded/stacked on mobile (no hover on touch devices). Typographic/interactive treatment, not a 3-column card grid.
- **About** (both the homepage teaser and the full `/about` page): full `ink` "brand moment" (second dark beat), oversized philosophy-line treatment, angled `topaz`/`sky` color bleed at the section's edge. Copy unchanged.
- **Final CTA**: full `topaz-deep` block, oversized headline, single button — the visual and chromatic climax of the page.

## Motion

- One orchestrated hero entrance: staggered headline-line reveal plus the ray-burst graphic drawing in (extends, not replaces, the existing `Reveal` component's reduced-motion handling).
- Scroll reveals stay restrained: one wrapper per section-level unit (consistent with the original spec), not per individual element.
- Reason-driven interactions only: Service band hover reveals/highlights its capability list; Work item hover shifts its graphic slightly (a deliberate, small, purposeful movement — not a generic image-zoom-on-hover cliché); Who-We-Work-With hover expands body copy.
- `prefers-reduced-motion: reduce` continues to disable all non-essential motion (already wired globally in `app/globals.css`); every new interaction must degrade to its static/expanded end-state when reduced motion is requested.

## Explicit anti-cliché constraints (carried and reinforced from the original spec, given this brief's higher visual ambition)

No gradient blobs, no floating 3D spheres, no purple/blue "AI" gradients, no glassmorphism, no generic stock photography, no fake dashboards or fake screenshots presented as real, no numbered markers where the content isn't actually a sequence (Services and Process numbering remains justified; nothing else gets numbered decoratively), no excessive drop shadows, no grain/noise overlays, no infinite marquees, no fake testimonials/clients/logos/awards/stats. Every new visual device (ray-burst reuse, angled transitions, oversized numerals) must trace back to a reason stated in this document — nothing is added merely because a section "felt empty."

## Accessibility floor (unchanged from the original spec — restated because this redesign touches nearly every component)

Semantic landmarks, skip-to-content link, visible keyboard focus (the existing `:focus-visible` ink/topaz-by-background system), keyboard-operable nav and form, alt text on all imagery/graphics (new per-project graphics are decorative unless they convey unique information, in which case they get real alt text), AA contrast on all text/background pairings including the two new deep tokens (verified above), and every new hover-revealed interaction (Services capability rows, Who We Work With) must have a working non-hover (focus/tap/always-visible-on-mobile) equivalent — nothing is hover-only.

## Non-goals (explicitly out of scope for this pass)

- No custom cursor (the brief mentions it as an option "if appropriate" — restraint calls for skipping it; it adds risk and complexity without serving hierarchy, storytelling, brand, navigation, emphasis, interaction, or rhythm any better than what's already planned).
- No changes to `/insights` or `/start-a-project`'s functional form logic — both get the same visual system applied (color rhythm, typography scale) but no structural or content change beyond that.
- No new testing framework or dependency beyond what's needed for any new interaction logic (hover/expand state) — reuse Vitest + React Testing Library as before.
