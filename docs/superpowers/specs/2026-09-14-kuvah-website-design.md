# Kuvah Technologies Website — Design Spec

Status: Approved for implementation
Date: 2026-09-14

## Source of truth

- Copy and IA: `Kuvah Web Copy.md` (project root reference document, not to be paraphrased except for small UI-necessity edits — nav labels, card truncation, accessibility text).
- Brand assets: `public/Kuvah black.png`, `public/kuvah white logo.png`, `public/Kuvah Icon black.png`, `public/Kuvah icon white.png` (icon + wordmark lockups, dark and white).
- Brand colors (official):
  - Dark Gunmetal `#1E1E2F`
  - Topaz `#FFCB77`
  - Sky Blue `#5BC0EB`
  - Whisper Gray `#F4F4F6`

## Company context

Kuvah Technologies is a Nigerian digital technology company targeting Nigerian businesses and founders, building websites, ecommerce, digital products, SaaS MVPs, web applications, internal tools, business systems, and automation. Brand feel: modern, thoughtful, warm, capable, refined — a young technology company with serious capability. Not a generic agency, not a corporate consultancy, not a crypto/AI startup template, not a stereotypical Nigerian tech template.

"Build with light" is a brand phrase, used sparingly (e.g. footer), never as a repeated section headline.

## Decisions made during brainstorming

1. **Imagery**: No real project screenshots exist yet. Case studies use crafted abstract/typographic treatments in brand colors rather than stock photos or fake screenshots. Structure allows dropping in real screenshots later without restructuring.
2. **Logo**: Provided PNG lockups (icon-only and icon+wordmark, dark and white) are used via `next/image`, not redrawn as CSS/text.
3. **Contact form**: Front-end only. Validated, controlled form that shows the approved "We've got it." success state in place (no redirect, no backend call). Submission logic isolated behind one `submitEnquiry()` function so real delivery (email/CRM) can be wired in later by editing one file.
4. **Case studies**: Each of the three projects (OnPoint Clothing, Dillon Gas, WhatsApp Automation Platform) gets its own page at `/work/[slug]` using a shared, reusable case-study template. Sections (Challenge/Approach/What We Built/Outcome/Technology) render conditionally — a project missing a section simply omits it. No fabricated results/technology are added beyond what the source copy states.
5. **Insights**: Lightweight placeholder page now; content structure designed so real articles can be added later without rearchitecting. No fabricated articles.

## Visual & brand system

### Color tokens

| Token | Hex | Use |
|---|---|---|
| `ink` | `#1E1E2F` (Dark Gunmetal) | Primary text; full dark section backgrounds (About philosophy block, final CTA, footer) |
| `paper` | `#FFFFFF` | Primary light background band |
| `mist` | `#F4F4F6` (Whisper Gray) | Alternate light background band, subtle section separation without borders/shadows |
| `topaz` | `#FFCB77` | Primary accent — buttons/fills with dark text, hover underlines, signature ray-graphic, focus rings on dark backgrounds |
| `sky` | `#5BC0EB` | Secondary accent, used sparingly — one accent in Systems & Automation, link/hover accents on dark backgrounds |
| `ink-muted` | `#6B6B7D` | Secondary/caption text on light backgrounds (derived tint of gunmetal, contrast-checked) |

Rules: Topaz and Sky are never used as body text color on light backgrounds (fails contrast). They appear as fills, borders, underlines, or on dark backgrounds. All text/background pairings must meet WCAG AA (4.5:1 body, 3:1 large text).

### Typography

- **Display/headline family**: Bricolage Grotesque (variable weight, loaded via `next/font/google`). Used for H1/H2/H3, pull quotes, large display moments. Carries the page's personality — an angular, idiosyncratic grotesk that echoes the icon's ray shapes without being literal.
- **Body/UI family**: Inter (via `next/font/google`). Used for body copy, nav, buttons, labels, forms, captions.
- Type scale (fluid via `clamp()`):
  - Hero H1: `clamp(2.5rem, 5vw + 1rem, 4.5rem)`, weight 600–650, line-height 1.05–1.1, tracking -0.01 to -0.02em
  - Section H2: `clamp(2rem, 3vw + 1rem, 3rem)`, weight 600
  - H3/subhead: 1.5–1.75rem, weight 500–600
  - Body large (intros): 1.125–1.25rem, weight 400, line-height 1.6
  - Body: 1rem, weight 400, line-height 1.6, measure capped ~65–70ch
  - Label/caption: 0.875rem, weight 500
