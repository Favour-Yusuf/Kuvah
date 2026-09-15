# Kuvah Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the already-built, already-shipped Kuvah Technologies website from its current plain/minimal visual treatment into a bold, vibrant, distinctively-designed experience, without changing any copy, routes, or the underlying data layer.

**Architecture:** This plan restyles and recomposes existing components in place — it does not rebuild the site. New pieces are added only where the redesign genuinely needs new structure: two new color tokens, a reusable diagonal section-divider component, a new `invert` button variant, and three new per-project abstract graphic components. Every existing page/section component keeps its existing heading levels, hrefs, and data bindings (so the existing test suite keeps passing) while its internal layout, color, and typography treatment changes substantially.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind v4 (CSS-first `@theme` tokens), Vitest + React Testing Library (existing test infra, reused as-is — no new dependencies).

**Spec:** `docs/superpowers/specs/2026-09-15-kuvah-visual-redesign.md` (visual system) plus `docs/superpowers/specs/2026-09-14-kuvah-website-design.md` (IA/copy/data layer — unchanged, still binding).

## Global Constraints

- Copy is frozen. No task may change any string of approved copy from `Kuvah Web Copy.md`. If a layout makes a piece of copy awkward, solve it with layout — never by editing the words.
- Routes, the data layer (`lib/data/services.ts`, `lib/data/projects.ts`, `lib/data/social.ts`), and the form/validation logic in `components/contact/StartProjectForm.tsx` are unchanged in structure — only their visual presentation changes.
- Every restyled component must preserve its existing heading levels (`h1`/`h2`/`h3`), link `href`s, and aria attributes exactly, so the existing test files continue to assert true things. Where a test's literal class-based assertion (rare — most existing tests assert text/roles/hrefs, not classes) would break, update that one assertion, not the test's intent.
- Color tokens: `ink` `#1E1E2F`, `paper` `#FFFFFF`, `mist` `#F4F4F6`, `topaz` `#FFCB77`, `sky` `#5BC0EB`, `ink-muted` `#6B6B7D` (existing) plus **new** `topaz-deep` `#8A5A22` and `sky-deep` `#164C63` (this plan's Task 1). `topaz`/`sky` (light) never host `paper` text; `topaz-deep`/`sky-deep` exist specifically to host `paper` text on a bold color block.
- No word/phrase-level color or weight accenting inside any headline. No decorative numbering outside Services (already numbered 01/02/03 in the source copy) and Process (a genuine 4-step sequence). No gradients, glassmorphism, drop-shadow stacks, stock photography, fake screenshots, or fabricated content of any kind.
- Every new hover-revealed interaction must have a non-hover equivalent: either it's implemented with `group-focus-within` alongside `group-hover` (keyboard-reachable), or it's simply always-visible below the `sm`/`md` breakpoint (touch devices don't hover) — never content that's reachable only via a mouse hover.
- `prefers-reduced-motion: reduce` (already wired globally in `app/globals.css`) must continue to disable all transition/animation durations — no new motion may bypass it (i.e., don't hand-write raw CSS animations outside what that global rule already suppresses; stick to Tailwind's `transition-*`/`duration-*` utilities, which the existing rule already catches).
- Fonts unchanged: Bricolage Grotesque (display) for headings/numerals, Inter (body) for everything else.
- No new npm dependencies. No new test framework. Reuse Vitest + React Testing Library exactly as configured.

---

## File Structure

```
app/globals.css                          # modify: add topaz-deep/sky-deep tokens
components/ui/Button.tsx                 # modify: add `invert` variant
components/ui/Button.test.tsx            # modify: test the new variant
components/ui/SectionDivider.tsx         # create: reusable diagonal color-transition strip
components/ui/SectionDivider.test.tsx    # create

components/work/graphics/OnPointGraphic.tsx      # create
components/work/graphics/DillonGasGraphic.tsx    # create
components/work/graphics/WhatsAppGraphic.tsx     # create
components/work/graphics/graphics.test.tsx       # create: one test file covering all three

components/home/Hero.tsx                 # modify: full recomposition
components/home/Introduction.tsx         # modify: full recomposition
components/home/ServicesIndex.tsx        # modify: full recomposition
components/home/ServicesIndex.test.tsx   # modify: update to new structure, same assertions
components/home/Approach.tsx             # modify: full recomposition
components/home/Approach.test.tsx        # modify: update to new structure, same assertions
components/home/FeaturedWork.tsx         # modify: full recomposition
components/home/FeaturedWork.test.tsx    # modify: update to new structure, same assertions
components/home/WhoWeWorkWith.tsx        # modify: full recomposition
components/home/AboutTeaser.tsx          # modify: full recomposition
components/home/FinalCTA.tsx             # modify: full recomposition

components/work/CaseStudy.tsx            # modify: full recomposition
components/work/CaseStudy.test.tsx       # modify: update to new structure, same assertions

app/services/page.tsx                    # modify: full recomposition
app/services/page.test.tsx               # modify: update to new structure, same assertions
app/work/page.tsx                        # modify: full recomposition
app/work/page.test.tsx                   # modify: update to new structure, same assertions
app/about/page.tsx                       # modify: full recomposition
app/about/page.test.tsx                  # modify: update to new structure, same assertions

components/layout/Nav.tsx                # modify: hover/active-state polish only
components/layout/Footer.tsx             # modify: token/type-scale consistency only
app/insights/page.tsx                    # modify: token/type-scale consistency only
app/start-a-project/page.tsx             # modify: token/type-scale consistency only
app/not-found.tsx                        # modify: token/type-scale consistency only
```

---

### Task 1: Design tokens — deep color variants, section divider, invert button

**Files:**
- Modify: `app/globals.css`
- Modify: `components/ui/Button.tsx`
- Modify: `components/ui/Button.test.tsx`
- Create: `components/ui/SectionDivider.tsx`
- Create: `components/ui/SectionDivider.test.tsx`

**Interfaces:**
- Produces: Tailwind utilities `bg-topaz-deep`, `text-topaz-deep`, `bg-sky-deep`, `text-sky-deep`; `Button`/`LinkButton` variant `"invert"`; `SectionDivider({ from, to, flip? })` where `from`/`to` are Tailwind background-color class strings (e.g. `"bg-ink"`, `"bg-sky-deep"`).
- Every later task in this plan (2 onward) consumes these.

- [ ] **Step 1a: Zero out transition-delay under reduced motion**

Task 2 introduces staggered `transition-delay` on the Hero's `Reveal`-wrapped elements (`delay-150`, `delay-300`, `delay-450`). The existing reduced-motion rule in `app/globals.css` zeroes `animation-duration`/`transition-duration` but not `transition-delay` — a `transition-delay` still fully elapses even when the transition it delays is near-instant, so without this fix a reduced-motion user would still wait up to 450ms staring at invisible hero content before it "snaps" into view. Fix it at the source, once, before any task introduces a delay utility. Find the existing block:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Add one line to it:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    transition-delay: 0ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 1b: Add the two deep color tokens**

In `app/globals.css`, add two lines to the existing `@theme` block:

```css
@theme {
  --color-ink: #1e1e2f;
  --color-ink-muted: #6b6b7d;
  --color-paper: #ffffff;
  --color-mist: #f4f4f6;
  --color-topaz: #ffcb77;
  --color-topaz-deep: #8a5a22;
  --color-sky: #5bc0eb;
  --color-sky-deep: #164c63;

  --font-display: var(--font-bricolage), ui-sans-serif, system-ui, sans-serif;
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}
```

(Leave the rest of `globals.css` — the `@layer base` block and the reduced-motion media query — exactly as it is.)

- [ ] **Step 2: Write the failing test for the `invert` Button variant**

Add to `components/ui/Button.test.tsx` (the file already has `describe("LinkButton")`/`describe("Button")` blocks — add these as new `it()`s inside the existing blocks):

```tsx
it("applies the invert variant's classes", () => {
  render(
    <LinkButton href="/start-a-project" variant="invert">
      Start a Project
    </LinkButton>
  );
  const link = screen.getByRole("link", { name: "Start a Project" });
  expect(link.className).toContain("bg-paper");
  expect(link.className).toContain("text-ink");
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run components/ui/Button.test.tsx`
Expected: FAIL — TypeScript/runtime error, `"invert"` is not a valid `Variant`.

- [ ] **Step 4: Add the `invert` variant**

In `components/ui/Button.tsx`, update the `Variant` type and `VARIANT_CLASSES`:

```tsx
type Variant = "primary" | "secondary" | "secondary-inverse" | "ghost" | "invert";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-topaz hover:text-ink",
  secondary: "bg-transparent text-ink border border-ink/20 hover:border-ink",
  "secondary-inverse": "bg-transparent text-paper border border-paper/30 hover:border-paper",
  ghost: "bg-transparent text-ink underline underline-offset-4 decoration-topaz decoration-2 px-0 py-0",
  invert: "bg-paper text-ink hover:bg-ink hover:text-paper",
};
```

(`buttonClasses()`'s `variant === "ghost"` branch stays as-is — `invert` falls into the default pill-button branch alongside `primary`/`secondary`/`secondary-inverse`.)

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run components/ui/Button.test.tsx`
Expected: PASS (existing tests plus the new one).

- [ ] **Step 6: Write the failing test for `SectionDivider`**

Create `components/ui/SectionDivider.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SectionDivider } from "./SectionDivider";

describe("SectionDivider", () => {
  it("is a decorative element hidden from assistive tech", () => {
    const { container } = render(<SectionDivider from="bg-paper" to="bg-ink" />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("applies the from/to background colors", () => {
    const { container } = render(<SectionDivider from="bg-paper" to="bg-sky-deep" />);
    const outer = container.firstChild as HTMLElement;
    expect(outer.className).toContain("bg-paper");
    const wedge = outer.firstChild as HTMLElement;
    expect(wedge.className).toContain("bg-sky-deep");
  });
});
```

- [ ] **Step 7: Run test to verify it fails**

Run: `npx vitest run components/ui/SectionDivider.test.tsx`
Expected: FAIL — module does not exist.

- [ ] **Step 8: Implement `SectionDivider.tsx`**

```tsx
export function SectionDivider({
  from,
  to,
  flip = false,
}: {
  from: string;
  to: string;
  flip?: boolean;
}) {
  return (
    <div className={`relative h-12 overflow-hidden sm:h-20 ${from}`} aria-hidden="true">
      <div
        className={`absolute inset-0 ${to}`}
        style={{
          clipPath: flip
            ? "polygon(0 100%, 100% 0%, 100% 100%)"
            : "polygon(0 0%, 100% 100%, 0% 100%)",
        }}
      />
    </div>
  );
}
```

This renders a short full-width strip colored `from` (matching the section above it), with a diagonal wedge of `to` (matching the section below it) cut into it — a designed angled seam between two differently-colored sections, used only where this plan's later tasks specify a color transition.

- [ ] **Step 9: Run the test to verify it passes**

Run: `npx vitest run components/ui/SectionDivider.test.tsx`
Expected: PASS.

- [ ] **Step 10: Verify the build succeeds**

Run: `npm run build`
Expected: no errors (the new tokens/component aren't wired into any page yet — this just confirms no syntax/type errors).

- [ ] **Step 11: Commit**

```bash
git add app/globals.css components/ui/Button.tsx components/ui/Button.test.tsx components/ui/SectionDivider.tsx components/ui/SectionDivider.test.tsx
git commit -m "feat: add deep color tokens, invert button variant, section divider"
```

---

### Task 2: Hero redesign

**Files:**
- Modify: `components/home/Hero.tsx`

**Interfaces:**
- Consumes: `Container`, `LinkButton` (unchanged), `Reveal` (unchanged), `SignatureRays` (unchanged — used here at large scale).
- No test file exists for `Hero` today (it was never given one — it's pure composition) and none is required here; verification is `npm run build` plus the visual QA pass (Task 15).

- [ ] **Step 1: Replace `Hero.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SignatureRays } from "@/components/graphics/SignatureRays";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pb-24 pt-20 sm:pb-40 sm:pt-28">
      <Reveal className="delay-0">
        <SignatureRays
          className="pointer-events-none absolute -right-24 top-8 h-[380px] w-[380px] text-topaz sm:-right-16 sm:top-4 sm:h-[560px] sm:w-[560px] lg:h-[640px] lg:w-[640px]"
        />
      </Reveal>
      <Container className="relative">
        <Reveal className="delay-150">
          <h1 className="max-w-4xl font-display text-[clamp(2.75rem,9vw,7.5rem)] font-bold leading-[0.98] tracking-tight text-ink">
            Technology is
            <br />
            easy to build.
            <br />
            <span className="relative inline-block">
              Building the
              <br />
              right thing is
              <br />
              harder.
            </span>
          </h1>
        </Reveal>
        <Reveal className="relative z-10 mt-10 max-w-xl space-y-4 text-lg leading-relaxed text-ink-muted delay-300 sm:mt-14">
          <p>
            Kuvah helps businesses and founders create digital experiences, products and systems
            that are built around what they actually need.
          </p>
          <p>
            Whether you&apos;re trying to improve how your business shows up online, launch a new
            product or fix a process that isn&apos;t working, we help you figure out what to build
            and bring it to life.
          </p>
        </Reveal>
        <Reveal className="relative z-10 mt-10 flex flex-wrap gap-4 delay-450">
          <LinkButton href="/start-a-project">Start a Project</LinkButton>
          <LinkButton href="/work" variant="secondary">
            View Our Work
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}
```

Notes for the implementer: the headline is rendered as one solid `text-ink` color throughout (no per-line or per-word color change — that's a deliberate constraint from the spec, not an oversight). The line breaks (`<br />`) reproduce the natural clause breaks in the approved copy ("Technology is easy to build." / "Building the right thing is harder.") as a deliberate oversized-type composition choice — the copy itself is untouched, only how it wraps. The `SignatureRays` field is large and positioned so the headline's last line ("harder.") sits near/against its edge, creating the "typography overlapping a visual element" effect the spec calls for; `z-10` on the paragraph/button `Reveal`s keeps them above the ray graphic if their boxes ever overlap at narrow viewports.

The `delay-0`/`delay-150`/`delay-300`/`delay-450` classes on each `Reveal` are what make this a genuine staggered entrance rather than four simultaneous fades: since the entire hero sits in the initial viewport, all four `Reveal`s' `IntersectionObserver`s fire on mount at essentially the same moment — without staggered delays they would all animate in together, not sequentially. Tailwind's `delay-*` utility composes fine alongside `Reveal`'s own baked-in `transition-all duration-700 ease-out` (both are plain utility classes on the same element, not competing on the same CSS property in a way that causes an ordering conflict). Task 1's Step 1a already added `transition-delay: 0ms !important` to the reduced-motion rule, so under `prefers-reduced-motion: reduce` these delays are fully zeroed (not just made imperceptible) — the hero appears immediately with no wait, correctly.

- [ ] **Step 2: Verify the build succeeds**

Run: `npm run build`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home/Hero.tsx
git commit -m "feat: redesign Hero with oversized type and large ray-burst field"
```

---

### Task 3: Introduction redesign

**Files:**
- Modify: `components/home/Introduction.tsx`

**Interfaces:**
- Consumes: `Container`, `Reveal` (unchanged).
- No existing test file; verification is `npm run build` plus Task 15's QA pass.

- [ ] **Step 1: Replace `Introduction.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Introduction() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start lg:gap-16">
          <Reveal>
            <div className="bg-topaz p-8 sm:p-10">
              <p className="font-display text-3xl font-bold leading-[1.05] text-ink sm:text-4xl">
                It&apos;s about whether it solves the right problem.
              </p>
            </div>
          </Reveal>
          <Reveal className="lg:pt-4">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Before we build, we listen.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
              <p>Every project starts somewhere different.</p>
              <p>
                Sometimes a business knows exactly what it needs but doesn&apos;t have the right
                team to build it. Sometimes a founder has an idea but needs help deciding where to
                start. Sometimes a business is doing too much manually and knows there has to be a
                better way.
              </p>
              <p>That&apos;s where we come in.</p>
              <p>
                We take the time to understand what you&apos;re trying to achieve, where the
                problem is and what would actually make a difference before we start building.
              </p>
              <p>Because a good solution isn&apos;t just about what it can do.</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
```

Notes: the pull-quote block ("It's about whether it solves the right problem.") — previously the closing line of this section's body copy — now gets its own oversized, colored treatment as a standalone visual block, asymmetrically paired (not centered, not equal-width) with the rest of the paragraphs. All copy is identical to before; only its position/scale changed. On mobile the grid collapses to a single column (the pull-quote block stacks above the paragraphs, since it's listed first in the JSX).

- [ ] **Step 2: Verify the build succeeds**

Run: `npm run build`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home/Introduction.tsx
git commit -m "feat: redesign Introduction as an asymmetric editorial split"
```

---

### Task 4: Work project graphics

**Files:**
- Create: `components/work/graphics/OnPointGraphic.tsx`
- Create: `components/work/graphics/DillonGasGraphic.tsx`
- Create: `components/work/graphics/WhatsAppGraphic.tsx`
- Create: `components/work/graphics/graphics.test.tsx`

**Interfaces:**
- Produces: `OnPointGraphic({ className? })`, `DillonGasGraphic({ className? })`, `WhatsAppGraphic({ className? })` — each a self-contained decorative SVG. Consumed by Tasks 7 (FeaturedWork), 8 (Work index), and 9 (CaseStudy).

- [ ] **Step 1: Write the failing test covering all three**

Create `components/work/graphics/graphics.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { OnPointGraphic } from "./OnPointGraphic";
import { DillonGasGraphic } from "./DillonGasGraphic";
import { WhatsAppGraphic } from "./WhatsAppGraphic";

describe.each([
  ["OnPointGraphic", OnPointGraphic],
  ["DillonGasGraphic", DillonGasGraphic],
  ["WhatsAppGraphic", WhatsAppGraphic],
])("%s", (_name, Graphic) => {
  it("renders a decorative svg hidden from assistive tech", () => {
    const { container } = render(<Graphic />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("accepts a className for sizing by its caller", () => {
    const { container } = render(<Graphic className="h-full w-full" />);
    expect(container.querySelector("svg")).toHaveClass("h-full", "w-full");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/work/graphics/graphics.test.tsx`
Expected: FAIL — none of the three modules exist.

- [ ] **Step 3: Implement `OnPointGraphic.tsx`**

A fashion/ecommerce composition: two color panels behind a rotated, tag-shaped mark with a hole (a garment price-tag abstraction), in `topaz`/`mist`/`ink`.

```tsx
export function OnPointGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <rect x="0" y="0" width="400" height="400" fill="#F4F4F6" />
      <rect x="0" y="150" width="400" height="250" fill="#FFCB77" />
      <g transform="translate(150 70) rotate(24)">
        <path d="M0 46 L86 0 L150 64 L64 110 Z" fill="#1E1E2F" />
        <circle cx="26" cy="58" r="11" fill="#F4F4F6" />
      </g>
    </svg>
  );
}
```

- [ ] **Step 4: Implement `DillonGasGraphic.tsx`**

A mobile/product composition: an abstracted device-frame silhouette with content bars, in `sky`/`sky-deep`/`paper` — no fake UI text, purely geometric.

```tsx
export function DillonGasGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <rect x="0" y="0" width="400" height="400" fill="#5BC0EB" />
      <rect x="130" y="40" width="140" height="320" rx="24" fill="#FFFFFF" />
      <rect x="130" y="40" width="140" height="320" rx="24" stroke="#164C63" strokeWidth="6" fill="none" />
      <rect x="154" y="104" width="92" height="14" rx="7" fill="#164C63" />
      <rect x="154" y="140" width="92" height="14" rx="7" fill="#164C63" opacity="0.5" />
      <rect x="154" y="176" width="58" height="14" rx="7" fill="#164C63" opacity="0.5" />
      <circle cx="200" cy="316" r="18" fill="#164C63" />
    </svg>
  );
}
```

- [ ] **Step 5: Implement `WhatsAppGraphic.tsx`**

A software/systems composition: three overlapping rounded "conversation" rectangles in different brand colors, connected by thin lines, on `ink` — suggesting multiple automated conversations, no fake text/avatars.

```tsx
export function WhatsAppGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <rect x="0" y="0" width="400" height="400" fill="#1E1E2F" />
      <rect x="40" y="60" width="190" height="72" rx="20" fill="#5BC0EB" />
      <rect x="130" y="164" width="190" height="72" rx="20" fill="#FFCB77" />
      <rect x="60" y="268" width="190" height="72" rx="20" fill="#5BC0EB" opacity="0.55" />
      <circle cx="60" cy="96" r="6" fill="#1E1E2F" />
      <circle cx="220" cy="200" r="6" fill="#1E1E2F" />
      <line x1="140" y1="132" x2="165" y2="164" stroke="#F4F4F6" strokeWidth="3" />
      <line x1="230" y1="236" x2="200" y2="268" stroke="#F4F4F6" strokeWidth="3" />
    </svg>
  );
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npx vitest run components/work/graphics/graphics.test.tsx`
Expected: PASS (6 tests — 2 per graphic).

- [ ] **Step 7: Commit**

```bash
git add components/work/graphics/
git commit -m "feat: add per-project abstract graphics for the Work section"
```

---

### Task 5: Services redesign (homepage index + full page)

**Files:**
- Modify: `components/home/ServicesIndex.tsx`
- Modify: `components/home/ServicesIndex.test.tsx`
- Modify: `app/services/page.tsx`
- Modify: `app/services/page.test.tsx`
- Modify: `app/globals.css` (add one small helper, see Step 1)

**Interfaces:**
- Consumes: `services` data (unchanged), `Container`, `Reveal`, `SectionDivider` (Task 1).
- The existing tests for both files already assert: 3 services in order (`ServicesIndex.test.tsx`), numbers "01"/"02"/"03" present, the `/services#digital-experiences` anchor href, and (for the full page) section `id`s matching slugs plus the three CTA labels/hrefs. Those assertions must still pass — only the DOM structure around them changes.

- [ ] **Step 1: Add a large-numeral watermark helper class**

In `app/globals.css`, inside the existing `@layer base` block, add (do not remove anything already there):

```css
  .numeral-watermark {
    font-size: clamp(6rem, 22vw, 14rem);
    line-height: 1;
  }
```

- [ ] **Step 2: Update `ServicesIndex.test.tsx`'s numeral assertions for the new watermark markup**

The existing test asserts `screen.getAllByRole("heading", { level: 3 })` text equals the three service names, the anchor href, and — critically — `screen.getByText("01")` (and `"02"`/`"03"`). The new markup in Step 3 renders each service's number **twice**: once as the small visible label (`<span className="text-sm font-semibold ...">`) and once as the giant decorative watermark (`<span aria-hidden="true" ...>`). `getByText` matches on `textContent` regardless of `aria-hidden` — it does not filter the accessibility tree — so `getByText("01")` would now find two elements and throw "Found multiple elements with the text: 01" instead of the single element it expects. Change those three assertions from `getByText` to `getAllByText`, asserting each returns at least one match, rather than the old exactly-one-match shape:

```tsx
expect(screen.getAllByText("01").length).toBeGreaterThan(0);
expect(screen.getAllByText("02").length).toBeGreaterThan(0);
expect(screen.getAllByText("03").length).toBeGreaterThan(0);
```

Leave the `heading`/anchor-href assertions exactly as they are — only these three lines change. Re-run the test after Step 3 to confirm it passes against the new markup.

- [ ] **Step 3: Replace `ServicesIndex.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/data/services";

const BAND_STYLES = {
  "digital-experiences": { bg: "bg-paper", text: "text-ink", muted: "text-ink-muted", watermark: "text-ink/5", underline: "hover:border-topaz focus-within:border-topaz" },
  "digital-products": { bg: "bg-mist", text: "text-ink", muted: "text-ink-muted", watermark: "text-ink/5", underline: "hover:border-topaz focus-within:border-topaz" },
  "systems-automation": { bg: "bg-sky-deep", text: "text-paper", muted: "text-paper/70", watermark: "text-paper/10", underline: "hover:border-paper focus-within:border-paper" },
} as const;

export function ServicesIndex() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            What can we help you build?
          </h2>
          <p className="mt-4 text-lg text-ink-muted">We work across three areas.</p>
        </Reveal>
      </Container>

      <div className="mt-16">
        {services.map((service) => {
          const style = BAND_STYLES[service.slug];
          return (
            <Reveal key={service.slug} className={`relative overflow-hidden ${style.bg} py-16 sm:py-24`}>
              <span aria-hidden="true" className={`numeral-watermark pointer-events-none absolute -right-4 -top-6 select-none font-display font-bold ${style.watermark} sm:-right-8`}>
                {service.number}
              </span>
              <Container className="relative">
                <span className={`text-sm font-semibold ${style.muted}`}>{service.number}</span>
                <h3 className={`mt-3 font-display text-3xl font-semibold sm:text-5xl ${style.text}`}>
                  {service.name}
                </h3>
                <div className={`mt-6 max-w-xl space-y-3 text-base leading-relaxed sm:text-lg ${style.muted}`}>
                  {service.homeIntro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <p className={`mt-8 text-sm font-semibold ${style.muted}`}>What we do</p>
                <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
                  {service.homeCapabilities.map((capability) => (
                    <li key={capability}>
                      <span className={`inline-block border-b-2 border-transparent py-1 text-lg font-medium transition-colors ${style.text} ${style.underline}`}>
                        {capability}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services#${service.slug}`}
                  className={`mt-8 inline-block text-sm font-semibold underline decoration-2 underline-offset-4 ${style.text} ${service.slug === "systems-automation" ? "decoration-paper" : "decoration-topaz"}`}
                >
                  {service.homeCtaLabel}
                </Link>
              </Container>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
```

Note: the capability `<span>` elements are not natively focusable, so their `focus-within:` classes only activate if a focusable descendant exists — they don't have one here, so `focus-within` on the span itself is inert. This is intentional and acceptable: these are static text labels, not interactive controls (nothing is being hidden that requires a keyboard-accessible reveal — the underline is a decorative hover-only flourish on already-fully-visible text, which the spec's "no hover-only content" rule does not restrict, since no *content* is gated behind hover here, only a decorative underline). Do not add `tabIndex` to make them artificially focusable — that would add meaningless tab stops.

- [ ] **Step 4: Run the existing test to verify it still passes**

Run: `npx vitest run components/home/ServicesIndex.test.tsx`
Expected: PASS, unchanged assertions.

- [ ] **Step 5: Update `app/services/page.test.tsx`'s existing assertions to match, if needed**

The existing test asserts `section[id]` elements equal the three slugs in order, and that the three CTA links exist with the right names/hrefs. Keep those assertions — they remain true under the structure below.

- [ ] **Step 6: Replace `app/services/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital experiences, digital products, and systems & automation — see where Kuvah can help move your business forward.",
};

const BAND_STYLES = {
  "digital-experiences": { bg: "bg-paper", text: "text-ink", muted: "text-ink-muted", watermark: "text-ink/5", button: "primary" as const },
  "digital-products": { bg: "bg-mist", text: "text-ink", muted: "text-ink-muted", watermark: "text-ink/5", button: "primary" as const },
  "systems-automation": { bg: "bg-sky-deep", text: "text-paper", muted: "text-paper/70", watermark: "text-paper/10", button: "invert" as const },
} as const;

export default function ServicesPage() {
  return (
    <>
      <section className="bg-paper py-20 sm:py-28">
        <Container width="narrow">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-6xl">
            What are you trying to move forward?
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>Technology can take many forms.</p>
            <p>A website. A product. A better internal process. An automated workflow.</p>
            <p>The right answer depends on what you&apos;re trying to achieve.</p>
            <p>Here&apos;s where we can help.</p>
          </div>
        </Container>
      </section>

      {services.map((service, index) => {
        const style = BAND_STYLES[service.slug];
        const prev = index > 0 ? BAND_STYLES[services[index - 1].slug].bg : "bg-paper";
        return (
          <div key={service.slug}>
            {index > 0 && <SectionDivider from={prev} to={style.bg} flip={index % 2 === 0} />}
            <section id={service.slug} className={`relative overflow-hidden py-20 sm:py-28 ${style.bg}`}>
              <span aria-hidden="true" className={`numeral-watermark pointer-events-none absolute -right-4 -top-6 select-none font-display font-bold ${style.watermark} sm:-right-8`}>
                {service.number}
              </span>
              <Container className="relative">
                <p className={`text-sm font-semibold ${style.muted}`}>{service.number}</p>
                <h2 className={`mt-3 max-w-2xl font-display text-3xl font-semibold sm:text-5xl ${style.text}`}>
                  {service.pageHeadline}
                </h2>
                <div className={`mt-6 max-w-2xl space-y-4 text-lg leading-relaxed ${style.muted}`}>
                  {service.pageIntro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-12 grid gap-8 sm:grid-cols-2">
                  {service.pageCapabilities.map((capability) => (
                    <div key={capability.name}>
                      <h3 className={`font-display text-xl font-semibold ${style.text}`}>{capability.name}</h3>
                      {capability.description && (
                        <p className={`mt-2 text-base leading-relaxed ${style.muted}`}>{capability.description}</p>
                      )}
                    </div>
                  ))}
                </div>

                <LinkButton href="/start-a-project" variant={style.button} className="mt-12">
                  {service.pageCtaLabel}
                </LinkButton>
              </Container>
            </section>
          </div>
        );
      })}
    </>
  );
}
```

- [ ] **Step 7: Run the existing test to verify it still passes**

Run: `npx vitest run app/services/page.test.tsx`
Expected: PASS, unchanged assertions.

- [ ] **Step 8: Verify the full suite and build**

Run: `npm test && npm run build`
Expected: all tests pass, build succeeds.

- [ ] **Step 9: Commit**

```bash
git add app/globals.css components/home/ServicesIndex.tsx app/services/page.tsx
git commit -m "feat: redesign Services as full-bleed color bands with numeral watermarks"
```

---

### Task 6: Approach (Process) redesign

**Files:**
- Modify: `components/home/Approach.tsx`
- Modify: `components/home/Approach.test.tsx` (only if a structural assertion needs updating — see Step 2)

**Interfaces:**
- Consumes: `Container`, `Reveal` (with the `as` prop it already supports), `SignatureRays`.
- The existing test asserts 4 step names as `h3` headings in order, plus the closing line text. Both remain true under the new markup.

- [ ] **Step 1: Replace `Approach.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SignatureRays } from "@/components/graphics/SignatureRays";

const STEPS = [
  {
    name: "Understand",
    question: "What's happening now?",
    body: "We learn about your business, your users and the problem you're trying to solve.",
  },
  {
    name: "Clarify",
    question: "What actually needs to change?",
    body: "We work through the priorities and define what should be built first.",
  },
  {
    name: "Build",
    question: "Turn the idea into something real.",
    body: "We design, develop and bring the solution to life.",
  },
  {
    name: "Improve",
    question: "The first version is rarely the final answer.",
    body: "We learn from the product, the people using it and the business around it to identify what comes next.",
  },
];

export function Approach() {
  return (
    <section className="bg-ink py-20 text-paper sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            We don&apos;t jump straight into development.
          </h2>
          <p className="mt-4 text-lg text-paper/70">
            Writing code is only one part of building something well. Before that, there are
            questions worth answering.
          </p>
        </Reveal>

        <ol className="relative mt-20 grid gap-14 sm:grid-cols-4 sm:gap-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[1.6rem] hidden h-px bg-paper/20 sm:block"
          />
          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.name} className="relative">
              <div className="flex items-center gap-3">
                <SignatureRays className="h-6 w-6 shrink-0 text-topaz" />
                <span className="font-display text-2xl font-bold text-topaz">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold sm:text-3xl">{step.name}</h3>
              <p className="mt-3 text-base font-medium text-paper/90">{step.question}</p>
              <p className="mt-2 text-base leading-relaxed text-paper/70">{step.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-16 border-t border-paper/20 pt-8">
          <p className="max-w-xl font-display text-xl font-medium">
            Good work starts with understanding what needs to change.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Run the existing test to verify it still passes**

Run: `npx vitest run components/home/Approach.test.tsx`
Expected: PASS. If it fails because `Reveal`'s `as="li"` prop changes how the query resolves (it shouldn't — `Reveal as="li"` was already used this way after the earlier accessibility fix), re-read the current test file, understand what changed, and update only the specific broken assertion while preserving its intent (still asserting the 4 step names in order).

- [ ] **Step 3: Verify the build succeeds**

Run: `npm run build`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/home/Approach.tsx
git commit -m "feat: redesign Approach as a connected numbered sequence on a dark section"
```

---

### Task 7: Featured Work (homepage) redesign

**Files:**
- Modify: `components/home/FeaturedWork.tsx`
- Modify: `components/home/FeaturedWork.test.tsx` (only if needed — see Step 2)

**Interfaces:**
- Consumes: `projects`, `narrativeParagraphs` (unchanged), `Container`, `LinkButton`, `Reveal`, and the three graphics from Task 4 (`OnPointGraphic`, `DillonGasGraphic`, `WhatsAppGraphic`).
- The existing test asserts the "View Case Study" href for onpoint-clothing and the "View Project" hrefs (in order) for the other two, plus the "See All Work" link. All three remain true under the new markup.

- [ ] **Step 1: Replace `FeaturedWork.tsx`**

```tsx
import type { ComponentType } from "react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { projects, narrativeParagraphs } from "@/lib/data/projects";
import { OnPointGraphic } from "@/components/work/graphics/OnPointGraphic";
import { DillonGasGraphic } from "@/components/work/graphics/DillonGasGraphic";
import { WhatsAppGraphic } from "@/components/work/graphics/WhatsAppGraphic";

const GRAPHICS: Record<string, ComponentType<{ className?: string }>> = {
  "onpoint-clothing": OnPointGraphic,
  "dillon-gas": DillonGasGraphic,
  "whatsapp-automation-platform": WhatsAppGraphic,
};

export function FeaturedWork() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            A few things we&apos;ve worked on.
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Different businesses. Different challenges. Different ways of approaching the work.
          </p>
        </Reveal>
      </Container>

      <div className="mt-16">
        {projects.map((project, index) => {
          const Graphic = GRAPHICS[project.slug];
          const reversed = index % 2 === 1;
          return (
            <Reveal key={project.slug} className="border-t border-ink/10 py-14 sm:py-20">
              <Container>
                <div
                  className={`grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}
                >
                  <div className="group relative aspect-[4/3] overflow-hidden">
                    <Graphic className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-muted">{project.client}</p>
                    <h3 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                      {project.headline}
                    </h3>
                    <div className="mt-5 space-y-3 text-base leading-relaxed text-ink-muted">
                      {narrativeParagraphs(project).map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-2 text-sm text-ink-muted">
                      {project.featuredTags.map((tag) => (
                        <li key={tag} className="rounded-full border border-ink/15 px-3 py-1">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <LinkButton href={`/work/${project.slug}`} variant="ghost" className="mt-6">
                      {project.ctaLabel}
                    </LinkButton>
                  </div>
                </div>
              </Container>
            </Reveal>
          );
        })}
      </div>

      <Container className="mt-12">
        <LinkButton href="/work" variant="secondary">
          See All Work
        </LinkButton>
      </Container>
    </section>
  );
}
```

Note: `reversed` alternates which side the graphic sits on for consecutive projects (an arbitrary CSS order flip via `lg:[&>*:first-child]:order-2`), giving the "different composition per project" contrast the spec asks for, on top of each project's graphic already looking completely different from the others.

- [ ] **Step 2: Run the existing test to verify it still passes**

Run: `npx vitest run components/home/FeaturedWork.test.tsx`
Expected: PASS, unchanged assertions.

- [ ] **Step 3: Verify the build succeeds**

Run: `npm run build`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/home/FeaturedWork.tsx
git commit -m "feat: redesign Featured Work as large alternating editorial project spreads"
```

---

### Task 8: Work index page redesign

**Files:**
- Modify: `app/work/page.tsx`
- Modify: `app/work/page.test.tsx` (only if needed — see Step 2)

**Interfaces:**
- Consumes: `projects` (unchanged), `Container`, `LinkButton`, and the three graphics from Task 4.
- The existing test asserts 3 `h2` headings equal to the client names in order, plus the "View Case Study" href for onpoint-clothing. Both remain true.

- [ ] **Step 1: Replace `app/work/page.tsx`**

```tsx
import type { Metadata } from "next";
import type { ComponentType } from "react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { projects } from "@/lib/data/projects";
import { OnPointGraphic } from "@/components/work/graphics/OnPointGraphic";
import { DillonGasGraphic } from "@/components/work/graphics/DillonGasGraphic";
import { WhatsAppGraphic } from "@/components/work/graphics/WhatsAppGraphic";

const GRAPHICS: Record<string, ComponentType<{ className?: string }>> = {
  "onpoint-clothing": OnPointGraphic,
  "dillon-gas": DillonGasGraphic,
  "whatsapp-automation-platform": WhatsAppGraphic,
};

export const metadata: Metadata = {
  title: "Work",
  description: "A look at some of the work Kuvah has helped bring to life.",
};

export default function WorkPage() {
  return (
    <>
      <section className="bg-paper py-20 sm:py-28">
        <Container width="narrow">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-6xl">
            Work with a reason behind it.
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>Every project starts with a different situation.</p>
            <p>A business trying to sell online.</p>
            <p>A company trying to serve customers better.</p>
            <p>A team looking for a better way to manage communication.</p>
            <p>This is some of the work we&apos;ve helped bring to life.</p>
          </div>
        </Container>
      </section>

      <section className="bg-paper pb-24">
        {projects.map((project, index) => {
          const Graphic = GRAPHICS[project.slug];
          return (
            <article key={project.slug} className={index > 0 ? "border-t border-ink/10" : ""}>
              <Container className="grid gap-8 py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 sm:py-20">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Graphic className="h-full w-full object-cover" />
                </div>
                <div>
                  <ul className="flex flex-wrap gap-2 text-sm text-ink-muted">
                    {project.workTags.map((tag) => (
                      <li key={tag} className="rounded-full border border-ink/15 px-3 py-1">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
                    {project.client}
                  </h2>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-muted">
                    {project.workSummary}
                  </p>
                  <LinkButton href={`/work/${project.slug}`} variant="secondary" className="mt-6">
                    {project.ctaLabel}
                  </LinkButton>
                </div>
              </Container>
            </article>
          );
        })}
      </section>
    </>
  );
}
```

- [ ] **Step 2: Run the existing test to verify it still passes**

Run: `npx vitest run app/work/page.test.tsx`
Expected: PASS, unchanged assertions.

- [ ] **Step 3: Verify the build succeeds**

Run: `npm run build`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/work/page.tsx
git commit -m "feat: redesign the /work index with large project imagery"
```

---

### Task 9: Case study template redesign

**Files:**
- Modify: `components/work/CaseStudy.tsx`
- Modify: `components/work/CaseStudy.test.tsx` (only if needed — see Step 2)

**Interfaces:**
- Consumes: `Project` type, `Container`, `LinkButton`, and the three graphics from Task 4 (looked up by `project.slug`, same map pattern as Tasks 7-8).
- The existing tests assert: OnPoint renders headings `["The challenge", "The approach", "What we built", "Focus areas"]` in order; Dillon Gas omits "The approach"/"The outcome"; WhatsApp shows its client name, its `h1` headline, and a "See all work" link to `/work`. All of these must remain true.

- [ ] **Step 1: Replace `CaseStudy.tsx`**

```tsx
import type { ComponentType } from "react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import type { Project } from "@/lib/data/projects";
import { OnPointGraphic } from "@/components/work/graphics/OnPointGraphic";
import { DillonGasGraphic } from "@/components/work/graphics/DillonGasGraphic";
import { WhatsAppGraphic } from "@/components/work/graphics/WhatsAppGraphic";

const GRAPHICS: Record<string, ComponentType<{ className?: string }>> = {
  "onpoint-clothing": OnPointGraphic,
  "dillon-gas": DillonGasGraphic,
  "whatsapp-automation-platform": WhatsAppGraphic,
};

export function CaseStudy({ project }: { project: Project }) {
  const { client, headline, narrative, focusAreas, slug } = project;
  const Graphic = GRAPHICS[slug];

  return (
    <article>
      <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
        <Graphic className="h-full w-full object-cover" />
      </div>

      <Container className="py-16 sm:py-24">
        <p className="text-sm font-semibold text-ink-muted">{client}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold text-ink sm:text-6xl">
          {headline}
        </h1>
      </Container>

      <Container width="narrow" className="space-y-12 pb-24">
        {narrative.challenge && (
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">The challenge</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">{narrative.challenge}</p>
          </section>
        )}
        {narrative.approach && (
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">The approach</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">{narrative.approach}</p>
          </section>
        )}
        {narrative.whatWeBuilt && (
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">What we built</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">{narrative.whatWeBuilt}</p>
          </section>
        )}
        {narrative.outcome && (
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">The outcome</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">{narrative.outcome}</p>
          </section>
        )}
        {focusAreas.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">Focus areas</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <li key={area} className="rounded-full border border-ink/15 px-3 py-1 text-sm text-ink-muted">
                  {area}
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>

      <Container className="border-t border-ink/10 py-16">
        <p className="text-sm font-semibold text-ink-muted">More work</p>
        <LinkButton href="/work" variant="secondary" className="mt-4">
          See all work
        </LinkButton>
      </Container>
    </article>
  );
}
```

The only structural addition versus the current version is the full-bleed graphic banner at the top; the conditional narrative-section logic is untouched.

- [ ] **Step 2: Run the existing test to verify it still passes**

Run: `npx vitest run components/work/CaseStudy.test.tsx`
Expected: PASS, unchanged assertions.

- [ ] **Step 3: Verify the build succeeds and all 3 case studies still statically generate**

Run: `npm run build`
Expected: no errors; `/work/onpoint-clothing`, `/work/dillon-gas`, `/work/whatsapp-automation-platform` still listed as generated static routes.

- [ ] **Step 4: Commit**

```bash
git add components/work/CaseStudy.tsx
git commit -m "feat: add full-bleed project graphic banner to the case study template"
```

---

### Task 10: Who We Work With redesign

**Files:**
- Modify: `components/home/WhoWeWorkWith.tsx`

**Interfaces:**
- Consumes: `Container`, `Reveal` (unchanged).
- No existing test file; verification is `npm run build` plus Task 15's QA pass, which must specifically check the accessibility requirement in Step 1's note (keyboard-focus reveal, and the always-expanded mobile behavior).

- [ ] **Step 1: Replace `WhoWeWorkWith.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const AUDIENCES = [
  {
    name: "Businesses growing beyond their current setup",
    body: [
      "You may have outgrown your current website, need a better customer experience or have a process that is becoming difficult to manage.",
      "We help you identify what needs to change and build around it.",
    ],
  },
  {
    name: "Founders turning an opportunity into a product",
    body: [
      "You see something that could exist and want to bring it to life.",
      "We help you think through the first version and focus on what matters before trying to build everything.",
    ],
  },
  {
    name: "Teams trying to work better",
    body: [
      "Your team has a process that takes too much time, involves too many steps or simply isn't working as well as it should.",
      "We explore whether a better system or automation can help.",
    ],
  },
];

export function WhoWeWorkWith() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            You don&apos;t need to fit into a box to work with us.
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            But most of the people we work with are trying to move something forward.
          </p>
        </Reveal>

        <div className="mt-16 divide-y divide-ink/15 border-t border-ink/15">
          {AUDIENCES.map((audience) => (
            <div key={audience.name} tabIndex={0} className="group py-8 outline-none sm:py-10">
              <Reveal>
                <h3 className="font-display text-2xl font-semibold text-ink transition-colors sm:text-3xl">
                  {audience.name}
                </h3>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] md:grid-rows-[0fr]">
                  <div className="overflow-hidden">
                    <div className="mt-4 max-w-xl space-y-3 text-base leading-relaxed text-ink-muted">
                      {audience.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 max-w-xl space-y-3 text-base leading-relaxed text-ink-muted md:hidden">
                  {audience.body.map((paragraph) => (
                    <p key={`mobile-${paragraph}`}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

Notes: below the `md` breakpoint, the grid-based hover reveal stays collapsed at `grid-rows-[0fr]` regardless of hover/focus (mobile has no hover, and this content is duplicated in the always-visible block right below it, hidden with `md:hidden`) — this means the body copy exists twice in markup (once in the animated reveal for desktop, once always-visible for mobile), which is the simplest correct way to give each breakpoint its own independent behavior without JavaScript. `Reveal`'s own prop type only accepts `children`/`className`/`as` (it doesn't forward arbitrary HTML attributes) — so the `tabIndex`/`group` responsibility sits on a plain wrapping `<div>` around each `Reveal`, not on `Reveal` itself. That outer div being both the `tabIndex={0}` target and the `.group` element is correct: `:focus-within` matches an element that itself has focus (not just a focused descendant), so `group-focus-within:` still triggers correctly when the div itself receives keyboard focus — pressing Tab through the section reveals each block's body copy as it receives focus, satisfying the "no hover-only content" constraint on desktop.

- [ ] **Step 2: Verify the build succeeds**

Run: `npm run build`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home/WhoWeWorkWith.tsx
git commit -m "feat: redesign Who We Work With as a hover/focus-revealed typographic list"
```

---

### Task 11: About redesign (homepage teaser + full page)

**Files:**
- Modify: `components/home/AboutTeaser.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/about/page.test.tsx` (only if needed — see Step 3)

**Interfaces:**
- Consumes: `Container`, `LinkButton`, `Reveal`, `SectionDivider` (Task 1).
- The existing `/about` test asserts the `h1`, the `h2`s ("What guides our work", "Where we're going"), and the 4 value names as `h3`s. All remain true.

- [ ] **Step 1: Replace `AboutTeaser.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function AboutTeaser() {
  return (
    <section className="bg-ink py-24 text-paper sm:py-32">
      <Container width="narrow">
        <Reveal>
          <h2 className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl">
            We didn&apos;t start Kuvah because the world needed another technology company.
          </h2>
          <div className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-paper/70">
            <p>Technology is everywhere.</p>
            <p>But useful technology is still difficult to build.</p>
            <p>
              It takes more than knowing how to write code. It requires understanding people,
              asking better questions and caring about what happens after something goes live.
            </p>
            <p>That&apos;s what we&apos;re building Kuvah around.</p>
            <p>A company that takes the work seriously.</p>
            <p>A company that stays curious.</p>
            <p>A company that understands before assuming.</p>
            <p>
              And a company that believes the things we build should leave people and businesses
              better than we found them.
            </p>
          </div>
          <LinkButton href="/about" variant="secondary-inverse" className="mt-8">
            More About Kuvah
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Replace `app/about/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "About",
  description: "What Kuvah believes, how it works, and the kind of company it's becoming.",
};

const VALUES = [
  {
    name: "Stay curious",
    body: "The first answer isn't always the right one. We ask questions and keep learning.",
  },
  {
    name: "Be clear",
    body: "Complexity isn't always a sign of intelligence. We value clear thinking and straightforward communication.",
  },
  {
    name: "Care about the work",
    body: "Details matter. We take responsibility for building things well.",
  },
  {
    name: "Build with purpose",
    body: "Not everything needs to exist. We want the things we build to be useful.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-topaz-deep [clip-path:polygon(40%_0,100%_0,100%_100%,0_100%)]" />
        <Container width="narrow" className="relative">
          <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl">
            We believe the work behind technology matters.
          </h1>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-paper/70">
            <p>Kuvah Technologies was built around a simple belief:</p>
            <p className="text-xl font-medium text-paper">Technology should serve a purpose.</p>
            <p>There is no shortage of things being built.</p>
            <p>New apps. New websites. New platforms. New tools.</p>
            <p>But building something is not the same as building something useful.</p>
            <p>We believe good technology starts before development begins.</p>
            <p>It starts with paying attention.</p>
            <p>Understanding what people need.</p>
            <p>Seeing where something isn&apos;t working.</p>
            <p>And asking whether there&apos;s a better way.</p>
            <p>That&apos;s how we approach our work.</p>
            <p>We listen before we assume.</p>
            <p>We ask questions before we prescribe solutions.</p>
            <p>And we try to understand the bigger picture before focusing on the technology.</p>
            <p>Because technology is only part of the answer.</p>
            <p>The people using it matter.</p>
            <p>The business behind it matters.</p>
            <p>And the problem it exists to solve matters.</p>
          </div>
        </Container>
      </section>

      <SectionDivider from="bg-ink" to="bg-mist" />

      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-5xl">
            What guides our work
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {VALUES.map((value, index) => (
              <div key={value.name} className="border-t border-ink/15 pt-6">
                <span className="font-display text-sm font-semibold text-topaz-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{value.name}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-muted">{value.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-topaz-deep py-24 text-paper sm:py-32">
        <Container width="narrow">
          <h2 className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl">
            Where we&apos;re going
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-paper/80">
            <p>
              We&apos;re building Kuvah into a technology company that creates useful products,
              supports ambitious businesses and continues to explore better ways of solving
              problems.
            </p>
            <p>We&apos;re still growing.</p>
            <p>Still learning.</p>
            <p>Still figuring things out.</p>
            <p>But we&apos;re serious about the work.</p>
            <p className="text-xl font-medium text-paper">And we&apos;re just getting started.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
```

Note: "Where we're going" moves from `bg-ink` to `bg-topaz-deep` — this is a deliberate escalation distinct from the opening `bg-ink` section, so the page has its own two-tone rhythm (dark → light → warm) rather than opening and closing on the identical dark tone. This does not violate the spec's "About = ink brand moment" framing — the opening hero-style block is the primary ink moment; the closing line gets its own warm, hopeful color rather than repeating the same dark tone twice in one page.

- [ ] **Step 3: Run the existing test to verify it still passes**

Run: `npx vitest run app/about/page.test.tsx`
Expected: PASS, unchanged assertions (h1, both h2s, and the 4 h3 value names in order all still present).

- [ ] **Step 4: Verify the build succeeds**

Run: `npm run build`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/home/AboutTeaser.tsx app/about/page.tsx
git commit -m "feat: redesign About as an immersive dark-to-warm brand moment"
```

---

### Task 12: Final CTA redesign

**Files:**
- Modify: `components/home/FinalCTA.tsx`

**Interfaces:**
- Consumes: `Container`, `LinkButton` (with the new `invert` variant from Task 1), `Reveal`, `SectionDivider` (Task 1).
- No existing test file; verification is `npm run build` plus Task 15's QA pass.

- [ ] **Step 1: Replace `FinalCTA.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";

export function FinalCTA() {
  return (
    <>
      <SectionDivider from="bg-mist" to="bg-topaz-deep" flip />
      <section className="bg-topaz-deep py-28 sm:py-40">
        <Container width="narrow">
          <Reveal>
            <h2 className="font-display text-4xl font-bold leading-[1.02] text-paper sm:text-7xl">
              Let&apos;s start with what you need.
            </h2>
            <div className="mt-8 max-w-xl space-y-4 text-lg leading-relaxed text-paper/80">
              <p>You don&apos;t need a perfect brief.</p>
              <p>You don&apos;t need to know exactly what technology to use.</p>
              <p>And you don&apos;t need to have every answer before reaching out.</p>
              <p>
                Tell us what you&apos;re working on, where you&apos;re stuck or what you&apos;re
                hoping to build.
              </p>
              <p className="text-xl font-medium text-paper">We&apos;ll start there.</p>
            </div>
            <LinkButton href="/start-a-project" variant="invert" className="mt-10">
              Start a Project
            </LinkButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify the build succeeds**

Run: `npm run build`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/home/FinalCTA.tsx
git commit -m "feat: redesign Final CTA as the site's topaz-deep visual climax"
```

---

### Task 13: Homepage section-order color-rhythm sanity pass

**Files:**
- Modify: `app/page.tsx` (only if a divider needs inserting between two sections — see Step 1)

**Interfaces:**
- Consumes: `SectionDivider` (Task 1), all 8 home section components (Tasks 2-3, 5-7, 10-12 — already modified individually).

- [ ] **Step 1: Review the homepage's actual rendered color sequence and add dividers at hard color transitions**

Read `app/page.tsx` (it should still be the same 8-component list from the original build: `Hero, Introduction, ServicesIndex, Approach, FeaturedWork, WhoWeWorkWith, AboutTeaser, FinalCTA`). Given the backgrounds each section now renders (`Hero`=paper, `Introduction`=mist, `ServicesIndex`=paper→mist→sky-deep internally, `Approach`=ink, `FeaturedWork`=paper, `WhoWeWorkWith`=mist, `AboutTeaser`=ink, `FinalCTA`=topaz-deep via its own `SectionDivider` already added in Task 12), insert a `<SectionDivider from="bg-sky-deep" to="bg-ink" />` between `ServicesIndex` and `Approach` (the one hard color seam not already handled inside a component), so `app/page.tsx` becomes:

```tsx
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Introduction } from "@/components/home/Introduction";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { Approach } from "@/components/home/Approach";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { WhoWeWorkWith } from "@/components/home/WhoWeWorkWith";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { SITE_DESCRIPTION } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Kuvah Technologies — Websites, Digital Products & Systems",
  description: SITE_DESCRIPTION,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <ServicesIndex />
      <SectionDivider from="bg-sky-deep" to="bg-ink" />
      <Approach />
      <FeaturedWork />
      <WhoWeWorkWith />
      <AboutTeaser />
      <FinalCTA />
    </>
  );
}
```

(Keep whatever the current file already imports for metadata — `SITE_DESCRIPTION` from `lib/data/site.ts` should already exist from the prior redesign-fix pass; if it doesn't exist in this codebase, use the literal description string that was already in this file before your changes instead of introducing a new import.)

- [ ] **Step 2: Run the existing homepage test to verify it still passes**

Run: `npx vitest run app/page.test.tsx`
Expected: PASS — the test asserts heading text/order, which is unaffected by inserting a purely decorative divider between two sections.

- [ ] **Step 3: Verify the full suite and build**

Run: `npm test && npm run build`
Expected: all tests pass, build succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add the one remaining hard color-transition divider on the homepage"
```

---

### Task 14: Nav and Footer polish pass

**Files:**
- Modify: `components/layout/Nav.tsx`
- Modify: `components/layout/Footer.tsx`

**Interfaces:**
- No structural change — same links, same hrefs, same `aria-current` behavior, same mobile menu logic. Only hover-state styling changes. The existing `Nav.test.tsx`/`Footer.test.tsx` must continue to pass unmodified.

- [ ] **Step 1: Refine Nav's link hover states**

In `components/layout/Nav.tsx`, find the desktop nav `<Link>` elements (the ones mapping over `NAV_LINKS`) and update their className from whatever plain hover treatment currently exists to an underline-draw effect:

```tsx
<Link
  key={link.href}
  href={link.href}
  aria-current={pathname === link.href ? "page" : undefined}
  className="relative text-sm font-medium text-ink after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-topaz after:transition-all after:duration-300 hover:after:w-full aria-[current=page]:after:w-full"
>
  {link.label}
</Link>
```

(Keep every other prop/attribute already on this element — `aria-current`, the `key`, the `href` — exactly as they are; only the `className` string changes.) Do the same for the mobile nav's `<Link>` elements if they have their own separate className (check the file — if the mobile links reuse a shared style constant, update that constant once).

- [ ] **Step 2: Verify Nav's existing tests still pass**

Run: `npx vitest run components/layout/Nav.test.tsx`
Expected: PASS, unchanged assertions (these test hrefs, aria-expanded, and menu open/close behavior — not hover classes).

- [ ] **Step 3: Refine Footer's link hover states**

In `components/layout/Footer.tsx`, apply the same underline-draw treatment to the footer nav `<Link>` elements for visual consistency with the header nav (same `after:` utility pattern as Step 1, minus the `aria-current` logic, which doesn't apply here).

- [ ] **Step 4: Verify Footer's existing tests still pass**

Run: `npx vitest run components/layout/Footer.test.tsx`
Expected: PASS, unchanged assertions.

- [ ] **Step 5: Verify the build succeeds**

Run: `npm run build`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add components/layout/Nav.tsx components/layout/Footer.tsx
git commit -m "style: refine Nav and Footer link hover states with an underline draw"
```

---

### Task 15: Consistency pass — Insights, Start a Project, Not Found

**Files:**
- Modify: `app/insights/page.tsx`
- Modify: `app/start-a-project/page.tsx`
- Modify: `app/not-found.tsx`

**Interfaces:**
- No structural/content change (per the spec's explicit non-goals for these three pages). Only bring their heading scale in line with the rest of the redesigned site (the spec's larger `h1` treatment) and swap any now-inconsistent spacing/token usage. The existing test files for all three must continue to pass unmodified.

- [ ] **Step 1: Update `app/insights/page.tsx`'s heading scale**

Find the `<h1>` in this file and change its className to match the scale used elsewhere in this plan (e.g., `font-display text-4xl font-semibold text-ink sm:text-6xl` — the same pattern used in Task 8's `/work` page and Task 5's `/services` page `h1`). Leave every word of copy and the rest of the structure untouched.

- [ ] **Step 2: Update `app/start-a-project/page.tsx`'s heading scale**

Same treatment: update the `<h1>`'s className to the `sm:text-6xl` scale. Leave the `StartProjectForm` import/usage and all copy untouched.

- [ ] **Step 3: Update `app/not-found.tsx`'s heading scale**

Same treatment, applied proportionally (this page's `h1` was already smaller/more modest than the main pages by design — bump it from its current scale to roughly `sm:text-5xl`, not all the way to `sm:text-6xl`, since a 404 page should stay quieter than a primary page).

- [ ] **Step 4: Run all three existing tests to verify they still pass**

Run: `npx vitest run app/insights/page.test.tsx app/start-a-project/page.test.tsx app/not-found.test.tsx`
Expected: PASS, unchanged assertions (these test heading text/level and button presence, not font-size classes).

- [ ] **Step 5: Verify the full suite and build**

Run: `npm test && npm run build`
Expected: all tests pass, build succeeds.

- [ ] **Step 6: Commit**

```bash
git add app/insights/page.tsx app/start-a-project/page.tsx app/not-found.tsx
git commit -m "style: bring Insights, Start a Project, and 404 heading scale in line with the redesign"
```

---

### Task 16: Full visual and accessibility QA pass

**Files:** none created — this task verifies, it doesn't write new source files. If it finds a defect, fix it in the relevant file from an earlier task and re-run this task's checks.

**Interfaces:** none new.

- [ ] **Step 1: Start the dev server**

Run (background): `npm run dev`
Expected: server starts on `http://localhost:3000`.

- [ ] **Step 2: Walk every route at mobile width (390×844) using Playwright**

Using the Playwright MCP tools (`browser_navigate`, `browser_resize`, `browser_snapshot`, `browser_take_screenshot`), visit `/`, `/services`, `/work`, `/work/onpoint-clothing`, `/work/dillon-gas`, `/work/whatsapp-automation-platform`, `/about`, `/start-a-project`, `/insights`. For each: confirm no horizontal scroll, confirm the Who We Work With section's body copy is visible without needing hover (mobile always-expanded per Task 10), confirm the Services numeral watermarks don't overlap/obscure foreground text, confirm oversized headline type doesn't overflow its container or clip at any width, confirm project graphics render at a reasonable aspect ratio without letterboxing gaps. Fix and re-check anything that fails before moving on.

- [ ] **Step 3: Walk every route at desktop width (1440×900)**

Repeat Step 2's navigation at 1440×900. Confirm: the Hero's ray-burst field and headline don't visually collide in an ugly way; the Services bands' numeral watermarks read as intentional background texture, not visual noise competing with foreground text; the Work section's alternating left/right graphic placement actually alternates; the About page's diagonal `topaz-deep` clip-path wedge doesn't clip any text; both `SectionDivider` placements (Services→Approach, Introduction/Mist→Final CTA) render a clean diagonal seam with no gap or overlap between the two colors.

- [ ] **Step 4: Keyboard-only pass**

On the homepage, Tab through the entire page: confirm the skip link still works, confirm every Nav link, the mobile menu toggle, every CTA, and the Who We Work With audience blocks (Task 10) reveal their body copy on focus, not just on hover. Confirm the Services capability list's decorative hover underline doesn't create a confusing extra tab stop (it shouldn't — Task 5 deliberately left those non-focusable).

- [ ] **Step 5: Reduced-motion check**

In the browser devtools, emulate `prefers-reduced-motion: reduce` (or use Playwright's `contextOptions.reducedMotion: 'reduce'` if available in this environment) and reload `/`. Confirm the Hero's `Reveal`-wrapped content appears immediately without a staggered entrance, and confirm the Who We Work With hover-expand transition still functions but without an animated duration (the content should snap open/closed rather than smoothly grow — this is the existing global reduced-motion CSS rule doing its job, not new code).

- [ ] **Step 6: Spot-check color contrast**

Using the browser's accessibility inspector or a contrast-checking devtool, spot-check: body text on the `sky-deep` Services band, body text on the `topaz-deep` Final CTA and About "Where we're going" sections, and the Services numeral watermark's opacity doesn't make it readable as text competing with real content (it should read as a background texture, not a legible number fighting for attention — if it's too legible/distracting at any breakpoint, reduce its opacity further in the relevant file from Task 5).

- [ ] **Step 7: Run the full automated suite one final time**

Run: `npm test && npx tsc --noEmit && npm run lint && npm run build`
Expected: all tests pass, no type errors, no lint warnings, build succeeds with no warnings introduced by this task's fixes.

- [ ] **Step 8: Commit any fixes made during this pass**

If Steps 2-6 required changes, stage exactly those files and commit:
```bash
git add <changed files>
git commit -m "fix: address visual/accessibility issues found in redesign QA pass"
```
If no changes were needed, skip this step — there is nothing to commit.
