import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the wordmark, tagline and all footer nav links", () => {
    render(<Footer />);
    expect(screen.getByText("Kuvah Technologies")).toBeInTheDocument();
    expect(screen.getByText("Build with light.")).toBeInTheDocument();
    for (const label of ["Work", "Services", "About", "Insights", "Start a Project"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("renders social platforms as plain text while no real URL exists", () => {
    render(<Footer />);
    expect(screen.queryByRole("link", { name: "LinkedIn" })).not.toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
    expect(screen.getByText("YouTube")).toBeInTheDocument();
  });
});
