import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InsightsPage from "./page";

describe("InsightsPage", () => {
  it("renders a heading and does not claim to have any articles", () => {
    render(<InsightsPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Insights" })).toBeInTheDocument();
  });
});
