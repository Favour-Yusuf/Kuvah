import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import React from "react";

// vitest.config.mts does not set test.globals, so @testing-library/react's
// automatic afterEach(cleanup) never registers on its own — without this,
// DOM nodes from earlier tests in the same file persist and can make a
// later `getByText`/`getByRole` match multiple elements whenever two tests
// render the same text.
afterEach(() => {
  cleanup();
  MockIntersectionObserver.instances = [];
});

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => React.createElement("img", props),
}));

export class MockIntersectionObserver implements IntersectionObserver {
  // Every instance constructed during a test run, in construction order —
  // lets a test reach the live instance a component created (e.g. `Reveal`)
  // to drive its callback via `trigger`.
  static instances: MockIntersectionObserver[] = [];

  readonly root: Element | Document | null = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  constructor(private callback: IntersectionObserverCallback) {
    MockIntersectionObserver.instances.push(this);
  }
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
