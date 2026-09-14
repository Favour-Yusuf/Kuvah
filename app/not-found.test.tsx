import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("NotFound", () => {
  it("renders a way back to the homepage", () => {
    render(<NotFound />);
    expect(screen.getByRole("link", { name: "Back to homepage" })).toHaveAttribute("href", "/");
  });
});
