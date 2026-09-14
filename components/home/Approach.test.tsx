import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Approach } from "./Approach";

describe("Approach", () => {
  it("renders the four steps in order", () => {
    render(<Approach />);
    const headings = screen.getAllByRole("heading", { level: 3 }).map((el) => el.textContent);
    expect(headings).toEqual(["Understand", "Clarify", "Build", "Improve"]);
  });

  it("includes the closing line", () => {
    render(<Approach />);
    expect(
      screen.getByText("Good work starts with understanding what needs to change.")
    ).toBeInTheDocument();
  });
});
