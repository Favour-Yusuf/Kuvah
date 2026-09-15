# Kuvah Template-Driven Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Kuvah's existing pages on the visual system of a client-supplied agency-template reference (cards, single-accent color, pill-tag rhythm dividers, stats/testimonials sections), using only Kuvah's real brand colors and existing approved copy, and add a new Pricing page.

**Architecture:** Reuse the existing Next.js App Router structure, Tailwind v4 `@theme` tokens, and component conventions (`Container`, `Reveal`, `LinkButton`, `SectionDivider`) established in the codebase. Introduce one new primitive (`TagStrip`, the template's pill-tag rhythm motif) and three new data-driven home sections (`Stats`, `Testimonials`, plus a new `/pricing` route) seeded with clearly-marked placeholder data per the client's explicit instruction. Existing pages are restyled in place — component APIs, routes, and copy stay the same; only markup/classes change, except where a section is genuinely new.

**Tech Stack:** Next.js 16 App Router, TypeScript, React 19, Tailwind v4, Vitest + React Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-15-kuvah-template-redesign.md`

## Global Constraints

- Brand colors only: `--color-ink` (#1E1E2F), `--color-topaz` (#FFCB77), `--color-sky` (#5BC0EB), `--color-mist` (#F4F4F6), plus the already-defined `--color-topaz-deep` (#8A5A22) and `--color-sky-deep` (#164C63). No new colors invented.
- Topaz is the single lead accent (buttons, tags, underlines, icon fills, numerals). Sky is secondary/support only, never competing with topaz in the same section.
- No stock photography anywhere. All imagery is abstract custom SVG graphics.
- No fabricated testimonials, stats, or pricing in the *launched* site — but per explicit client instruction, these three sections ship now with clearly-marked placeholder data (fictitious names like "Client Name", illustrative round figures, no star rating even as a placeholder) rather than being left empty. Every placeholder data file starts with a `// PLACEHOLDER — replace before launch, see docs/superpowers/specs/2026-09-15-kuvah-template-redesign.md` comment.
- Existing approved copy is reused verbatim wherever it already appears in a component. New sections that didn't exist in the approved copy doc (`Stats`, `Testimonials`, `Pricing` page headings, `TagStrip` labels, and small structural eyebrow/label text) use minimal new UI chrome written in Kuvah's existing plain, direct voice — never new marketing claims.
- Every task must run the full `npm test` suite (not just `npm run build`) before being considered done.
- Any new color-on-color text combination introduced must be verified numerically (relative luminance / WCAG contrast ratio via a Node script), never eyeballed. Two combinations are pre-verified for this plan: `text-topaz` on `bg-topaz-deep` = 3.94:1 (passes AA for large/bold text only — use only for large/bold numerals, never body-size text), and `text-paper/90` on `bg-topaz-deep` = 5.14:1 (passes AA for all text sizes).
- `prefers-reduced-motion` must remain respected; no new component may introduce animation that ignores it (reuse `Reveal`, which already handles this).
- No accessibility-tree duplication from responsive show/hide patterns (the mistake already fixed once in `WhoWeWorkWith`).
- Every existing test file listed in this plan's tasks must still pass unless the task explicitly says to update it — if a task's restyle unexpectedly breaks an existing assertion not mentioned here, that's a signal the restyle changed more than intended; fix the restyle to match the existing contract rather than loosening the test.

---

### Task 1: Placeholder data layer — testimonials, stats, pricing

**Files:**
- Create: `lib/data/testimonials.ts`
- Create: `lib/data/stats.ts`
- Create: `lib/data/pricing.ts`

**Interfaces:**
- Produces: `Testimonial` type (`quote: string; name: string; role: string`) and `testimonials: Testimonial[]` from `lib/data/testimonials.ts`.
- Produces: `Stat` type (`value: string; label: string`) and `stats: Stat[]` from `lib/data/stats.ts`.
- Produces: `PricingTier` type (`name: string; price: string; description: string; features: string[]`) and `pricingTiers: PricingTier[]` from `lib/data/pricing.ts`.

This task has no tests of its own (matching the existing convention — `lib/data/services.ts` and `lib/data/projects.ts` are also untested directly; they're exercised through the components that consume them in later tasks).

- [ ] **Step 1: Create `lib/data/testimonials.ts`**

```ts
// PLACEHOLDER — replace before launch, see docs/superpowers/specs/2026-09-15-kuvah-template-redesign.md
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Placeholder testimonial #1 — replace with a real client quote before launch.",
    name: "Client Name",
    role: "Role, Company Name",
  },
  {
    quote: "Placeholder testimonial #2 — replace with a real client quote before launch.",
    name: "Client Name",
    role: "Role, Company Name",
  },
];
```

- [ ] **Step 2: Create `lib/data/stats.ts`**

```ts
// PLACEHOLDER — replace before launch, see docs/superpowers/specs/2026-09-15-kuvah-template-redesign.md
export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "XX", label: "Projects delivered (placeholder — replace with a real count)" },
  { value: "XX", label: "Years active (placeholder — replace with a real count)" },
  { value: "XX", label: "Clients worked with (placeholder — replace with a real count)" },
];
```

- [ ] **Step 3: Create `lib/data/pricing.ts`**

```ts
// PLACEHOLDER — replace before launch, see docs/superpowers/specs/2026-09-15-kuvah-template-redesign.md
export type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Tier One (placeholder)",
    price: "$XXX (placeholder)",
    description: "Placeholder description — replace before launch.",
    features: ["Placeholder feature A", "Placeholder feature B", "Placeholder feature C"],
  },
  {
    name: "Tier Two (placeholder)",
    price: "$XXX (placeholder)",
    description: "Placeholder description — replace before launch.",
    features: ["Placeholder feature A", "Placeholder feature B", "Placeholder feature C"],
  },
  {
    name: "Tier Three (placeholder)",
    price: "$XXX (placeholder)",
    description: "Placeholder description — replace before launch.",
    features: ["Placeholder feature A", "Placeholder feature B", "Placeholder feature C"],
  },
];
```

- [ ] **Step 4: Run the full test suite to confirm nothing broke**

Run: `npm test`
Expected: all existing tests still pass (these are new, unimported files).

- [ ] **Step 5: Commit**

```bash
git add lib/data/testimonials.ts lib/data/stats.ts lib/data/pricing.ts
git commit -m "feat: add placeholder testimonials, stats, and pricing data

Client asked for these sections built now rather than left empty.
Placeholders are marked and unrealistic on purpose (fictitious names,
illustrative round numbers) so they can't be mistaken for real content
before being swapped out."
```

---

### Task 2: `TagStrip` component — pill-tag rhythm divider

**Files:**
- Create: `components/ui/TagStrip.tsx`
- Test: `components/ui/TagStrip.test.tsx`

**Interfaces:**
- Produces: `TagStrip({ labels: string[]; tone?: "topaz" | "ink" })` from `components/ui/TagStrip.tsx`, a horizontal band of pill-shaped labels used as a section-rhythm device (distinct from the diagonal-wedge `SectionDivider`).

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TagStrip } from "./TagStrip";

describe("TagStrip", () => {
  it("renders every label as a list item, in order", () => {
    render(<TagStrip labels={["Digital Experiences", "Digital Products", "Systems & Automation"]} />);
    const items = screen.getAllByRole("listitem").map((el) => el.textContent);
    expect(items).toEqual(["Digital Experiences", "Digital Products", "Systems & Automation"]);
  });

  it("defaults to the topaz tone", () => {
    const { container } = render(<TagStrip labels={["One"]} />);
    expect(container.firstChild).toHaveClass("bg-topaz");
  });

  it("supports the ink tone", () => {
    const { container } = render(<TagStrip labels={["One"]} tone="ink" />);
    expect(container.firstChild).toHaveClass("bg-ink");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/ui/TagStrip.test.tsx`
Expected: FAIL with "Cannot find module './TagStrip'"

- [ ] **Step 3: Write the implementation**

```tsx
export function TagStrip({
  labels,
  tone = "topaz",
}: {
  labels: string[];
  tone?: "topaz" | "ink";
}) {
  const toneClasses = tone === "topaz" ? "bg-topaz text-ink" : "bg-ink text-paper";

  return (
    <div className={`${toneClasses} overflow-x-auto py-4`}>
      <ul className="flex w-max min-w-full items-center justify-center gap-3 px-4 sm:px-6 lg:px-8">
        {labels.map((label) => (
          <li
            key={label}
            className="whitespace-nowrap rounded-full border border-current/20 px-4 py-1.5 text-sm font-semibold"
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/ui/TagStrip.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: all tests pass (this is a new, unused-yet file, but confirming nothing else broke is required before every commit in this plan)

- [ ] **Step 6: Commit**

```bash
git add components/ui/TagStrip.tsx components/ui/TagStrip.test.tsx
git commit -m "feat: add TagStrip pill-tag rhythm divider component"
```

---

### Task 3: `Stats` component

**Files:**
- Create: `components/home/Stats.tsx`
- Test: `components/home/Stats.test.tsx`

**Interfaces:**
- Consumes: `stats: Stat[]` from `lib/data/stats.ts` (Task 1).
- Produces: `Stats()` from `components/home/Stats.tsx`, a home-page section rendering `dt`/`dd` pairs for each stat; renders `null` if `stats` is empty.

- [ ] **Step 1: Write the failing tests**

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Stats } from "./Stats";

vi.mock("@/lib/data/stats", () => ({
  stats: [
    { value: "XX", label: "Projects delivered (placeholder — replace with a real count)" },
    { value: "XX", label: "Years active (placeholder — replace with a real count)" },
  ],
}));

describe("Stats", () => {
  it("renders the section heading and every stat's value and label", () => {
    render(<Stats />);
    expect(
      screen.getByRole("heading", { level: 2, name: "A few numbers behind the work." })
    ).toBeInTheDocument();
    expect(screen.getAllByText("XX")).toHaveLength(2);
    expect(
      screen.getByText("Projects delivered (placeholder — replace with a real count)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Years active (placeholder — replace with a real count)")
    ).toBeInTheDocument();
  });
});

describe("Stats with no data", () => {
  it("renders nothing when the stats array is empty", async () => {
    vi.doMock("@/lib/data/stats", () => ({ stats: [] }));
    vi.resetModules();
    const { Stats: EmptyStats } = await import("./Stats");
    const { container } = render(<EmptyStats />);
    expect(container).toBeEmptyDOMElement();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/home/Stats.test.tsx`
Expected: FAIL with "Cannot find module './Stats'"

- [ ] **Step 3: Write the implementation**

```tsx
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/lib/data/stats";

export function Stats() {
  if (stats.length === 0) return null;

  return (
    <section className="bg-topaz-deep py-20 text-paper sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            A few numbers behind the work.
          </h2>
        </Reveal>
        <dl className="mt-14 grid gap-10 sm:grid-cols-3">
          {stats.map((stat) => (
            <Reveal key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-5xl font-bold text-topaz sm:text-6xl">
                {stat.value}
              </dd>
              <p className="mt-2 text-base text-paper/90">{stat.label}</p>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
```

Note on contrast: `text-topaz` on `bg-topaz-deep` is 3.94:1 — fine for the large bold numeral (`text-5xl`/`text-6xl`), but the label uses `text-paper/90` (5.14:1), not `text-paper/70` (3.82:1, which would fail AA for this body-size text).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/home/Stats.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: all tests pass

- [ ] **Step 6: Commit**

```bash
git add components/home/Stats.tsx components/home/Stats.test.tsx
git commit -m "feat: add Stats home section"
```

---

### Task 4: `Testimonials` component

**Files:**
- Create: `components/home/Testimonials.tsx`
- Test: `components/home/Testimonials.test.tsx`

**Interfaces:**
- Consumes: `testimonials: Testimonial[]` from `lib/data/testimonials.ts` (Task 1).
- Produces: `Testimonials()` from `components/home/Testimonials.tsx`; renders `null` if `testimonials` is empty. No numeric star rating is ever rendered.

- [ ] **Step 1: Write the failing tests**

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Testimonials } from "./Testimonials";

vi.mock("@/lib/data/testimonials", () => ({
  testimonials: [
    { quote: "Great to work with.", name: "Client Name", role: "Role, Company Name" },
    { quote: "Delivered on time.", name: "Client Name", role: "Role, Company Name" },
  ],
}));

describe("Testimonials", () => {
  it("renders the section heading and every quote with its attribution", () => {
    render(<Testimonials />);
    expect(
      screen.getByRole("heading", { level: 2, name: "What clients have said." })
    ).toBeInTheDocument();
    expect(screen.getByText(/Great to work with\./)).toBeInTheDocument();
    expect(screen.getByText(/Delivered on time\./)).toBeInTheDocument();
    expect(screen.getAllByText("Client Name — Role, Company Name")).toHaveLength(2);
  });

  it("never renders a numeric star rating", () => {
    render(<Testimonials />);
    expect(screen.queryByText(/★|stars?|\d\.\d\s*\/\s*5/i)).not.toBeInTheDocument();
  });
});

describe("Testimonials with no data", () => {
  it("renders nothing when the testimonials array is empty", async () => {
    vi.doMock("@/lib/data/testimonials", () => ({ testimonials: [] }));
    vi.resetModules();
    const { Testimonials: EmptyTestimonials } = await import("./Testimonials");
    const { container } = render(<EmptyTestimonials />);
    expect(container).toBeEmptyDOMElement();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/home/Testimonials.test.tsx`
Expected: FAIL with "Cannot find module './Testimonials'"

- [ ] **Step 3: Write the implementation**

```tsx
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            What clients have said.
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-8 sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal as="li" key={index}>
              <figure className="h-full border border-ink/15 bg-paper p-8">
                <blockquote className="text-lg leading-relaxed text-ink">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm font-semibold text-ink-muted">
                  {testimonial.name} — {testimonial.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/home/Testimonials.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: all tests pass

- [ ] **Step 6: Commit**

```bash
git add components/home/Testimonials.tsx components/home/Testimonials.test.tsx
git commit -m "feat: add Testimonials home section (no star rating, ever)"
```

---

### Task 5: Restyle `ServicesIndex` into a numbered icon-card grid

**Files:**
- Modify: `components/home/ServicesIndex.tsx`
- Test: `components/home/ServicesIndex.test.tsx` (existing — verify it still passes; do not weaken its assertions)

**Interfaces:**
- Consumes: `services: Service[]` from `lib/data/services.ts` (unchanged).
- Produces: `ServicesIndex()` — same export name and no-props signature as before, so `app/page.tsx` doesn't change its import.

- [ ] **Step 1: Read the existing test to confirm what must keep passing**

The existing `components/home/ServicesIndex.test.tsx` asserts: three `h3` headings equal to `["Digital Experiences", "Digital Products", "Systems & Automation"]`, that `"01"`/`"02"`/`"03"` each appear at least once, and that the link named `"Explore Digital Experiences"` has `href="/services#digital-experiences"`. The rewrite below preserves all three.

- [ ] **Step 2: Replace the implementation**

```tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/data/services";

export function ServicesIndex() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            What can we help you build?
          </h2>
          <p className="mt-4 text-lg text-ink-muted">We work across three areas.</p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {services.map((service) => (
            <Reveal
              key={service.slug}
              className="group flex h-full flex-col border border-ink/10 bg-paper p-8 transition-colors hover:border-topaz"
            >
              <span className="font-display text-3xl font-bold text-topaz">{service.number}</span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-ink">{service.name}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">{service.homeIntro[0]}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {service.homeCapabilities.map((capability) => (
                  <li
                    key={capability}
                    className="rounded-full border border-ink/15 px-3 py-1 text-sm text-ink-muted"
                  >
                    {capability}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services#${service.slug}`}
                className="mt-auto pt-8 text-sm font-semibold text-ink underline decoration-topaz decoration-2 underline-offset-4"
              >
                {service.homeCtaLabel}
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

Note: the card shows only `service.homeIntro[0]` (the lead sentence) rather than all of `homeIntro`, to fit the compact card format. This mirrors the existing pattern where `homeCapabilities` is already a trimmed summary distinct from the fuller `pageCapabilities` — the full `homeIntro` text isn't lost, it's simply not the home-page's job to show all of it (the `/services` page already does, unchanged).

- [ ] **Step 3: Run the existing test**

Run: `npx vitest run components/home/ServicesIndex.test.tsx`
Expected: PASS, unmodified

- [ ] **Step 4: Run the full test suite**

Run: `npm test`
Expected: all tests pass

- [ ] **Step 5: Commit**

```bash
git add components/home/ServicesIndex.tsx
git commit -m "style: restyle ServicesIndex as a numbered icon-card grid"
```

---

### Task 6: Restyle `Approach` into a numbered step-rail

**Files:**
- Modify: `components/home/Approach.tsx`
- Test: `components/home/Approach.test.tsx` (existing — verify it still passes)

**Interfaces:**
- Produces: `Approach()` — same export/signature as before.

- [ ] **Step 1: Confirm what the existing test requires**

`components/home/Approach.test.tsx` asserts four `h3` headings equal to `["Understand", "Clarify", "Build", "Improve"]` and that the closing line `"Good work starts with understanding what needs to change."` is present. Both are preserved below.

- [ ] **Step 2: Replace the implementation**

```tsx
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

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

        <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.name} className="border border-paper/15 p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-topaz font-display text-sm font-bold text-ink">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold">{step.name}</h3>
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

- [ ] **Step 3: Run the existing test**

Run: `npx vitest run components/home/Approach.test.tsx`
Expected: PASS, unmodified

- [ ] **Step 4: Run the full test suite**

Run: `npm test`
Expected: all tests pass

- [ ] **Step 5: Commit**

```bash
git add components/home/Approach.tsx
git commit -m "style: restyle Approach as a numbered step-rail with card treatment"
```

---

### Task 7: Restyle `FeaturedWork` into a project-card grid

**Files:**
- Modify: `components/home/FeaturedWork.tsx`
- Test: `components/home/FeaturedWork.test.tsx` (existing — verify it still passes)

**Interfaces:**
- Consumes: `projects`, `narrativeParagraphs` from `lib/data/projects.ts` (unchanged).
- Produces: `FeaturedWork()` — same export/signature as before.

- [ ] **Step 1: Confirm what the existing test requires**

`components/home/FeaturedWork.test.tsx` asserts the link named `"View Case Study"` has `href="/work/onpoint-clothing"`, the two links named `"View Project"` have hrefs `["/work/dillon-gas", "/work/whatsapp-automation-platform"]` in that order, and a link named `"See All Work"` has `href="/work"`. All preserved below.

- [ ] **Step 2: Replace the implementation**

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

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const Graphic = GRAPHICS[project.slug];
            return (
              <Reveal
                key={project.slug}
                className="group flex h-full flex-col border border-ink/10 transition-colors hover:border-topaz"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {Graphic && (
                    <Graphic className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-semibold text-ink-muted">{project.client}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                    {project.headline}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-muted">
                    {narrativeParagraphs(project)[0]}
                  </p>
                  <LinkButton href={`/work/${project.slug}`} variant="ghost" className="mt-auto pt-6">
                    {project.ctaLabel}
                  </LinkButton>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <Container className="mt-12">
        <LinkButton href="/work" variant="secondary">
          See All Work
        </LinkButton>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Run the existing test**

Run: `npx vitest run components/home/FeaturedWork.test.tsx`
Expected: PASS, unmodified

- [ ] **Step 4: Run the full test suite**

Run: `npm test`
Expected: all tests pass

- [ ] **Step 5: Commit**

```bash
git add components/home/FeaturedWork.tsx
git commit -m "style: restyle FeaturedWork as a project-card grid"
```

---

### Task 8: Fix Hero overflow and restyle its composition

**Files:**
- Modify: `components/home/Hero.tsx`

**Interfaces:**
- Produces: `Hero()` — same export/signature as before. Its rendered `h1` text content must remain exactly `"Technology is easy to build. Building the right thing is harder."` because `app/page.test.tsx` (updated in Task 9) depends on it.

This is the confirmed overflow/clipping bug fix: the previous markup forced five separate visual lines via manual `<br />` tags regardless of viewport width, combined with a `clamp()` topping out at 7.5rem — on typical desktop widths this produced a headline roughly 600px tall before body copy, buttons, and padding, pushing content well past the fold. The fix removes the forced mid-sentence breaks (letting the two sentences wrap naturally) and lowers the size ceiling, which also happens to match the template's cleaner, shorter hero headline treatment.

- [ ] **Step 1: Replace the implementation**

```tsx
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SignatureRays } from "@/components/graphics/SignatureRays";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-16 sm:pb-28 sm:pt-24">
      <Reveal className="delay-0">
        <div className="pointer-events-none absolute -right-24 top-0 h-[300px] w-[300px] sm:-right-16 sm:h-[440px] sm:w-[440px] lg:h-[520px] lg:w-[520px]">
          <div className="absolute inset-0 rounded-full bg-topaz/30 blur-3xl" />
          <SignatureRays className="relative h-full w-full text-topaz/60" />
        </div>
      </Reveal>
      <Container className="relative">
        <Reveal className="delay-150">
          <h1 className="max-w-3xl font-display text-[clamp(2.25rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-paper">
            Technology is easy to build.{" "}
            <span className="relative inline">
              Building the right thing is <span className="text-topaz">harder.</span>
            </span>
          </h1>
        </Reveal>
        <Reveal className="relative z-10 mt-8 max-w-xl space-y-4 text-lg leading-relaxed text-paper/70 delay-300 sm:mt-10">
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
          <LinkButton href="/start-a-project" variant="invert">
            Start a Project
          </LinkButton>
          <LinkButton href="/work" variant="secondary-inverse">
            View Our Work
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify the headline text content by hand**

The `h1`'s `textContent` concatenates to: `"Technology is easy to build."` + `" "` + `"Building the right thing is "` + `"harder."` = `"Technology is easy to build. Building the right thing is harder."` — matches what `app/page.test.tsx` expects (unchanged from before). This is verified in Task 9's test run, since `Hero` has no standalone test file.

- [ ] **Step 3: Manually sanity-check the height reduction**

At a 1440px-wide viewport, `7vw` = 100.8px, clamped to the 5.5rem (88px) ceiling. Two wrapped lines at `leading-[1.05]` is roughly `2 × 88 × 1.05 ≈ 185px` for the headline — versus the old markup's five forced lines at up to 120px each (~600px). Combined with the reduced section padding (`pb-20 pt-16` vs. the old `pb-24 pt-20`), total hero content height drops from roughly 1000px+ to under 600px at common desktop widths, which resolves the overflow the client's screenshot showed.

- [ ] **Step 4: Run the full test suite**

Run: `npm test`
Expected: all tests pass. Note `app/page.test.tsx` still has the OLD heading array at this point (it's updated in Task 9), so it should still pass since the `h1` text is unchanged by this task.

- [ ] **Step 5: Commit**

```bash
git add components/home/Hero.tsx
git commit -m "fix: resolve Hero headline overflow by removing forced line breaks

Five manually forced <br /> line breaks combined with a 7.5rem clamp
ceiling made the headline roughly 600px tall on its own, pushing hero
content well past the fold on common desktop viewports. Letting the
two sentences wrap naturally and lowering the ceiling to 5.5rem fixes
the overflow the client's screenshot showed."
```

---

### Task 9: Wire new sections into the home page and update its cross-cutting test

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/page.test.tsx`

**Interfaces:**
- Consumes: `TagStrip` (Task 2), `Stats` (Task 3), `Testimonials` (Task 4), and the restyled `ServicesIndex`/`Approach`/`FeaturedWork`/`Hero` (Tasks 5-8).

- [ ] **Step 1: Update `app/page.test.tsx` first (this will fail until Step 2 lands)**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the hero headline and all ten narrative sections in order", () => {
    render(<HomePage />);
    const headings = screen.getAllByRole("heading", { level: 1 }).concat(
      screen.getAllByRole("heading", { level: 2 })
    );
    const text = headings.map((h) => h.textContent);
    expect(text).toEqual([
      "Technology is easy to build. Building the right thing is harder.",
      "Before we build, we listen.",
      "What can we help you build?",
      "We don't jump straight into development.",
      "A few numbers behind the work.",
      "A few things we've worked on.",
      "What clients have said.",
      "You don't need to fit into a box to work with us.",
      "We didn't start Kuvah because the world needed another technology company.",
      "Let's start with what you need.",
    ]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/page.test.tsx`
Expected: FAIL — actual array is missing the two new headings

- [ ] **Step 3: Update `app/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Introduction } from "@/components/home/Introduction";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { Approach } from "@/components/home/Approach";
import { Stats } from "@/components/home/Stats";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Testimonials } from "@/components/home/Testimonials";
import { WhoWeWorkWith } from "@/components/home/WhoWeWorkWith";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FinalCTA } from "@/components/home/FinalCTA";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { TagStrip } from "@/components/ui/TagStrip";
import { SITE_DESCRIPTION } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Kuvah Technologies — Websites, Digital Products & Systems",
  description: SITE_DESCRIPTION,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TagStrip
        labels={["Digital Experiences", "Digital Products", "Systems & Automation", "Build with Purpose"]}
        tone="topaz"
      />
      <Introduction />
      <ServicesIndex />
      <SectionDivider from="bg-mist" to="bg-ink" />
      <Approach />
      <Stats />
      <FeaturedWork />
      <TagStrip
        labels={["Ecommerce", "Mobile Development", "Automation", "Web Development", "Product Development"]}
        tone="ink"
      />
      <Testimonials />
      <WhoWeWorkWith />
      <AboutTeaser />
      <FinalCTA />
    </>
  );
}
```

Note the `SectionDivider` `from` color changed from `"bg-sky-deep"` to `"bg-mist"` — `ServicesIndex` is now a single `bg-mist` card grid (Task 5) rather than the old multi-band layout that ended on `bg-sky-deep`, so the divider must match its actual background or the diagonal wedge will show the wrong color on one side.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run app/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Run the full suite**

Run: `npm test`
Expected: all tests pass

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/page.test.tsx
git commit -m "feat: wire TagStrip, Stats, and Testimonials into the home page"
```

---

### Task 10: Polish pass on Introduction, WhoWeWorkWith, AboutTeaser, FinalCTA

**Files:**
- Modify: `components/home/Introduction.tsx`
- Modify: `components/home/WhoWeWorkWith.tsx`
- Modify: `components/home/AboutTeaser.tsx`
- Modify: `components/home/FinalCTA.tsx`

**Interfaces:**
- Each produces the same export/signature as before. Heading text must stay byte-identical to what `app/page.test.tsx` (Task 9) expects: `"Before we build, we listen."`, `"You don't need to fit into a box to work with us."`, `"We didn't start Kuvah because the world needed another technology company."`, `"Let's start with what you need."`.

These four sections already fit the new visual system reasonably well (topaz callout box, ink/topaz-deep panels); this task is a lighter visual-consistency pass, not a structural rewrite — border accents and spacing only, no copy or heading changes.

- [ ] **Step 1: Add a topaz left-border accent to Introduction's callout box**

In `components/home/Introduction.tsx`, change:

```tsx
<div className="bg-topaz p-8 sm:p-10">
```

to:

```tsx
<div className="border-l-4 border-topaz-deep bg-topaz p-8 sm:p-10">
```

- [ ] **Step 2: Give WhoWeWorkWith's rows a card-style hover treatment**

In `components/home/WhoWeWorkWith.tsx`, change the row wrapper from:

```tsx
<div key={audience.name} tabIndex={0} className="group py-8 sm:py-10">
```

to:

```tsx
<div
  key={audience.name}
  tabIndex={0}
  className="group border-l-4 border-transparent py-8 pl-6 transition-colors hover:border-topaz focus-within:border-topaz sm:py-10"
>
```

- [ ] **Step 3: Widen AboutTeaser's topaz-deep wedge accent slightly for more visual weight**

In `components/home/AboutTeaser.tsx`, change:

```tsx
<div className="pointer-events-none absolute right-0 top-0 h-48 w-1/3 bg-topaz-deep [clip-path:polygon(40%_0,100%_0,100%_100%,0_100%)] sm:h-64 lg:h-80" />
```

to:

```tsx
<div className="pointer-events-none absolute right-0 top-0 h-56 w-2/5 bg-topaz-deep [clip-path:polygon(40%_0,100%_0,100%_100%,0_100%)] sm:h-72 lg:h-96" />
```

- [ ] **Step 4: Add a card border around FinalCTA's content column**

In `components/home/FinalCTA.tsx`, change:

```tsx
<Container width="narrow">
  <Reveal>
```

to:

```tsx
<Container width="narrow">
  <Reveal className="border-l-4 border-ink pl-8">
```

- [ ] **Step 5: Run the full suite**

Run: `npm test`
Expected: all tests pass (no heading text changed, so `app/page.test.tsx` from Task 9 is unaffected)

- [ ] **Step 6: Commit**

```bash
git add components/home/Introduction.tsx components/home/WhoWeWorkWith.tsx components/home/AboutTeaser.tsx components/home/FinalCTA.tsx
git commit -m "style: consistency pass on home page supporting sections"
```

---

### Task 11: Restyle the Services page

**Files:**
- Modify: `app/services/page.tsx`
- Test: `app/services/page.test.tsx` (existing — verify it still passes)

**Interfaces:**
- Consumes: `TagStrip` (Task 2), `services` from `lib/data/services.ts` (unchanged).

- [ ] **Step 1: Confirm what the existing test requires**

`app/services/page.test.tsx` asserts `section[id]` elements in order `["digital-experiences", "digital-products", "systems-automation"]` and three specific CTA links by name. Both preserved below — only the capability grid becomes bordered tiles and a `TagStrip` is added.

- [ ] **Step 2: Replace the implementation**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { TagStrip } from "@/components/ui/TagStrip";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital experiences, digital products, and systems & automation — see where Kuvah can help move your business forward.",
};

const BAND_STYLES = {
  "digital-experiences": { bg: "bg-paper", text: "text-ink", muted: "text-ink-muted", watermark: "text-ink/5", button: "primary" as const, tileBorder: "border-ink/15" },
  "digital-products": { bg: "bg-mist", text: "text-ink", muted: "text-ink-muted", watermark: "text-ink/5", button: "primary" as const, tileBorder: "border-ink/15" },
  "systems-automation": { bg: "bg-sky-deep", text: "text-paper", muted: "text-paper/70", watermark: "text-paper/10", button: "invert" as const, tileBorder: "border-paper/20" },
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

      <TagStrip labels={services.map((service) => service.name)} tone="topaz" />

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

                <div className="mt-12 grid gap-4 sm:grid-cols-2">
                  {service.pageCapabilities.map((capability) => (
                    <div key={capability.name} className={`border p-5 ${style.tileBorder}`}>
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

- [ ] **Step 3: Run the existing test**

Run: `npx vitest run app/services/page.test.tsx`
Expected: PASS, unmodified

- [ ] **Step 4: Run the full test suite**

Run: `npm test`
Expected: all tests pass

- [ ] **Step 5: Commit**

```bash
git add app/services/page.tsx
git commit -m "style: restyle Services page with TagStrip and card-tiled capabilities"
```

---

### Task 12: Restyle the Work page and case-study template

**Files:**
- Modify: `app/work/page.tsx`
- Modify: `components/work/CaseStudy.tsx`
- Test: `app/work/page.test.tsx` (existing — verify it still passes)
- Test: `components/work/CaseStudy.test.tsx` (existing — verify it still passes)

**Interfaces:**
- Consumes: `TagStrip` (Task 2), `projects`/`getProjectBySlug` from `lib/data/projects.ts` (unchanged).

- [ ] **Step 1: Confirm what the existing tests require**

`app/work/page.test.tsx` asserts `h2` headings equal to `["OnPoint Clothing", "Dillon Gas", "WhatsApp Automation Platform"]` and a `"View Case Study"` link to `/work/onpoint-clothing`. `components/work/CaseStudy.test.tsx` asserts the narrative `h2` order per project, the project `h1` headline, the client name text, and a `"See all work"` link to `/work`. All preserved below.

- [ ] **Step 2: Replace `app/work/page.tsx`**

```tsx
import type { Metadata } from "next";
import type { ComponentType } from "react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { TagStrip } from "@/components/ui/TagStrip";
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

      <TagStrip labels={["Ecommerce", "Mobile Development", "Automation", "Web Development", "Product Development"]} tone="ink" />

      <section className="bg-paper py-24">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const Graphic = GRAPHICS[project.slug];
              return (
                <article
                  key={project.slug}
                  className="group flex h-full flex-col border border-ink/10 transition-colors hover:border-topaz"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {Graphic && <Graphic className="h-full w-full object-cover" />}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <ul className="flex flex-wrap gap-2 text-sm text-ink-muted">
                      {project.workTags.map((tag) => (
                        <li key={tag} className="rounded-full border border-ink/15 px-3 py-1">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
                      {project.client}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-ink-muted">
                      {project.workSummary}
                    </p>
                    <LinkButton href={`/work/${project.slug}`} variant="secondary" className="mt-auto pt-6">
                      {project.ctaLabel}
                    </LinkButton>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Replace `components/work/CaseStudy.tsx`**

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
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {Graphic && <Graphic className="h-full w-full object-cover" />}
      </div>

      <Container className="py-16 sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-wide text-topaz-deep">Case Study</p>
        <p className="mt-4 text-sm font-semibold text-ink-muted">{client}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold text-ink sm:text-6xl">
          {headline}
        </h1>
      </Container>

      <Container width="narrow" className="space-y-12 pb-24">
        {narrative.challenge && (
          <section className="border-l-2 border-topaz pl-6">
            <h2 className="font-display text-xl font-semibold text-ink">The challenge</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">{narrative.challenge}</p>
          </section>
        )}
        {narrative.approach && (
          <section className="border-l-2 border-topaz pl-6">
            <h2 className="font-display text-xl font-semibold text-ink">The approach</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">{narrative.approach}</p>
          </section>
        )}
        {narrative.whatWeBuilt && (
          <section className="border-l-2 border-topaz pl-6">
            <h2 className="font-display text-xl font-semibold text-ink">What we built</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">{narrative.whatWeBuilt}</p>
          </section>
        )}
        {narrative.outcome && (
          <section className="border-l-2 border-topaz pl-6">
            <h2 className="font-display text-xl font-semibold text-ink">The outcome</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">{narrative.outcome}</p>
          </section>
        )}
        {focusAreas.length > 0 && (
          <section className="border-l-2 border-topaz pl-6">
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

- [ ] **Step 4: Run the existing tests**

Run: `npx vitest run app/work/page.test.tsx components/work/CaseStudy.test.tsx`
Expected: PASS, both unmodified

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: all tests pass

- [ ] **Step 6: Commit**

```bash
git add app/work/page.tsx components/work/CaseStudy.tsx
git commit -m "style: restyle Work page as a project-card grid and refresh CaseStudy"
```

---

### Task 13: Restyle the About page's values into cards

**Files:**
- Modify: `app/about/page.tsx`
- Test: `app/about/page.test.tsx` (existing — verify it still passes)

**Interfaces:**
- Consumes: `TagStrip` (Task 2).

- [ ] **Step 1: Confirm what the existing test requires**

`app/about/page.test.tsx` asserts the page `h1`, two specific `h2`s (`"What guides our work"`, `"Where we're going"`), and four `h3` values in order `["Stay curious", "Be clear", "Care about the work", "Build with purpose"]`. All preserved below.

- [ ] **Step 2: Replace the implementation**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { TagStrip } from "@/components/ui/TagStrip";

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
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-1/3 bg-topaz-deep [clip-path:polygon(40%_0,100%_0,100%_100%,0_100%)] sm:h-64 lg:h-80" />
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
      <TagStrip labels={VALUES.map((value) => value.name)} tone="topaz" />

      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-5xl">
            What guides our work
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {VALUES.map((value, index) => (
              <div key={value.name} className="border border-ink/15 bg-paper p-8">
                <span className="font-display text-sm font-semibold text-topaz-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{value.name}</h3>
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
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-paper/90">
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

- [ ] **Step 3: Run the existing test**

Run: `npx vitest run app/about/page.test.tsx`
Expected: PASS, unmodified

- [ ] **Step 4: Run the full test suite**

Run: `npm test`
Expected: all tests pass

- [ ] **Step 5: Commit**

```bash
git add app/about/page.tsx
git commit -m "style: restyle About page values as cards, add TagStrip"
```

---

### Task 14: New Pricing page, wired into Nav and Footer

**Files:**
- Create: `app/pricing/page.tsx`
- Create: `app/pricing/page.test.tsx`
- Modify: `components/layout/Nav.tsx`
- Modify: `components/layout/Nav.test.tsx`
- Modify: `components/layout/Footer.tsx`
- Modify: `components/layout/Footer.test.tsx`

**Interfaces:**
- Consumes: `pricingTiers` from `lib/data/pricing.ts` (Task 1).
- Produces: the `/pricing` route.

- [ ] **Step 1: Write the failing test for the new page**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PricingPage from "./page";

describe("PricingPage", () => {
  it("renders the page heading and all three placeholder tiers, in order, each with a Start a Project link", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "What working with us can look like." })
    ).toBeInTheDocument();

    const tierHeadings = screen.getAllByRole("heading", { level: 2 }).map((el) => el.textContent);
    expect(tierHeadings).toEqual([
      "Tier One (placeholder)",
      "Tier Two (placeholder)",
      "Tier Three (placeholder)",
    ]);

    expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
      "href",
      "/start-a-project"
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/pricing/page.test.tsx`
Expected: FAIL — no such route/module

- [ ] **Step 3: Write `app/pricing/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { pricingTiers } from "@/lib/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "What working with Kuvah can look like.",
};

export default function PricingPage() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container width="narrow">
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-6xl">
          What working with us can look like.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-muted">
          Every project is different, so pricing depends on scope. Here&apos;s a general sense of
          how engagements are structured.
        </p>
      </Container>

      <Container className="mt-16 grid gap-8 sm:grid-cols-3">
        {pricingTiers.map((tier) => (
          <div key={tier.name} className="flex h-full flex-col border border-ink/15 p-8">
            <h2 className="font-display text-2xl font-semibold text-ink">{tier.name}</h2>
            <p className="mt-2 font-display text-3xl font-bold text-topaz-deep">{tier.price}</p>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">{tier.description}</p>
            <ul className="mt-6 space-y-2 text-sm text-ink-muted">
              {tier.features.map((feature, index) => (
                <li key={index} className="border-t border-ink/10 pt-2 first:border-t-0 first:pt-0">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <Container className="mt-16 text-center">
        <LinkButton href="/start-a-project">Start a Project</LinkButton>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run app/pricing/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Add Pricing to the primary nav — write the test change first**

In `components/layout/Nav.test.tsx`, add to the first test's assertions:

```tsx
expect(screen.getAllByRole("link", { name: "Pricing" })[0]).toHaveAttribute("href", "/pricing");
```

(add this line after the existing `"Services"` assertion)

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run components/layout/Nav.test.tsx`
Expected: FAIL — no link named "Pricing"

- [ ] **Step 7: Update `components/layout/Nav.tsx`**

Change:

```tsx
const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];
```

to:

```tsx
const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run components/layout/Nav.test.tsx`
Expected: PASS

- [ ] **Step 9: Add Pricing to the footer — write the test change first**

In `components/layout/Footer.test.tsx`, change:

```tsx
for (const label of ["Work", "Services", "About", "Insights", "Start a Project"]) {
```

to:

```tsx
for (const label of ["Work", "Services", "Pricing", "About", "Insights", "Start a Project"]) {
```

- [ ] **Step 10: Run test to verify it fails**

Run: `npx vitest run components/layout/Footer.test.tsx`
Expected: FAIL — no link named "Pricing"

- [ ] **Step 11: Update `components/layout/Footer.tsx`**

Change:

```tsx
const FOOTER_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Start a Project", href: "/start-a-project" },
];
```

to:

```tsx
const FOOTER_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Start a Project", href: "/start-a-project" },
];
```

- [ ] **Step 12: Run test to verify it passes**

Run: `npx vitest run components/layout/Footer.test.tsx`
Expected: PASS

- [ ] **Step 13: Run the full suite**

Run: `npm test`
Expected: all tests pass

- [ ] **Step 14: Commit**

```bash
git add app/pricing/page.tsx app/pricing/page.test.tsx components/layout/Nav.tsx components/layout/Nav.test.tsx components/layout/Footer.tsx components/layout/Footer.test.tsx
git commit -m "feat: add Pricing page with placeholder tiers, wire into Nav and Footer"
```

---

### Task 15: Restyle the Start a Project page

**Files:**
- Modify: `app/start-a-project/page.tsx`
- Test: `app/start-a-project/page.test.tsx` (existing — verify it still passes)

**Interfaces:**
- Consumes: existing `StartProjectForm` (unchanged, not modified by this task).

- [ ] **Step 1: Confirm what the existing test requires**

`app/start-a-project/page.test.tsx` asserts the `h1` `"Tell us what's going on."` and a submit button named `"Send Enquiry"`. Neither the heading nor the form is touched — only a card border is added around the form column.

- [ ] **Step 2: Replace the implementation**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { StartProjectForm } from "@/components/contact/StartProjectForm";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Tell Kuvah what you're working on, where you're stuck, or what you're hoping to build.",
};

export default function StartAProjectPage() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container className="grid gap-16 lg:grid-cols-2">
        <div className="max-w-[560px]">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-6xl">
            Tell us what&apos;s going on.
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>Maybe you need a new website.</p>
            <p>Maybe you&apos;re sitting on an idea for a product.</p>
            <p>
              Maybe your business is growing and your current systems are starting to show their
              limits.
            </p>
            <p>
              Or maybe you simply know something needs to change but aren&apos;t sure what the
              answer is yet.
            </p>
            <p>That&apos;s okay.</p>
            <p className="font-medium text-ink">Tell us where you are. We&apos;ll take it from there.</p>
          </div>
        </div>

        <div className="border border-ink/15 p-8">
          <StartProjectForm />
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Run the existing test**

Run: `npx vitest run app/start-a-project/page.test.tsx`
Expected: PASS, unmodified

- [ ] **Step 4: Run the full test suite**

Run: `npm test`
Expected: all tests pass

- [ ] **Step 5: Commit**

```bash
git add app/start-a-project/page.tsx
git commit -m "style: add card border around the Start a Project form"
```

---

### Task 16: Restyle the Insights and 404 pages

**Files:**
- Modify: `app/insights/page.tsx`
- Modify: `app/not-found.tsx`
- Test: `app/insights/page.test.tsx` (existing — verify it still passes)
- Test: `app/not-found.test.tsx` (existing — verify it still passes)

**Interfaces:**
- Produces: `InsightsPage()` and `NotFound()` — same export/signature as before.

- [ ] **Step 1: Confirm what the existing tests require**

`app/insights/page.test.tsx` asserts an `h1` named `"Insights"`. `app/not-found.test.tsx` asserts a link named `"Back to homepage"` with `href="/"`. Both preserved below — copy is unchanged on both pages, only visual treatment changes.

- [ ] **Step 2: Replace `app/insights/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Insights",
  description: "Thinking from Kuvah on building useful technology. More to come soon.",
};

export default function InsightsPage() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container width="prose">
        <div className="border-l-4 border-topaz bg-paper p-8 sm:p-10">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-6xl">Insights</h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>
              This is where we&apos;ll share what we&apos;re learning about building useful
              technology, working with businesses and founders, and the questions worth asking
              before writing any code.
            </p>
            <p>We&apos;re still putting our first pieces together — check back soon.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Replace `app/not-found.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <Container width="tight" className="text-center">
        <p className="text-sm font-semibold text-topaz-deep">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-5xl">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          The page you&apos;re looking for may have moved or no longer exists.
        </p>
        <LinkButton href="/" className="mt-8">
          Back to homepage
        </LinkButton>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run the existing tests**

Run: `npx vitest run app/insights/page.test.tsx app/not-found.test.tsx`
Expected: PASS, both unmodified

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: all tests pass

- [ ] **Step 6: Commit**

```bash
git add app/insights/page.tsx app/not-found.tsx
git commit -m "style: bring Insights and 404 pages in line with the redesign"
```

---

### Task 17: Whole-site verification pass

**Files:** none created or modified unless a defect is found (in which case, fix it in the file it belongs to and note the fix in the commit message).

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: all tests pass

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: builds cleanly with no type errors

- [ ] **Step 3: Verify every new color combination numerically**

Run this script and confirm every combination introduced by this plan is at or above its required threshold (3:1 for large/bold text, 4.5:1 otherwise):

```bash
node -e "
function lum(hex) {
  const c = hex.match(/\w\w/g).map(x => parseInt(x,16)/255).map(v => v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4));
  return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2];
}
function ratio(a,b) {
  const L1 = lum(a), L2 = lum(b);
  const [hi, lo] = L1 > L2 ? [L1,L2] : [L2,L1];
  return (hi+0.05)/(lo+0.05);
}
console.log('topaz on topaz-deep (Stats numeral, large bold):', ratio('FFCB77','8A5A22').toFixed(2), '>= 3.0 required');
console.log('ink on topaz (TagStrip topaz tone):', ratio('1E1E2F','FFCB77').toFixed(2), '>= 4.5 required');
console.log('paper on ink (TagStrip ink tone):', ratio('FFFFFF','1E1E2F').toFixed(2), '>= 4.5 required');
console.log('ink on paper (Pricing/Work/Services cards):', ratio('1E1E2F','FFFFFF').toFixed(2), '>= 4.5 required');
console.log('topaz-deep on paper (Pricing tier price, CaseStudy eyebrow):', ratio('8A5A22','FFFFFF').toFixed(2), '>= 4.5 required');
"
```

- [ ] **Step 4: Manually verify focus-visible rings remain visible on every background this plan added a component to**

`app/globals.css` already overrides the focus-visible outline color to topaz on `.bg-ink`, `.bg-sky-deep`, and `.bg-topaz-deep` backgrounds. Confirm no new component in this plan introduces a background needing that override that isn't already covered (`TagStrip`'s `bg-topaz` tone and every card's `bg-paper`/`bg-mist` all use the default ink outline, which already has sufficient contrast against light backgrounds — no change needed).

- [ ] **Step 5: Check for any TODO/placeholder markers that leaked outside the three designated data files**

Run: `grep -rn "PLACEHOLDER" lib/data/ app/ components/ --include="*.ts" --include="*.tsx"`
Expected: matches only in `lib/data/testimonials.ts`, `lib/data/stats.ts`, `lib/data/pricing.ts`

- [ ] **Step 6: If any defect was found and fixed in Steps 1-5, commit it**

```bash
git add -A
git commit -m "fix: address issues found in whole-site verification pass"
```

If no defects were found, skip this step — there is nothing to commit.
