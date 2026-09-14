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
