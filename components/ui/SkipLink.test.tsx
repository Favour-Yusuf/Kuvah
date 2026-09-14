import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkipLink } from "./SkipLink";

describe("SkipLink", () => {
  it("links to the main content landmark", () => {
    render(<SkipLink />);
    expect(screen.getByText("Skip to content")).toHaveAttribute("href", "#main-content");
  });
});
