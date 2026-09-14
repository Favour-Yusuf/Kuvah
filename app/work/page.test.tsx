import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WorkPage from "./page";

describe("WorkPage", () => {
  it("lists all three projects, in order, linking to their case study pages", () => {
    render(<WorkPage />);
    const headings = screen.getAllByRole("heading", { level: 2 }).map((el) => el.textContent);
    expect(headings).toEqual(["OnPoint Clothing", "Dillon Gas", "WhatsApp Automation Platform"]);

    expect(screen.getByRole("link", { name: "View Case Study" })).toHaveAttribute(
      "href",
      "/work/onpoint-clothing"
    );
  });
});
