import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServicesIndex } from "./ServicesIndex";

describe("ServicesIndex", () => {
  it("renders all three services, numbered, in order, linking to their anchor on /services", () => {
    render(<ServicesIndex />);
    const headings = screen.getAllByRole("heading", { level: 3 }).map((el) => el.textContent);
    expect(headings).toEqual(["Digital Experiences", "Digital Products", "Systems & Automation"]);

    expect(screen.getAllByText("01").length).toBeGreaterThan(0);
    expect(screen.getAllByText("02").length).toBeGreaterThan(0);
    expect(screen.getAllByText("03").length).toBeGreaterThan(0);

    expect(screen.getByRole("link", { name: "Explore Digital Experiences" })).toHaveAttribute(
      "href",
      "/services#digital-experiences"
    );
  });
});
