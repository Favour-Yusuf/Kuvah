import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "./page";

describe("AboutPage", () => {
  it("renders the three major headings and all four values", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "We believe the work behind technology matters.",
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "What guides our work" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Where we're going" })).toBeInTheDocument();

    const values = screen.getAllByRole("heading", { level: 3 }).map((el) => el.textContent);
    expect(values).toEqual(["Stay curious", "Be clear", "Care about the work", "Build with purpose"]);
  });
});
