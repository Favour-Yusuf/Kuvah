import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the hero headline and all eight narrative sections in order", () => {
    render(<HomePage />);
    const headings = screen.getAllByRole("heading", { level: 1 }).concat(
      screen.getAllByRole("heading", { level: 2 })
    );
    const text = headings.map((h) => h.textContent);
    expect(text).toEqual([
      "Technology is easy to build. Building the right thing is harder.",
      "Before we build, we listen.",
      "What can we help you build?",
      "We don't jump straight into development.",
      "A few things we've worked on.",
      "You don't need to fit into a box to work with us.",
      "We didn't start Kuvah because the world needed another technology company.",
      "Let's start with what you need.",
    ]);
  });
});