- No decorative single-word bolding/coloring inside headlines. No tracked-out ALL-CAPS eyebrow labels used purely as decoration — labels appear only where they carry real information (e.g. service index numbers, which the source copy already numbers 01/02/03; case-study kicker naming the client on its own page for orientation).

### Layout

- Predominantly left-aligned, editorial rhythm — not a centered-SaaS layout.
- Content container max-width ~1320px with responsive gutters (min 16px side padding at all widths, per mobile requirement). Long-form text blocks (About philosophy, case-study body copy) narrow to ~700px measure.
- Services: full-width numbered index (01/02/03, matching source copy), NOT a 3-card grid — hairline dividers between entries, not boxes/shadows.
- Approach (Understand/Clarify/Build/Improve): a connected, numbered step-rail (horizontal on desktop, vertical on mobile) since this is a genuine sequence.
- Featured Work / `/work`: alternating editorial listing with hairline dividers, not a photo-card grid. Each entry uses a crafted abstract/typographic graphic (per imagery decision above) plus the project meta line rendered as a clean label row (not a middot-joined string).
- No default rounded-card-with-shadow treatment applied uniformly; radius and elevation are used only where they serve a specific element (e.g. buttons), not decoration.

### Signature device

A quiet, recurring abstract line-burst motif derived from the icon's radiating rays. Used prominently once — in the hero, behind/beside the headline — and echoed faintly as a section-transition mark elsewhere on the site. This is the one "bold" element; everything else stays disciplined per it.

### Motion

- One orchestrated hero entrance on load (staggered headline reveal + ray-graphic draw-in).
- Scroll-reveals used sparingly, at section transitions — not per-card/per-item.
- Real hover feedback on interactive rows/links (underline draw, subtle position shift), and visible keyboard focus states using topaz/gunmetal outlines.
- `prefers-reduced-motion: reduce` disables non-essential motion.
- No animation library; implemented via CSS transitions + a small IntersectionObserver-based `Reveal` wrapper.

## Information architecture

| Route | Purpose |
|---|---|
| `/` | Homepage — the 8-section narrative from the brief (Hero, Introduction, Services, Approach, Featured Work, Who We Work With, About teaser, Final CTA) |
| `/services` | Full services page — three categories with copy from the Services Page section of the source doc |
| `/work` | Portfolio index — editorial listing of all projects |
| `/work/[slug]` | Case-study template, populated for `onpoint-clothing`, `dillon-gas`, `whatsapp-automation-platform` |
| `/about` | About page copy (distinct content from homepage About teaser) |
| `/start-a-project` | Enquiry form page + in-place success state after submit |
| `/insights` | Lightweight placeholder, structured for future articles |

CTAs are consistent site-wide: primary = "Start a Project" → `/start-a-project`; secondary = "See Our Work" / "View Our Work" → `/work`.

## Component & data architecture

- **Data layer**: `lib/data/projects.ts` and `lib/data/services.ts` — typed content records as the single source of truth. Homepage Featured Work, `/work`, and `/work/[slug]` all read from the same project records.
- **Shared components**: `Nav` (accessible mobile menu), `Footer`, `Container`, `Button`, `ProcessStep`, `ServiceRow`, `ProjectRow`, `CaseStudySection`, form field components, `Reveal`.
- **Forms**: Controlled React state, client-side validation (required fields, email format), `submitEnquiry()` function isolated for later real wiring.

## Technical stack notes

- Next.js App Router (already scaffolded, v16), TypeScript, React 19.
- Tailwind v4 CSS-first config (`@theme` block in `app/globals.css`) for color/font/spacing tokens — no `tailwind.config.js`.
- Fonts: `next/font/google` for Bricolage Grotesque + Inter, exposed as CSS variables.
- Logo assets served via `next/image` from the existing `public/` PNGs.
- No new runtime dependencies for animation; IntersectionObserver-based reveal implemented directly.
- Metadata API (`generateMetadata` / static `metadata` export) per page: title, description, OpenGraph, canonical.
- Accessibility floor: semantic landmarks, skip-to-content link, visible focus states, keyboard-operable nav and form, alt text on all imagery/graphics, AA contrast.

## Explicit non-goals (per brief's "do not" list)

Do not invent testimonials, clients, awards, statistics, business results, company history, team members, or logos. Do not fabricate Insights articles. Do not add filler sections. Do not rewrite approved copy beyond small UI-necessity edits (nav labels, card truncation, accessibility alt text).
