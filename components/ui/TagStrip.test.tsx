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
