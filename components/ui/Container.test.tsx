import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Container } from "./Container";

describe("Container", () => {
  it("defaults to the brand page grid", () => {
    const { container } = render(<Container>content</Container>);
    expect(container.firstChild).toHaveClass("page-container");
    expect(container.firstChild).not.toHaveClass("max-w-[760px]");
  });

  it("narrows when a width is specified", () => {
    const { container } = render(<Container width="narrow">content</Container>);
    expect(container.firstChild).toHaveClass("max-w-[760px]");
    expect(container.firstChild).not.toHaveClass("page-container");
  });
});
