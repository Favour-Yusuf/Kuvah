import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, act } from "@testing-library/react";
import { Reveal } from "./Reveal";
import { MockIntersectionObserver } from "@/vitest.setup";

afterEach(() => {
  cleanup();
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

  it("becomes visible once the IntersectionObserver reports the node is intersecting", () => {
    render(<Reveal>Observed</Reveal>);
    const node = screen.getByText("Observed");
    expect(node).toHaveAttribute("data-visible", "false");

    const [observer] = MockIntersectionObserver.instances;
    act(() => {
      observer.trigger(true);
    });

    expect(node).toHaveAttribute("data-visible", "true");
  });

  it("renders as an <li> when as=\"li\" is passed", () => {
    render(
      <ul>
        <Reveal as="li">List item</Reveal>
      </ul>
    );
    const item = screen.getByText("List item");
    expect(item.tagName).toBe("LI");
  });
});
