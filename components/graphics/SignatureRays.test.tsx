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
