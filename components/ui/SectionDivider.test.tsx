import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SectionDivider } from "./SectionDivider";

describe("SectionDivider", () => {
  it("is a decorative element hidden from assistive tech", () => {
    const { container } = render(<SectionDivider from="bg-paper" to="bg-ink" />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("applies the from/to background colors", () => {
    const { container } = render(<SectionDivider from="bg-paper" to="bg-sky" />);
    const outer = container.firstChild as HTMLElement;
    expect(outer.className).toContain("bg-paper");
    const wedge = outer.firstChild as HTMLElement;
    expect(wedge.className).toContain("bg-sky");
  });
});
