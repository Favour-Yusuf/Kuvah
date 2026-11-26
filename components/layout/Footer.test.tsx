import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the logo, tagline, description and footer links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Kuvah home" })).toHaveAttribute("href", "/");
    expect(screen.getByText("Better systems.")).toBeInTheDocument();
    expect(screen.getByText("Better businesses.")).toBeInTheDocument();
    expect(
      screen.getByText("We help service-based businesses solve operational problems through technology.")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/services");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Resources" })).toHaveAttribute("href", "/resources");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/start-a-project");
  });

  it("renders LinkedIn as plain text while no real URL exists", () => {
    render(<Footer />);
    expect(screen.queryByRole("link", { name: "LinkedIn" })).not.toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
  });
});
