# Kuvah Technologies Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full production Kuvah Technologies marketing website (home, services, work index + 3 case studies, about, start-a-project form, insights placeholder) as a Next.js App Router site matching the approved design spec.

**Architecture:** Next.js 16 App Router + TypeScript + Tailwind v4 (CSS-first `@theme` tokens). A typed data layer (`lib/data/*`) is the single source of truth for services and projects, consumed by both the homepage teasers and their full pages/case-study pages. Shared UI primitives (`components/ui/*`) and layout chrome (`components/layout/*`) are built first; page-specific sections live under `components/home/*`, `components/work/*`, `components/contact/*`. Logic-bearing units (data shape, form validation, nav interaction, scroll-reveal) get Vitest + React Testing Library unit tests; purely presentational sections are verified by building and by the manual/Playwright pass in the final task.

**Tech Stack:** Next.js 16.3.5 (App Router, React 19), TypeScript (strict), Tailwind CSS v4 (`@tailwindcss/postcss`), `next/font/google` (Bricolage Grotesque + Inter), Vitest + `@testing-library/react` + `@testing-library/jest-dom` + jsdom for tests. No animation library, no new UI framework, no backend/email service yet.

**Spec:** `docs/superpowers/specs/2026-09-14-kuvah-website-design.md`

**Copy source (verbatim, do not paraphrase):** `Kuvah Web Copy.md` (repo root)

## Global Constraints

