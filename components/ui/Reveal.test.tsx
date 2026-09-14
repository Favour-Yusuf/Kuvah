import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Reveal } from "./Reveal";

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
});
