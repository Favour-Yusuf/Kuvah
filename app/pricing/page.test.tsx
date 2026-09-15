import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PricingPage from "./page";

describe("PricingPage", () => {
  it("renders the page heading and all three placeholder tiers, in order, each with a Start a Project link", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "What working with us can look like." })
    ).toBeInTheDocument();

    const tierHeadings = screen.getAllByRole("heading", { level: 2 }).map((el) => el.textContent);
    expect(tierHeadings).toEqual([
      "Tier One (placeholder)",
      "Tier Two (placeholder)",
      "Tier Three (placeholder)",
    ]);

    expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
      "href",
      "/start-a-project"
    );
  });
});
