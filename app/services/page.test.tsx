import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
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