- Brand colors (exact hex, from the spec): Dark Gunmetal `#1E1E2F` (`ink`), Topaz `#FFCB77` (`topaz`), Sky Blue `#5BC0EB` (`sky`), Whisper Gray `#F4F4F6` (`mist`). Derived: `paper` = `#FFFFFF`, `ink-muted` = `#6B6B7D`.
- `topaz` and `sky` are never used as text color on light backgrounds — fills, borders, underlines, or on dark backgrounds only.
- Fonts: **Bricolage Grotesque** for all headings/display text, **Inter** for body/UI text. No other font families.
- No `tailwind.config.js` — all tokens live in the `@theme` block of `app/globals.css` (Tailwind v4 CSS-first config).
- No rounded-card-with-shadow treatment applied uniformly; no ALL-CAPS decorative eyebrow labels; no middle-dot-joined meta strings; no `→` appended to buttons/links. Numbered markers (`01`/`02`/`03`, step numbers) are used only because the source copy already treats those as a genuine sequence.
- Do not invent testimonials, clients, awards, statistics, results, company history, team members, logos, or Insights articles. Do not fabricate a production domain — omit `metadataBase` and any absolute canonical/OG URL until a real domain exists.
- Do not fabricate social media URLs. `lib/data/social.ts` ships with `href: null` for every platform until real profile URLs are provided.
- The "Start a Project" form is front-end only: validated, shows the approved success copy in place, and calls one isolated `submitEnquiry()` function that does not hit a network yet.
- Every project record's narrative fields (`challenge`/`approach`/`whatWeBuilt`/`outcome`) are optional and rendered conditionally — never pad a project with content the source copy doesn't provide.
- Next.js 16 in this repo has typed routes enabled by default (see the pre-existing `app/layout.tsx`, which already types `RootLayout`'s props as `LayoutProps<"/">`). Only the dynamic `/work/[slug]` route needs an explicit params type; use the generated `PageProps<"/work/[slug]">` helper for it (`params` is a `Promise`, so `await params` before use). Static pages take no props.
- Every text-triggered interactive element needs a visible keyboard focus state and to be operable by keyboard alone (this matters most for the mobile nav toggle and the form).
- Commit after every task (not every step) using `git add` + `git commit`, following the repo's existing commit message conventions (imperative, one focused change, attribution footer already configured for this session).

---

## File Structure

```
lib/data/
  services.ts        # Service type + services[] (single source for homepage + /services)
  services.test.ts
  projects.ts         # Project type + projects[] + getProjectBySlug + narrativeParagraphs
  projects.test.ts
  social.ts           # SocialLink type + socialLinks[] (all href: null for now)

components/ui/
  Container.tsx       # max-width/gutter wrapper
  Button.tsx           # LinkButton + Button, shared variant styles
  Button.test.tsx
  SkipLink.tsx
  SkipLink.test.tsx
  Reveal.tsx           # IntersectionObserver scroll-reveal, reduced-motion aware
  Reveal.test.tsx

components/graphics/
  SignatureRays.tsx    # abstract ray-burst SVG (signature brand device)
  SignatureRays.test.tsx

components/layout/
  Nav.tsx              # desktop + accessible mobile nav
  Nav.test.tsx
  Footer.tsx
  Footer.test.tsx

components/home/
  Hero.tsx
  Introduction.tsx
  ServicesIndex.tsx
  ServicesIndex.test.tsx
  Approach.tsx
  Approach.test.tsx
  FeaturedWork.tsx
  FeaturedWork.test.tsx
  WhoWeWorkWith.tsx
  AboutTeaser.tsx
  FinalCTA.tsx

components/work/
  CaseStudy.tsx        # reusable case-study template
  CaseStudy.test.tsx

components/contact/
  StartProjectForm.tsx # validation + submitEnquiry() + success state
  StartProjectForm.test.tsx

app/
  globals.css          # modify: @theme tokens, base styles
  layout.tsx            # modify: fonts, Nav/Footer/SkipLink wiring, metadata
  page.tsx               # modify: homepage assembly
  page.test.tsx
  not-found.tsx
  not-found.test.tsx
  services/page.tsx
  services/page.test.tsx
  work/page.tsx
  work/page.test.tsx
  work/[slug]/page.tsx
  about/page.tsx
  about/page.test.tsx
  start-a-project/page.tsx
  start-a-project/page.test.tsx
  insights/page.tsx
  insights/page.test.tsx

vitest.config.ts
vitest.setup.ts
package.json           # modify: add test deps + scripts
```

---

### Task 1: Test tooling setup

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Test: `lib/data/sanity.test.ts` (throwaway smoke test, deleted at the end of this task once real tests exist elsewhere — actually keep nothing throwaway; see steps)

**Interfaces:**
- Produces: a working `npm test` command that every later task's tests run under; `vitest.setup.ts` provides global mocks (`next/image` → plain `<img>`, `IntersectionObserver`, `window.matchMedia`) that later component tests depend on.

- [ ] **Step 1: Install test dependencies**

Run:
```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Add test scripts to `package.json`**

Add to the `"scripts"` block:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 4: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import React from "react";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => React.createElement("img", props),
}));

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  constructor(private callback: IntersectionObserverCallback) {}
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = (): IntersectionObserverEntry[] => [];
  // Test helper, not part of the real interface.
  trigger(isIntersecting: boolean) {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this
    );
  }
}

// @ts-expect-error -- test double, not a full IntersectionObserver implementation
global.IntersectionObserver = MockIntersectionObserver;

if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }) as unknown as MediaQueryList;
}
```

- [ ] **Step 5: Write a smoke test to verify the setup works**

Create `lib/data/sanity.test.ts`:
```ts
import { describe, it, expect } from "vitest";

describe("test tooling", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Run the test suite**

Run: `npm test`
Expected: 1 test file, 1 test, PASS.

- [ ] **Step 7: Delete the throwaway sanity test**

Delete `lib/data/sanity.test.ts` — Task 4 adds the real `lib/data/*.test.ts` files.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts vitest.setup.ts
git commit -m "chore: add vitest + testing-library test tooling"
```

---

### Task 2: Design tokens, fonts, global styles

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx` (font loading only — Nav/Footer wiring happens in Task 9)

**Interfaces:**
- Produces: Tailwind utility classes `bg-ink`, `text-ink`, `bg-paper`, `bg-mist`, `bg-topaz`, `text-topaz`, `bg-sky`, `text-sky`, `text-ink-muted`, `font-display`, `font-sans` — every later task's JSX uses these.

- [ ] **Step 1: Replace `app/globals.css` with the token system**

```css
@import "tailwindcss";

@theme {
  --color-ink: #1e1e2f;
  --color-ink-muted: #6b6b7d;
  --color-paper: #ffffff;
  --color-mist: #f4f4f6;
  --color-topaz: #ffcb77;
  --color-sky: #5bc0eb;

  --font-display: var(--font-bricolage), ui-sans-serif, system-ui, sans-serif;
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}

@layer base {
  html {
    color-scheme: light;
  }

  body {
    @apply bg-paper text-ink font-sans;
  }

  ::selection {
    background-color: var(--color-topaz);
    color: var(--color-ink);
  }

  :focus-visible {
    outline: 2px solid var(--color-topaz);
    outline-offset: 2px;
  }
}

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

- [ ] **Step 2: Swap the font loaders in `app/layout.tsx`**

Replace the `Geist`/`Geist_Mono` import and usage with Bricolage Grotesque + Inter (keep everything else in the file as-is for now — Nav/Footer/metadata are handled in Task 9):

```tsx
import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify the build succeeds**

Run: `npm run build`
Expected: build completes with no errors (warnings about the still-default homepage content are fine — Task 13 replaces it).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: set up Kuvah color tokens and brand fonts"
```

---

### Task 3: Shared UI primitives — Container, Button, SkipLink

**Files:**
- Create: `components/ui/Container.tsx`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Button.test.tsx`
- Create: `components/ui/SkipLink.tsx`
- Create: `components/ui/SkipLink.test.tsx`

**Interfaces:**
- Produces: `Container({ children, className? })`; `LinkButton({ href, variant?, className?, children, ...anchorProps })` with `variant: "primary" | "secondary" | "secondary-inverse" | "ghost"`; `Button({ variant?, className?, children, type?, ...buttonProps })` (same variants); `SkipLink()`. Every later component/page task imports these.

- [ ] **Step 1: Create `Container`**

```tsx
import type { ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8 ${className ?? ""}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Write the failing test for `Button`/`LinkButton`**

Create `components/ui/Button.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button, LinkButton } from "./Button";

describe("LinkButton", () => {
  it("renders an anchor pointing at href", () => {
    render(<LinkButton href="/work">See work</LinkButton>);
    const link = screen.getByRole("link", { name: "See work" });
    expect(link).toHaveAttribute("href", "/work");
  });

  it("applies the requested variant's classes", () => {
    render(
      <LinkButton href="/about" variant="secondary-inverse">
        About
      </LinkButton>
    );
    const link = screen.getByRole("link", { name: "About" });
    expect(link.className).toContain("text-paper");
  });
});

describe("Button", () => {
  it("renders a submit button by default type override", () => {
    render(<Button type="submit">Send Enquiry</Button>);
    const button = screen.getByRole("button", { name: "Send Enquiry" });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("defaults to type=button", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button", { name: "Click" })).toHaveAttribute("type", "button");
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npx vitest run components/ui/Button.test.tsx`
Expected: FAIL — `./Button` has no exports yet.

- [ ] **Step 4: Implement `Button.tsx`**

```tsx
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "secondary-inverse" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-topaz hover:text-ink",
  secondary: "bg-transparent text-ink border border-ink/20 hover:border-ink",
  "secondary-inverse": "bg-transparent text-paper border border-paper/30 hover:border-paper",
  ghost: "bg-transparent text-ink underline underline-offset-4 decoration-topaz decoration-2 px-0 py-0",
};

function buttonClasses(variant: Variant, className?: string) {
  const base =
    variant === "ghost"
      ? "inline-flex items-center text-sm font-semibold transition"
      : "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition";
  return `${base} ${VARIANT_CLASSES[variant]} ${className ?? ""}`;
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  children: ReactNode;
};

export function LinkButton({
  href,
  variant = "primary",
  className,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClasses(variant, className)} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, className)} {...rest}>
      {children}
    </button>
  );
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run components/ui/Button.test.tsx`
Expected: PASS (4 tests).

- [ ] **Step 6: Write the failing test for `SkipLink`**

Create `components/ui/SkipLink.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkipLink } from "./SkipLink";

describe("SkipLink", () => {
  it("links to the main content landmark", () => {
    render(<SkipLink />);
    expect(screen.getByText("Skip to content")).toHaveAttribute("href", "#main-content");
  });
});
```

- [ ] **Step 7: Run test to verify it fails, then implement `SkipLink.tsx`**

Run: `npx vitest run components/ui/SkipLink.test.tsx` — expect FAIL (module missing).

```tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
    >
      Skip to content
    </a>
  );
}
```

- [ ] **Step 8: Run the test to verify it passes**

Run: `npx vitest run components/ui/SkipLink.test.tsx`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add components/ui/Container.tsx components/ui/Button.tsx components/ui/Button.test.tsx components/ui/SkipLink.tsx components/ui/SkipLink.test.tsx
git commit -m "feat: add Container, Button/LinkButton, SkipLink primitives"
```

---

### Task 4: Data layer — services, projects, social

**Files:**
- Create: `lib/data/services.ts`
- Create: `lib/data/services.test.ts`
- Create: `lib/data/projects.ts`
- Create: `lib/data/projects.test.ts`
- Create: `lib/data/social.ts`

**Interfaces:**
- Produces: `Service` type + `services: Service[]` (exact shape below); `Project` type + `projects: Project[]`, `getProjectBySlug(slug: string): Project | undefined`, `narrativeParagraphs(project: Project): string[]`; `SocialLink` type + `socialLinks: SocialLink[]`. Every homepage section, `/services`, `/work`, `/work/[slug]`, and `Footer` consume these.

- [ ] **Step 1: Write the failing test for `services.ts`**

Create `lib/data/services.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { services } from "./services";

describe("services", () => {
  it("has exactly the three approved service categories, in order", () => {
    expect(services.map((service) => service.slug)).toEqual([
      "digital-experiences",
      "digital-products",
      "systems-automation",
    ]);
  });

  it("numbers each service 01/02/03 to match the source copy", () => {
    expect(services.map((service) => service.number)).toEqual(["01", "02", "03"]);
  });

  it("gives every service both homepage and full-page content", () => {
    for (const service of services) {
      expect(service.homeIntro.length).toBeGreaterThan(0);
      expect(service.homeCapabilities.length).toBeGreaterThan(0);
      expect(service.pageIntro.length).toBeGreaterThan(0);
      expect(service.pageCapabilities.length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/data/services.test.ts`
Expected: FAIL — `./services` does not exist.

- [ ] **Step 3: Implement `lib/data/services.ts`**

```ts
export type ServiceCapability = {
  name: string;
  description?: string;
};

export type Service = {
  slug: "digital-experiences" | "digital-products" | "systems-automation";
  number: string;
  name: string;
  homeIntro: string[];
  homeCapabilities: string[];
  homeCtaLabel: string;
  pageHeadline: string;
  pageIntro: string[];
  pageCapabilities: ServiceCapability[];
  pageCtaLabel: string;
};

export const services: Service[] = [
  {
    slug: "digital-experiences",
    number: "01",
    name: "Digital Experiences",
    homeIntro: [
      "Your website is more than somewhere people visit.",
      "It's where people learn who you are, decide whether they trust you and choose what to do next.",
      "We create websites and digital experiences that help businesses communicate clearly and give customers a better way to engage with what they offer.",
    ],
    homeCapabilities: ["Business Websites", "Ecommerce", "Landing Pages", "Website Redesigns"],
    homeCtaLabel: "Explore Digital Experiences",
    pageHeadline: "Give people a better way to experience your business.",
    pageIntro: [
      "For many people, your website is their first real interaction with your business.",
      "We help you create an online experience that reflects your work, communicates what you offer and makes it easier for people to take the next step.",
    ],
    pageCapabilities: [
      { name: "Business Websites", description: "A clear, well-built home for your business online." },
      { name: "Ecommerce", description: "Online shopping experiences designed around your products and customers." },
      { name: "Landing Pages", description: "Focused pages for products, services, campaigns and specific actions." },
      {
        name: "Website Redesigns",
        description: "For businesses that have outgrown their current website or need a better experience.",
      },
    ],
    pageCtaLabel: "Start a Website Project",
  },
  {
    slug: "digital-products",
    number: "02",
    name: "Digital Products",
    homeIntro: [
      "Good products don't need to start big.",
      "Sometimes you need to test an idea. Sometimes you need to build the first version of something. Sometimes you already know what needs to exist and need the right people to build it.",
      "We help turn ideas and opportunities into digital products people can actually use.",
    ],
    homeCapabilities: ["SaaS MVPs", "Web Applications", "Internal Tools", "Product Development"],
    homeCtaLabel: "Explore Digital Products",
    pageHeadline: "Take an idea beyond the idea stage.",
    pageIntro: [
      "An idea can become a lot of things.",
      "The challenge is deciding what it should become first.",
      "We help founders and businesses think through the product, identify the important parts and build a version people can begin using.",
    ],
    pageCapabilities: [
      { name: "SaaS MVPs", description: "Build and test the first version of a software product." },
      { name: "Web Applications", description: "Custom applications built around a specific need or use case." },
      { name: "Internal Tools", description: "Tools that help teams manage work, information and processes." },
      {
        name: "Product Development",
        description: "Ongoing support for businesses building and improving digital products.",
      },
    ],
    pageCtaLabel: "Talk About Your Product",
  },
  {
    slug: "systems-automation",
    number: "03",
    name: "Systems & Automation",
    homeIntro: [
      "There comes a point when doing everything manually stops making sense.",
      "If your team is repeating the same tasks, moving information between different tools or spending too much time on processes that could work better, we can help.",
      "We design and build systems that make everyday work simpler.",
    ],
    homeCapabilities: [
      "Business Automation",
      "Customer Workflows",
      "Internal Systems",
      "Dashboards",
      "Custom Solutions",
    ],
    homeCtaLabel: "Explore Systems & Automation",
    pageHeadline: "Make the work behind your business work better.",
    pageIntro: [
      "Many businesses rely on people doing the same things over and over again.",
      "Following up with customers. Moving information between platforms. Updating records. Managing requests.",
      "Some of that work needs people.",
      "Some of it doesn't.",
      "We help businesses identify where better systems and automation can make a real difference.",
    ],
    pageCapabilities: [
      { name: "Business Workflows" },
      { name: "Customer Communication Systems" },
      { name: "Internal Dashboards" },
      { name: "Process Automation" },
      { name: "Custom Business Tools" },
    ],
    pageCtaLabel: "Explore What's Possible",
  },
];
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run lib/data/services.test.ts`
Expected: PASS.

- [ ] **Step 5: Write the failing test for `projects.ts`**

Create `lib/data/projects.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { projects, getProjectBySlug, narrativeParagraphs } from "./projects";

describe("projects", () => {
  it("has the three approved projects with unique slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(slugs).toEqual(["onpoint-clothing", "dillon-gas", "whatsapp-automation-platform"]);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("looks up a project by slug", () => {
    expect(getProjectBySlug("dillon-gas")?.client).toBe("Dillon Gas");
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });

  it("does not fabricate an outcome for any project — the source copy gives none", () => {
    for (const project of projects) {
      expect(project.narrative.outcome).toBeUndefined();
    }
  });

  it("keeps OnPoint's three-part narrative in reading order", () => {
    const onpoint = getProjectBySlug("onpoint-clothing")!;
    expect(narrativeParagraphs(onpoint)).toEqual([
      "OnPoint needed more than a catalogue of products online.",
      "The goal was to create a digital experience that could present the brand, its collections and its work in a way that felt considered while also giving customers a straightforward way to shop.",
      "Kuvah designed and developed an ecommerce platform around that experience.",
    ]);
  });

  it("omits the approach section for projects that don't have one", () => {
    const dillon = getProjectBySlug("dillon-gas")!;
    expect(dillon.narrative.approach).toBeUndefined();
    expect(narrativeParagraphs(dillon)).toHaveLength(2);
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run lib/data/projects.test.ts`
Expected: FAIL — `./projects` does not exist.

- [ ] **Step 7: Implement `lib/data/projects.ts`**

```ts
export type ProjectNarrative = {
  challenge?: string;
  approach?: string;
  whatWeBuilt?: string;
  outcome?: string;
};

export type Project = {
  slug: string;
  client: string;
  headline: string;
  featuredTags: string[];
  workTags: string[];
  workSummary: string;
  ctaLabel: "View Case Study" | "View Project";
  narrative: ProjectNarrative;
  focusAreas: string[];
};

export const projects: Project[] = [
  {
    slug: "onpoint-clothing",
    client: "OnPoint Clothing",
    headline: "Creating a digital shopping experience for a fashion house.",
    featuredTags: ["Ecommerce", "Web Development", "Digital Experience"],
    workTags: ["Fashion", "Ecommerce", "Web"],
    workSummary: "Creating a digital shopping experience for a fashion house.",
    ctaLabel: "View Case Study",
    narrative: {
      challenge: "OnPoint needed more than a catalogue of products online.",
      approach:
        "The goal was to create a digital experience that could present the brand, its collections and its work in a way that felt considered while also giving customers a straightforward way to shop.",
      whatWeBuilt: "Kuvah designed and developed an ecommerce platform around that experience.",
    },
    focusAreas: ["Ecommerce", "Web Development", "Digital Experience"],
  },
  {
    slug: "dillon-gas",
    client: "Dillon Gas",
    headline: "Bringing gas ordering closer to the customer.",
    featuredTags: ["Mobile Development", "Product Development"],
    workTags: ["Mobile", "Product"],
    workSummary: "Making it easier for customers to interact with gas services.",
    ctaLabel: "View Project",
    narrative: {
      challenge: "Dillon Gas needed a more convenient way for customers to interact with its services.",
      whatWeBuilt:
        "We worked on the digital product experience that would help make ordering and managing gas services easier.",
    },
    focusAreas: ["Mobile Development", "Product Development"],
  },
  {
    slug: "whatsapp-automation-platform",
    client: "WhatsApp Automation Platform",
    headline: "Helping businesses manage conversations beyond one phone.",
    featuredTags: ["Web Application", "Automation", "Backend Systems"],
    workTags: ["Software", "Automation"],
    workSummary: "Giving businesses a better way to manage customer communication.",
    ctaLabel: "View Project",
    narrative: {
      challenge: "As customer communication grows, managing everything manually becomes difficult.",
      whatWeBuilt:
        "We worked on a platform designed to give businesses a better way to manage and automate WhatsApp communication.",
    },
    focusAreas: ["Web Application", "Automation", "Backend Systems"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function narrativeParagraphs(project: Project): string[] {
  const { challenge, approach, whatWeBuilt, outcome } = project.narrative;
  return [challenge, approach, whatWeBuilt, outcome].filter(
    (value): value is string => Boolean(value)
  );
}
```

- [ ] **Step 8: Run the test to verify it passes**

Run: `npx vitest run lib/data/projects.test.ts`
Expected: PASS.

- [ ] **Step 9: Create `lib/data/social.ts` (no test — trivial static data, exercised by the `Footer` test in Task 8)**

```ts
export type SocialLink = {
  name: "LinkedIn" | "Instagram" | "X" | "YouTube";
  href: string | null;
};

// No real profile URLs exist yet. Fill in `href` once they do — the
// Footer already renders a plain (non-clickable) label whenever it's null.
export const socialLinks: SocialLink[] = [
  { name: "LinkedIn", href: null },
  { name: "Instagram", href: null },
  { name: "X", href: null },
  { name: "YouTube", href: null },
];
```

- [ ] **Step 10: Commit**

```bash
git add lib/data/services.ts lib/data/services.test.ts lib/data/projects.ts lib/data/projects.test.ts lib/data/social.ts
git commit -m "feat: add services, projects and social data layer"
```

---

### Task 5: Reveal component (scroll reveal, reduced-motion aware)

**Files:**
- Create: `components/ui/Reveal.tsx`
- Create: `components/ui/Reveal.test.tsx`

**Interfaces:**
- Consumes: the `MockIntersectionObserver` and `window.matchMedia` globals from `vitest.setup.ts` (Task 1).
- Produces: `Reveal({ children, className? })` — a client component every homepage section wraps its content in.

- [ ] **Step 1: Write the failing tests**

Create `components/ui/Reveal.test.tsx`:
```tsx
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Reveal", () => {
  it("renders its children", () => {
    render(<Reveal>Hello</Reveal>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("starts hidden (data-visible=false) when reduced motion is not requested", () => {
    render(<Reveal>Content</Reveal>);
    expect(screen.getByText("Content")).toHaveAttribute("data-visible", "false");
  });

  it("is visible immediately when the user prefers reduced motion", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as unknown as MediaQueryList);

    render(<Reveal>Content</Reveal>);
    expect(screen.getByText("Content")).toHaveAttribute("data-visible", "true");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/ui/Reveal.test.tsx`
Expected: FAIL — `./Reveal` does not exist.

- [ ] **Step 3: Implement `Reveal.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run components/ui/Reveal.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add components/ui/Reveal.tsx components/ui/Reveal.test.tsx
git commit -m "feat: add reduced-motion-aware Reveal scroll component"
```

---

### Task 6: SignatureRays graphic component

**Files:**
- Create: `components/graphics/SignatureRays.tsx`
- Create: `components/graphics/SignatureRays.test.tsx`

**Interfaces:**
- Produces: `SignatureRays({ className? })` — the brand's signature abstract ray-burst motif (an SVG, colored via `currentColor` so callers set color with a text-color utility class). Used once prominently in `Hero` (Task 10) and can be echoed faintly elsewhere.

- [ ] **Step 1: Write the failing test**

Create `components/graphics/SignatureRays.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SignatureRays } from "./SignatureRays";

describe("SignatureRays", () => {
  it("is a decorative, screen-reader-hidden graphic", () => {
    const { container } = render(<SignatureRays />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("renders 8 radiating rays", () => {
    const { container } = render(<SignatureRays />);
    expect(container.querySelectorAll("line")).toHaveLength(8);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/graphics/SignatureRays.test.tsx`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement `SignatureRays.tsx`**

```tsx
const RAY_COUNT = 8;
const INNER_RADIUS = 40;
const OUTER_RADIUS = 92;
const CENTER = 100;

export function SignatureRays({ className }: { className?: string }) {
  const rays = Array.from({ length: RAY_COUNT }, (_, index) => {
    const angle = (index / RAY_COUNT) * Math.PI * 2;
    return {
      x1: CENTER + Math.cos(angle) * INNER_RADIUS,
      y1: CENTER + Math.sin(angle) * INNER_RADIUS,
      x2: CENTER + Math.cos(angle) * OUTER_RADIUS,
      y2: CENTER + Math.sin(angle) * OUTER_RADIUS,
    };
  });

  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className}>
      {rays.map((ray, index) => (
        <line
          key={index}
          x1={ray.x1}
          y1={ray.y1}
          x2={ray.x2}
          y2={ray.y2}
          stroke="currentColor"
          strokeWidth={10}
          strokeLinecap="square"
        />
      ))}
    </svg>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run components/graphics/SignatureRays.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/graphics/SignatureRays.tsx components/graphics/SignatureRays.test.tsx
git commit -m "feat: add SignatureRays brand graphic"
```

---

### Task 7: Nav component (desktop + accessible mobile menu)

**Files:**
- Create: `components/layout/Nav.tsx`
- Create: `components/layout/Nav.test.tsx`

**Interfaces:**
- Consumes: `LinkButton` is not used here (nav CTA is a plain styled `Link` to match nav sizing); uses `next/image` (mocked in tests), `next/link`.
- Produces: `Nav()` — rendered once in `app/layout.tsx` (Task 9).

- [ ] **Step 1: Write the failing tests**

Create `components/layout/Nav.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Nav } from "./Nav";

describe("Nav", () => {
  it("renders the four primary links and the Start a Project CTA", () => {
    render(<Nav />);
    expect(screen.getAllByRole("link", { name: "Work" })[0]).toHaveAttribute("href", "/work");
    expect(screen.getAllByRole("link", { name: "Services" })[0]).toHaveAttribute("href", "/services");
    expect(screen.getAllByRole("link", { name: "About" })[0]).toHaveAttribute("href", "/about");
    expect(screen.getAllByRole("link", { name: "Insights" })[0]).toHaveAttribute("href", "/insights");
    expect(screen.getAllByRole("link", { name: "Start a Project" })[0]).toHaveAttribute(
      "href",
      "/start-a-project"
    );
  });

  it("mobile menu is closed by default and opens on toggle click", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation", { name: "Primary mobile" })).not.toBeInTheDocument();

    await user.click(toggle);

    expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "Primary mobile" })).toBeInTheDocument();
  });

  it("closes the mobile menu on Escape", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("navigation", { name: "Primary mobile" })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: "Primary mobile" })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/layout/Nav.test.tsx`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement `Nav.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Kuvah home">
          <Image src="/Kuvah Icon black.png" alt="" width={28} height={28} priority />
          <span className="font-display text-lg font-semibold text-ink">Kuvah</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink transition hover:text-ink/70"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/start-a-project"
          className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-topaz hover:text-ink md:inline-flex"
        >
          Start a Project
        </Link>

        <button
          type="button"
          className="inline-flex items-center rounded-full border border-ink/20 px-3 py-2 text-sm font-medium text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "Close menu" : "Open menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-ink/10 bg-paper px-4 py-6 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-base font-medium text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/start-a-project"
                className="mt-2 block rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-paper"
                onClick={() => setOpen(false)}
              >
                Start a Project
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run components/layout/Nav.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add components/layout/Nav.tsx components/layout/Nav.test.tsx
git commit -m "feat: add accessible Nav with mobile menu"
```

---

### Task 8: Footer component

**Files:**
- Create: `components/layout/Footer.tsx`
- Create: `components/layout/Footer.test.tsx`

**Interfaces:**
- Consumes: `Container` (Task 3), `socialLinks` (Task 4).
- Produces: `Footer()` — rendered once in `app/layout.tsx` (Task 9).

- [ ] **Step 1: Write the failing tests**

Create `components/layout/Footer.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the wordmark, tagline and all footer nav links", () => {
    render(<Footer />);
    expect(screen.getByText("Kuvah Technologies")).toBeInTheDocument();
    expect(screen.getByText("Build with light.")).toBeInTheDocument();
    for (const label of ["Work", "Services", "About", "Insights", "Start a Project"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("renders social platforms as plain text while no real URL exists", () => {
    render(<Footer />);
    expect(screen.queryByRole("link", { name: "LinkedIn" })).not.toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
    expect(screen.getByText("YouTube")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/layout/Footer.test.tsx`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement `Footer.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { socialLinks } from "@/lib/data/social";

const FOOTER_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Start a Project", href: "/start-a-project" },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-mist">
      <Container className="grid gap-12 py-16 sm:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2" aria-label="Kuvah home">
            <Image src="/Kuvah Icon black.png" alt="" width={28} height={28} />
            <span className="font-display text-lg font-semibold text-ink">Kuvah Technologies</span>
          </Link>
          <p className="mt-4 max-w-xs text-base text-ink-muted">
            Websites, digital products and systems for businesses and founders.
          </p>
          <p className="mt-8 text-sm font-medium text-ink-muted">Build with light.</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-ink hover:text-ink/70">
              {link.label}
            </Link>
          ))}
        </nav>

        <ul className="flex flex-col gap-3">
          {socialLinks.map((social) => (
            <li key={social.name}>
              {social.href ? (
                <a href={social.href} className="text-sm font-medium text-ink hover:text-ink/70">
                  {social.name}
                </a>
              ) : (
                <span className="text-sm font-medium text-ink-muted">{social.name}</span>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run components/layout/Footer.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add components/layout/Footer.tsx components/layout/Footer.test.tsx
git commit -m "feat: add Footer with nav links and social placeholders"
```

---

### Task 9: Root layout wiring

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `Nav` (Task 7), `Footer` (Task 8), `SkipLink` (Task 3).
- Produces: every page rendered inside `<main id="main-content">`, framed by `Nav`/`Footer`/`SkipLink`, with base site metadata.

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/ui/SkipLink";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// No production domain exists yet — do not add metadataBase or absolute
// canonical/OG URLs until one is chosen.
export const metadata: Metadata = {
  title: {
    default: "Kuvah Technologies",
    template: "%s — Kuvah Technologies",
  },
  description:
    "Kuvah helps Nigerian businesses and founders create digital experiences, products and systems built around what they actually need.",
  icons: {
    icon: "/Kuvah Icon black.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <SkipLink />
        <Nav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify the build succeeds**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: wire Nav, Footer and skip link into the root layout"
```

---

### Task 10: Homepage sections — Hero + Introduction

**Files:**
- Create: `components/home/Hero.tsx`
- Create: `components/home/Introduction.tsx`

**Interfaces:**
- Consumes: `Container`, `LinkButton`, `Reveal`, `SignatureRays`.
- Produces: `Hero()`, `Introduction()` — used by `app/page.tsx` (Task 13).

- [ ] **Step 1: Implement `Hero.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SignatureRays } from "@/components/graphics/SignatureRays";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pb-24 pt-16 sm:pb-32 sm:pt-24">
      <SignatureRays
        className="pointer-events-none absolute -right-16 -top-10 h-[360px] w-[360px] text-topaz/40 sm:h-[420px] sm:w-[420px]"
      />
      <Container className="relative">
        <Reveal>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Technology is easy to build. Building the right thing is harder.
          </h1>
        </Reveal>
        <Reveal className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-muted">
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
        <Reveal className="mt-10 flex flex-wrap gap-4">
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

- [ ] **Step 2: Implement `Introduction.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Introduction() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Before we build, we listen.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>Every project starts somewhere different.</p>
            <p>
              Sometimes a business knows exactly what it needs but doesn&apos;t have the right team
              to build it. Sometimes a founder has an idea but needs help deciding where to start.
              Sometimes a business is doing too much manually and knows there has to be a better
              way.
            </p>
            <p>That&apos;s where we come in.</p>
            <p>
              We take the time to understand what you&apos;re trying to achieve, where the problem
              is and what would actually make a difference before we start building.
            </p>
            <p>Because a good solution isn&apos;t just about what it can do.</p>
            <p className="font-medium text-ink">It&apos;s about whether it solves the right problem.</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Verify the build succeeds**

Run: `npm run build`
Expected: no errors (these components aren't wired into a page yet, but the build type-checks unused files that are imported nowhere only if referenced — this step just confirms no syntax/type errors via `tsc` as part of the build; if the build skips unreferenced files, instead run `npx tsc --noEmit`).

- [ ] **Step 4: Commit**

```bash
git add components/home/Hero.tsx components/home/Introduction.tsx
git commit -m "feat: add homepage Hero and Introduction sections"
```

---

### Task 11: Homepage sections — Services index + Approach

**Files:**
- Create: `components/home/ServicesIndex.tsx`
- Create: `components/home/ServicesIndex.test.tsx`
- Create: `components/home/Approach.tsx`
- Create: `components/home/Approach.test.tsx`

**Interfaces:**
- Consumes: `services` (Task 4), `Container`, `Reveal`.
- Produces: `ServicesIndex()`, `Approach()`.

- [ ] **Step 1: Write the failing test for `ServicesIndex`**

Create `components/home/ServicesIndex.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServicesIndex } from "./ServicesIndex";

describe("ServicesIndex", () => {
  it("renders all three services, numbered, in order, linking to their anchor on /services", () => {
    render(<ServicesIndex />);
    const headings = screen.getAllByRole("heading", { level: 3 }).map((el) => el.textContent);
    expect(headings).toEqual(["Digital Experiences", "Digital Products", "Systems & Automation"]);

    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Explore Digital Experiences" })).toHaveAttribute(
      "href",
      "/services#digital-experiences"
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails, then implement `ServicesIndex.tsx`**

Run: `npx vitest run components/home/ServicesIndex.test.tsx` — expect FAIL (module missing).

```tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/data/services";

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

        <div className="mt-16 divide-y divide-ink/10 border-t border-ink/10">
          {services.map((service) => (
            <Reveal key={service.slug} className="grid gap-6 py-12 sm:grid-cols-[100px_1fr] sm:gap-10">
              <span className="font-display text-2xl font-semibold text-ink-muted">{service.number}</span>
              <div>
                <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {service.name}
                </h3>
                <div className="mt-4 max-w-2xl space-y-3 text-base leading-relaxed text-ink-muted">
                  {service.homeIntro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <p className="mt-6 text-sm font-semibold text-ink-muted">What we do</p>
                <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-base text-ink">
                  {service.homeCapabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
                <Link
                  href={`/services#${service.slug}`}
                  className="mt-6 inline-block text-sm font-semibold text-ink underline decoration-topaz decoration-2 underline-offset-4"
                >
                  {service.homeCtaLabel}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Run the test to verify it passes**

Run: `npx vitest run components/home/ServicesIndex.test.tsx`
Expected: PASS.

- [ ] **Step 4: Write the failing test for `Approach`**

Create `components/home/Approach.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Approach } from "./Approach";

describe("Approach", () => {
  it("renders the four steps in order", () => {
    render(<Approach />);
    const headings = screen.getAllByRole("heading", { level: 3 }).map((el) => el.textContent);
    expect(headings).toEqual(["Understand", "Clarify", "Build", "Improve"]);
  });

  it("includes the closing line", () => {
    render(<Approach />);
    expect(
      screen.getByText("Good work starts with understanding what needs to change.")
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run test to verify it fails, then implement `Approach.tsx`**

Run: `npx vitest run components/home/Approach.test.tsx` — expect FAIL (module missing).

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

        <ol className="mt-16 grid gap-10 sm:grid-cols-4 sm:gap-6">
          {STEPS.map((step, index) => (
            <Reveal key={step.name}>
              <li className="border-t border-paper/20 pt-6">
                <span className="font-display text-sm font-semibold text-topaz">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold">{step.name}</h3>
                <p className="mt-2 text-base font-medium text-paper/90">{step.question}</p>
                <p className="mt-2 text-base leading-relaxed text-paper/70">{step.body}</p>
              </li>
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

- [ ] **Step 6: Run the test to verify it passes**

Run: `npx vitest run components/home/Approach.test.tsx`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add components/home/ServicesIndex.tsx components/home/ServicesIndex.test.tsx components/home/Approach.tsx components/home/Approach.test.tsx
git commit -m "feat: add homepage Services index and Approach sections"
```

---

### Task 12: Homepage sections — Featured Work, Who We Work With, About teaser, Final CTA

**Files:**
- Create: `components/home/FeaturedWork.tsx`
- Create: `components/home/FeaturedWork.test.tsx`
- Create: `components/home/WhoWeWorkWith.tsx`
- Create: `components/home/AboutTeaser.tsx`
- Create: `components/home/FinalCTA.tsx`

**Interfaces:**
- Consumes: `projects`, `narrativeParagraphs` (Task 4), `Container`, `LinkButton`, `Reveal`.
- Produces: `FeaturedWork()`, `WhoWeWorkWith()`, `AboutTeaser()`, `FinalCTA()`.

- [ ] **Step 1: Write the failing test for `FeaturedWork`**

Create `components/home/FeaturedWork.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturedWork } from "./FeaturedWork";

describe("FeaturedWork", () => {
  it("renders all three projects with links to their case study pages", () => {
    render(<FeaturedWork />);
    expect(screen.getByRole("link", { name: "View Case Study" })).toHaveAttribute(
      "href",
      "/work/onpoint-clothing"
    );
    const projectLinks = screen.getAllByRole("link", { name: "View Project" });
    expect(projectLinks.map((link) => link.getAttribute("href"))).toEqual([
      "/work/dillon-gas",
      "/work/whatsapp-automation-platform",
    ]);
  });

  it("links to the full work index", () => {
    render(<FeaturedWork />);
    expect(screen.getByRole("link", { name: "See All Work" })).toHaveAttribute("href", "/work");
  });
});
```

- [ ] **Step 2: Run test to verify it fails, then implement `FeaturedWork.tsx`**

Run: `npx vitest run components/home/FeaturedWork.test.tsx` — expect FAIL (module missing).

```tsx
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { projects, narrativeParagraphs } from "@/lib/data/projects";

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

        <div className="mt-16 divide-y divide-ink/10 border-t border-ink/10">
          {projects.map((project) => (
            <Reveal key={project.slug} className="grid gap-6 py-12 sm:grid-cols-2 sm:gap-12">
              <div>
                <p className="text-sm font-semibold text-ink-muted">{project.client}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {project.headline}
                </h3>
              </div>
              <div>
                <div className="space-y-3 text-base leading-relaxed text-ink-muted">
                  {narrativeParagraphs(project).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <ul className="mt-4 flex flex-wrap gap-2 text-sm text-ink-muted">
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
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <LinkButton href="/work" variant="secondary">
            See All Work
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Run the test to verify it passes**

Run: `npx vitest run components/home/FeaturedWork.test.tsx`
Expected: PASS.

- [ ] **Step 4: Implement `WhoWeWorkWith.tsx` (no dedicated test — static content, covered by the homepage smoke test in Task 13)**

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

        <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {AUDIENCES.map((audience) => (
            <Reveal key={audience.name} className="border-t border-ink/15 pt-6">
              <h3 className="font-display text-xl font-semibold text-ink">{audience.name}</h3>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-ink-muted">
                {audience.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Implement `AboutTeaser.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function AboutTeaser() {
  return (
    <section className="bg-ink py-20 text-paper sm:py-28">
      <Container className="max-w-[760px]">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            We didn&apos;t start Kuvah because the world needed another technology company.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-paper/70">
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

- [ ] **Step 6: Implement `FinalCTA.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section className="bg-mist py-24 sm:py-32">
      <Container className="max-w-[760px]">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Let&apos;s start with what you need.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>You don&apos;t need a perfect brief.</p>
            <p>You don&apos;t need to know exactly what technology to use.</p>
            <p>And you don&apos;t need to have every answer before reaching out.</p>
            <p>
              Tell us what you&apos;re working on, where you&apos;re stuck or what you&apos;re
              hoping to build.
            </p>
            <p className="font-medium text-ink">We&apos;ll start there.</p>
          </div>
          <LinkButton href="/start-a-project" className="mt-8">
            Start a Project
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 7: Commit**

```bash
git add components/home/FeaturedWork.tsx components/home/FeaturedWork.test.tsx components/home/WhoWeWorkWith.tsx components/home/AboutTeaser.tsx components/home/FinalCTA.tsx
git commit -m "feat: add Featured Work, Who We Work With, About teaser, Final CTA"
```

---

### Task 13: Assemble the homepage

**Files:**
- Modify: `app/page.tsx`
- Create: `app/page.test.tsx`

**Interfaces:**
- Consumes: all `components/home/*` from Tasks 10-12.
- Produces: the live `/` route.

- [ ] **Step 1: Write the failing test**

Create `app/page.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the hero headline and all eight narrative sections in order", () => {
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
      "A few things we've worked on.",
      "You don't need to fit into a box to work with us.",
      "We didn't start Kuvah because the world needed another technology company.",
      "Let's start with what you need.",
    ]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/page.test.tsx`
Expected: FAIL — `app/page.tsx` still renders the default Next.js starter content.

- [ ] **Step 3: Replace `app/page.tsx`**

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

export const metadata: Metadata = {
  title: "Kuvah Technologies — Websites, Digital Products & Systems",
  description:
    "Kuvah helps Nigerian businesses and founders create digital experiences, products and systems built around what they actually need.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <ServicesIndex />
      <Approach />
      <FeaturedWork />
      <WhoWeWorkWith />
      <AboutTeaser />
      <FinalCTA />
    </>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Run the full test suite and the build**

Run: `npm test && npm run build`
Expected: all tests PASS, build succeeds.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/page.test.tsx
git commit -m "feat: assemble the homepage from its section components"
```

---

### Task 14: Services page

**Files:**
- Create: `app/services/page.tsx`
- Create: `app/services/page.test.tsx`

**Interfaces:**
- Consumes: `services` (Task 4), `Container`, `LinkButton`.
- Produces: the live `/services` route, with in-page anchors `#digital-experiences`, `#digital-products`, `#systems-automation` (linked from the homepage `ServicesIndex`).

- [ ] **Step 1: Write the failing test**

Create `app/services/page.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen, container as _c } from "@testing-library/react";
import ServicesPage from "./page";

describe("ServicesPage", () => {
  it("renders each service section under its anchor id, in order, with its CTA", () => {
    const { container } = render(<ServicesPage />);
    const sectionIds = Array.from(container.querySelectorAll("section[id]")).map((el) => el.id);
    expect(sectionIds).toEqual(["digital-experiences", "digital-products", "systems-automation"]);

    expect(screen.getByRole("link", { name: "Start a Website Project" })).toHaveAttribute(
      "href",
      "/start-a-project"
    );
    expect(screen.getByRole("link", { name: "Talk About Your Product" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore What's Possible" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/services/page.test.tsx`
Expected: FAIL — `app/services/page.tsx` does not exist.

- [ ] **Step 3: Implement `app/services/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital experiences, digital products, and systems & automation — see where Kuvah can help move your business forward.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-paper py-20 sm:py-28">
        <Container className="max-w-[760px]">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
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

      {services.map((service, index) => (
        <section
          key={service.slug}
          id={service.slug}
          className={`py-20 sm:py-28 ${index % 2 === 1 ? "bg-mist" : "bg-paper"}`}
        >
          <Container>
            <p className="text-sm font-semibold text-ink-muted">{service.number}</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-ink sm:text-4xl">
              {service.pageHeadline}
            </h2>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-muted">
              {service.pageIntro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {service.pageCapabilities.map((capability) => (
                <div key={capability.name}>
                  <h3 className="font-display text-xl font-semibold text-ink">{capability.name}</h3>
                  {capability.description && (
                    <p className="mt-2 text-base leading-relaxed text-ink-muted">
                      {capability.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <LinkButton href="/start-a-project" className="mt-12">
              {service.pageCtaLabel}
            </LinkButton>
          </Container>
        </section>
      ))}
    </>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/services/page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/services/page.tsx app/services/page.test.tsx
git commit -m "feat: add the /services page"
```

---

### Task 15: Work index page

**Files:**
- Create: `app/work/page.tsx`
- Create: `app/work/page.test.tsx`

**Interfaces:**
- Consumes: `projects` (Task 4), `Container`, `LinkButton`.
- Produces: the live `/work` route.

- [ ] **Step 1: Write the failing test**

Create `app/work/page.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WorkPage from "./page";

describe("WorkPage", () => {
  it("lists all three projects, in order, linking to their case study pages", () => {
    render(<WorkPage />);
    const headings = screen.getAllByRole("heading", { level: 2 }).map((el) => el.textContent);
    expect(headings).toEqual(["OnPoint Clothing", "Dillon Gas", "WhatsApp Automation Platform"]);

    expect(screen.getByRole("link", { name: "View Case Study" })).toHaveAttribute(
      "href",
      "/work/onpoint-clothing"
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/work/page.test.tsx`
Expected: FAIL — `app/work/page.tsx` does not exist.

- [ ] **Step 3: Implement `app/work/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "A look at some of the work Kuvah has helped bring to life.",
};

export default function WorkPage() {
  return (
    <>
      <section className="bg-paper py-20 sm:py-28">
        <Container className="max-w-[760px]">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
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
        <Container>
          <div className="divide-y divide-ink/10 border-t border-ink/10">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="grid gap-4 py-12 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
              >
                <div>
                  <ul className="flex flex-wrap gap-2 text-sm text-ink-muted">
                    {project.workTags.map((tag) => (
                      <li key={tag} className="rounded-full border border-ink/15 px-3 py-1">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {project.client}
                  </h2>
                  <p className="mt-2 max-w-xl text-base leading-relaxed text-ink-muted">
                    {project.workSummary}
                  </p>
                </div>
                <LinkButton href={`/work/${project.slug}`} variant="secondary">
                  {project.ctaLabel}
                </LinkButton>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/work/page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/work/page.tsx app/work/page.test.tsx
git commit -m "feat: add the /work index page"
```

---

### Task 16: Case study template + `/work/[slug]` pages

**Files:**
- Create: `components/work/CaseStudy.tsx`
- Create: `components/work/CaseStudy.test.tsx`
- Create: `app/work/[slug]/page.tsx`

**Interfaces:**
- Consumes: `Project`, `getProjectBySlug`, `projects` (Task 4), `Container`, `LinkButton`.
- Produces: `CaseStudy({ project })`; the live `/work/onpoint-clothing`, `/work/dillon-gas`, `/work/whatsapp-automation-platform` routes.
- Note: the dynamic page itself (`app/work/[slug]/page.tsx`) is an `async` Server Component (Next 16's typed `params` are a `Promise` — see Global Constraints) and is **not** unit-tested directly; its behavior is fully covered by testing `CaseStudy` with real `Project` records plus the `getProjectBySlug` tests already in Task 4. It is exercised end-to-end in Task 22's manual/Playwright pass.

- [ ] **Step 1: Write the failing test for `CaseStudy`**

Create `components/work/CaseStudy.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudy } from "./CaseStudy";
import { getProjectBySlug } from "@/lib/data/projects";

describe("CaseStudy", () => {
  it("renders every narrative section OnPoint has, in order", () => {
    render(<CaseStudy project={getProjectBySlug("onpoint-clothing")!} />);
    const headings = screen.getAllByRole("heading", { level: 2 }).map((el) => el.textContent);
    expect(headings).toEqual(["The challenge", "The approach", "What we built", "Focus areas"]);
  });

  it("omits sections a project doesn't have (Dillon Gas has no approach or outcome)", () => {
    render(<CaseStudy project={getProjectBySlug("dillon-gas")!} />);
    const headings = screen.getAllByRole("heading", { level: 2 }).map((el) => el.textContent);
    expect(headings).toEqual(["The challenge", "What we built", "Focus areas"]);
    expect(screen.queryByRole("heading", { name: "The approach" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "The outcome" })).not.toBeInTheDocument();
  });

  it("shows the client name and headline, and links back to /work", () => {
    render(<CaseStudy project={getProjectBySlug("whatsapp-automation-platform")!} />);
    expect(screen.getByText("WhatsApp Automation Platform")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Helping businesses manage conversations beyond one phone.",
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See all work" })).toHaveAttribute("href", "/work");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/work/CaseStudy.test.tsx`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement `CaseStudy.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import type { Project } from "@/lib/data/projects";

export function CaseStudy({ project }: { project: Project }) {
  const { client, headline, narrative, focusAreas } = project;

  return (
    <article>
      <Container className="py-16 sm:py-24">
        <p className="text-sm font-semibold text-ink-muted">{client}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold text-ink sm:text-5xl">
          {headline}
        </h1>
      </Container>

      <Container className="max-w-[760px] space-y-12 pb-24">
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

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run components/work/CaseStudy.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Implement `app/work/[slug]/page.tsx` (no direct unit test — see note above)**

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudy } from "@/components/work/CaseStudy";
import { getProjectBySlug, projects } from "@/lib/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.client,
    description: project.headline,
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
```

- [ ] **Step 6: Verify the build succeeds and statically generates all three case studies**

Run: `npm run build`
Expected: build succeeds and lists `/work/onpoint-clothing`, `/work/dillon-gas`, `/work/whatsapp-automation-platform` as generated static routes.

- [ ] **Step 7: Commit**

```bash
git add components/work/CaseStudy.tsx components/work/CaseStudy.test.tsx app/work/[slug]/page.tsx
git commit -m "feat: add reusable case study template and /work/[slug] pages"
```

---

### Task 17: About page

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/about/page.test.tsx`

**Interfaces:**
- Consumes: `Container`.
- Produces: the live `/about` route.

- [ ] **Step 1: Write the failing test**

Create `app/about/page.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "./page";

describe("AboutPage", () => {
  it("renders the three major headings and all four values", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "We believe the work behind technology matters.",
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "What guides our work" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Where we're going" })).toBeInTheDocument();

    const values = screen.getAllByRole("heading", { level: 3 }).map((el) => el.textContent);
    expect(values).toEqual(["Stay curious", "Be clear", "Care about the work", "Build with purpose"]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/about/page.test.tsx`
Expected: FAIL — `app/about/page.tsx` does not exist.

- [ ] **Step 3: Implement `app/about/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

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
      <section className="bg-paper py-20 sm:py-28">
        <Container className="max-w-[760px]">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
            We believe the work behind technology matters.
          </h1>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>Kuvah Technologies was built around a simple belief:</p>
            <p className="font-medium text-ink">Technology should serve a purpose.</p>
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

      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            What guides our work
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {VALUES.map((value) => (
              <div key={value.name}>
                <h3 className="font-display text-xl font-semibold text-ink">{value.name}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-muted">{value.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20 text-paper sm:py-28">
        <Container className="max-w-[760px]">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Where we&apos;re going</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-paper/70">
            <p>
              We&apos;re building Kuvah into a technology company that creates useful products,
              supports ambitious businesses and continues to explore better ways of solving
              problems.
            </p>
            <p>We&apos;re still growing.</p>
            <p>Still learning.</p>
            <p>Still figuring things out.</p>
            <p>But we&apos;re serious about the work.</p>
            <p className="font-medium text-paper">And we&apos;re just getting started.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/about/page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/about/page.tsx app/about/page.test.tsx
git commit -m "feat: add the /about page"
```

---

### Task 18: Start a Project form component

**Files:**
- Create: `components/contact/StartProjectForm.tsx`
- Create: `components/contact/StartProjectForm.test.tsx`

**Interfaces:**
- Produces: `StartProjectForm()`, `validateEnquiry(values: EnquiryFormValues): FormErrors`, `submitEnquiry(values: EnquiryFormValues): Promise<void>`, `EnquiryFormValues` type. Used by `app/start-a-project/page.tsx` (Task 19).

- [ ] **Step 1: Write the failing tests**

Create `components/contact/StartProjectForm.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StartProjectForm, validateEnquiry } from "./StartProjectForm";

describe("validateEnquiry", () => {
  const valid = {
    name: "Ada",
    email: "ada@example.com",
    company: "",
    interest: "Website",
    message: "We need a new site.",
    timeline: "Within a month",
    budget: "",
  };

  it("passes with only the required fields filled in", () => {
    expect(validateEnquiry(valid)).toEqual({});
  });

  it("flags every required field when empty", () => {
    const errors = validateEnquiry({ ...valid, name: "", email: "", interest: "", message: "", timeline: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "interest", "message", "name", "timeline"]);
  });

  it("flags a malformed email", () => {
    const errors = validateEnquiry({ ...valid, email: "not-an-email" });
    expect(errors.email).toBeDefined();
  });
});

describe("StartProjectForm", () => {
  it("shows validation errors instead of the success state when submitted empty", async () => {
    const user = userEvent.setup();
    render(<StartProjectForm />);
    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));
    expect(screen.getByText("Tell us your name.")).toBeInTheDocument();
    expect(screen.queryByText("We've got it.")).not.toBeInTheDocument();
  });

  it("shows the success state after a valid submission", async () => {
    const user = userEvent.setup();
    render(<StartProjectForm />);

    await user.type(screen.getByLabelText("Your name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email address"), "ada@example.com");
    await user.selectOptions(screen.getByLabelText("What are you interested in?"), "Website");
    await user.type(
      screen.getByLabelText("What are you trying to achieve?"),
      "We need a new site."
    );
    await user.selectOptions(screen.getByLabelText("What is your timeline?"), "Within a month");

    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));

    expect(await screen.findByText("We've got it.")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/contact/StartProjectForm.test.tsx`
Expected: FAIL — module does not exist.

- [ ] **Step 3: Implement `StartProjectForm.tsx`**

```tsx
"use client";

import { useState, type FormEvent, type ReactNode } from "react";

export type EnquiryFormValues = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  timeline: string;
  budget: string;
};

const INTEREST_OPTIONS = [
  "Website",
  "Ecommerce",
  "Digital Product",
  "SaaS MVP",
  "Automation",
  "Internal System",
  "I'm not sure yet",
];

const TIMELINE_OPTIONS = ["As soon as possible", "Within a month", "1–3 months", "Just exploring"];

const EMPTY_VALUES: EnquiryFormValues = {
  name: "",
  email: "",
  company: "",
  interest: "",
  message: "",
  timeline: "",
  budget: "",
};

type FormErrors = Partial<Record<keyof EnquiryFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEnquiry(values: EnquiryFormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Tell us your name.";
  if (!values.email.trim()) {
    errors.email = "Tell us your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "That email address doesn't look right.";
  }
  if (!values.interest) errors.interest = "Let us know what you're interested in.";
  if (!values.message.trim()) errors.message = "Tell us a little about what you're trying to achieve.";
  if (!values.timeline) errors.timeline = "Let us know your timeline.";
  return errors;
}

export async function submitEnquiry(values: EnquiryFormValues): Promise<void> {
  // No delivery backend is wired up yet. Replace this with a real request
  // (an API route, or a form-delivery provider) once one is chosen.
  await Promise.resolve(values);
}

export function StartProjectForm() {
  const [values, setValues] = useState<EnquiryFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle");

  function updateField<K extends keyof EnquiryFormValues>(field: K, value: EnquiryFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    await submitEnquiry(values);
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <div role="status" className="max-w-xl">
        <h2 className="font-display text-3xl font-semibold text-ink">We&apos;ve got it.</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          Thanks for reaching out to Kuvah. We&apos;ll take a look at what you&apos;ve shared and
          get back to you with the next step.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          In the meantime, you can explore some of the things we&apos;ve been working on.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="grid max-w-xl gap-6">
      <Field label="Your name" error={errors.name}>
        <input
          type="text"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="w-full rounded-md border border-ink/20 bg-paper px-4 py-3 text-ink"
        />
      </Field>

      <Field label="Email address" error={errors.email}>
        <input
          type="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="w-full rounded-md border border-ink/20 bg-paper px-4 py-3 text-ink"
        />
      </Field>

      <Field label="Business or company name" error={errors.company}>
        <input
          type="text"
          value={values.company}
          onChange={(event) => updateField("company", event.target.value)}
          className="w-full rounded-md border border-ink/20 bg-paper px-4 py-3 text-ink"
        />
      </Field>

      <Field label="What are you interested in?" error={errors.interest}>
        <select
          value={values.interest}
          onChange={(event) => updateField("interest", event.target.value)}
          className="w-full rounded-md border border-ink/20 bg-paper px-4 py-3 text-ink"
        >
          <option value="" disabled>
            Select an option
          </option>
          {INTEREST_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="What are you trying to achieve?"
        error={errors.message}
        hint="Tell us a little about your business, idea or current challenge."
      >
        <textarea
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          rows={5}
          className="w-full rounded-md border border-ink/20 bg-paper px-4 py-3 text-ink"
        />
      </Field>

      <Field label="What is your timeline?" error={errors.timeline}>
        <select
          value={values.timeline}
          onChange={(event) => updateField("timeline", event.target.value)}
          className="w-full rounded-md border border-ink/20 bg-paper px-4 py-3 text-ink"
        >
          <option value="" disabled>
            Select an option
          </option>
          {TIMELINE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field label="What is your approximate budget?" error={errors.budget}>
        <input
          type="text"
          value={values.budget}
          onChange={(event) => updateField("budget", event.target.value)}
          className="w-full rounded-md border border-ink/20 bg-paper px-4 py-3 text-ink"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-topaz hover:text-ink disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-ink">
      {label}
      {hint && <span className="text-sm font-normal text-ink-muted">{hint}</span>}
      {children}
      {error && <span className="text-sm font-normal text-red-600">{error}</span>}
    </label>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run components/contact/StartProjectForm.test.tsx`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add components/contact/StartProjectForm.tsx components/contact/StartProjectForm.test.tsx
git commit -m "feat: add Start a Project form with validation and success state"
```

---

### Task 19: Start a Project page

**Files:**
- Create: `app/start-a-project/page.tsx`
- Create: `app/start-a-project/page.test.tsx`

**Interfaces:**
- Consumes: `StartProjectForm` (Task 18), `Container`.
- Produces: the live `/start-a-project` route.

- [ ] **Step 1: Write the failing test**

Create `app/start-a-project/page.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StartAProjectPage from "./page";

describe("StartAProjectPage", () => {
  it("renders the page heading and the form's submit button", () => {
    render(<StartAProjectPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Tell us what's going on." })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send Enquiry" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/start-a-project/page.test.tsx`
Expected: FAIL — `app/start-a-project/page.tsx` does not exist.

- [ ] **Step 3: Implement `app/start-a-project/page.tsx`**

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
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
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

        <StartProjectForm />
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/start-a-project/page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/start-a-project/page.tsx app/start-a-project/page.test.tsx
git commit -m "feat: add the /start-a-project page"
```

---

### Task 20: Insights placeholder page

**Files:**
- Create: `app/insights/page.tsx`
- Create: `app/insights/page.test.tsx`

**Interfaces:**
- Consumes: `Container`.
- Produces: the live `/insights` route (no articles yet, by design).

- [ ] **Step 1: Write the failing test**

Create `app/insights/page.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InsightsPage from "./page";

describe("InsightsPage", () => {
  it("renders a heading and does not claim to have any articles", () => {
    render(<InsightsPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Insights" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/insights/page.test.tsx`
Expected: FAIL — `app/insights/page.tsx` does not exist.

- [ ] **Step 3: Implement `app/insights/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Insights",
  description: "Thinking from Kuvah on building useful technology. More to come soon.",
};

export default function InsightsPage() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container className="max-w-[700px]">
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">Insights</h1>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
          <p>
            This is where we&apos;ll share what we&apos;re learning about building useful
            technology, working with businesses and founders, and the questions worth asking
            before writing any code.
          </p>
          <p>We&apos;re still putting our first pieces together — check back soon.</p>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/insights/page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/insights/page.tsx app/insights/page.test.tsx
git commit -m "feat: add the /insights placeholder page"
```

---

### Task 21: Not-found page

**Files:**
- Create: `app/not-found.tsx`
- Create: `app/not-found.test.tsx`

**Interfaces:**
- Consumes: `Container`, `LinkButton`.
- Produces: Next.js's built-in 404 rendering for any unmatched route.

- [ ] **Step 1: Write the failing test**

Create `app/not-found.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("NotFound", () => {
  it("renders a way back to the homepage", () => {
    render(<NotFound />);
    expect(screen.getByRole("link", { name: "Back to homepage" })).toHaveAttribute("href", "/");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run app/not-found.test.tsx`
Expected: FAIL — `app/not-found.tsx` does not exist.

- [ ] **Step 3: Implement `app/not-found.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <Container className="max-w-[560px] text-center">
        <p className="text-sm font-semibold text-ink-muted">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
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

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/not-found.test.tsx`
Expected: PASS.

- [ ] **Step 5: Run the whole suite and build once more**

Run: `npm test && npm run build`
Expected: every test file passes; build succeeds and lists all routes (`/`, `/services`, `/work`, `/work/[slug]` ×3, `/about`, `/start-a-project`, `/insights`, 404).

- [ ] **Step 6: Commit**

```bash
git add app/not-found.tsx app/not-found.test.tsx
git commit -m "feat: add a branded 404 page"
```

---

### Task 22: Manual responsive & accessibility QA pass

**Files:** none created — this task verifies, it doesn't write new source files. If it finds a defect, fix it in the relevant file from an earlier task and re-run this task's checks.

**Interfaces:** none new.

- [ ] **Step 1: Start the dev server**

Run (background): `npm run dev`
Expected: server starts on `http://localhost:3000`.

- [ ] **Step 2: Walk every route at mobile width (390×844)**

Using the Playwright MCP tools (`browser_navigate`, `browser_resize` to 390×844, `browser_snapshot`, `browser_take_screenshot`), visit `/`, `/services`, `/work`, `/work/onpoint-clothing`, `/work/dillon-gas`, `/work/whatsapp-automation-platform`, `/about`, `/start-a-project`, `/insights`, and a nonexistent path (e.g. `/nope`) to see the 404. For each: confirm no horizontal scroll, the mobile nav toggle opens/closes and its links work, text doesn't overflow its container, and all copy from `Kuvah Web Copy.md` for that page is present. Fix and re-check anything that fails before moving on.

- [ ] **Step 3: Walk every route at desktop width (1440×900)**

Repeat Step 2's navigation at 1440×900. Confirm the desktop nav (not the mobile toggle) renders, section layouts use the intended two/three-column arrangements, and the hero's `SignatureRays` graphic is visible without clipping awkwardly.

- [ ] **Step 4: Exercise the Start a Project form in the browser**

Navigate to `/start-a-project`, submit empty (confirm inline errors appear), then fill every required field and submit again (confirm the "We've got it." success view replaces the form in place, matching the approved copy).

- [ ] **Step 5: Keyboard-only pass**

On the homepage, press Tab repeatedly from the top of the page: confirm the skip link appears first and jumps focus to `#main-content` when activated, then confirm every nav link, the mobile menu toggle (at mobile width), every CTA, and the form's fields are reachable and show a visible focus ring (the topaz `:focus-visible` outline from Task 2).

- [ ] **Step 6: Run the full automated suite one final time**

Run: `npm test && npm run build`
Expected: all tests pass, build succeeds with no warnings introduced by this task's fixes.

- [ ] **Step 7: Commit any fixes made during this pass**

If Steps 2-5 required changes, stage exactly those files and commit:
```bash
git add <changed files>
git commit -m "fix: address responsive/accessibility issues found in QA pass"
```
If no changes were needed, skip this step — there is nothing to commit.

---

## Deferred follow-ups (not part of this plan)

- Wiring `submitEnquiry()` to a real email/CRM delivery once a provider is chosen.
- Adding real project screenshots to the case studies once they exist.
- Filling in real social media URLs in `lib/data/social.ts`.
- Adding `app/sitemap.ts` / `app/robots.ts` once a production domain is known (they need an absolute base URL, which doesn't exist yet — do not fabricate one).
- Publishing real Insights articles once content exists.
