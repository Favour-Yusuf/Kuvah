import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ClientLogos } from "./ClientLogos";
import { clientLogos } from "@/lib/data/clientLogos";

describe("ClientLogos", () => {
  it("renders the section heading", () => {
    render(<ClientLogos />);
    expect(
      screen.getByText("Some of the businesses we've worked with.")
    ).toBeInTheDocument();
  });

  it("renders every logo exactly once in the accessibility tree, even though it duplicates them visually for the scroll loop", () => {
    render(<ClientLogos />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(clientLogos.length);
    expect(images.map((img) => img.getAttribute("alt"))).toEqual(
      clientLogos.map((logo) => logo.alt)
    );
  });
});
