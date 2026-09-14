import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServicesIndex } from "./ServicesIndex";

describe("ServicesIndex", () => {
  it("renders all three services, numbered, in order, linking to their anchor on /services", () => {
    render(<ServicesIndex />);
    const headings = screen.getAllByRole("heading", { level: 3 }).map((el) => el.textContent);
    expect(headings).toEqual(["Digital Experiences", "Digital Products", "Systems & Automation"]);

    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Explore Digital Experiences" })).toHaveAttribute(
      "href",
      "/services#digital-experiences"
    );
  });
});
