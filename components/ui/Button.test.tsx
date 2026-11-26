import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button, LinkButton } from "./Button";

describe("LinkButton", () => {
  it("renders an anchor pointing at href", () => {
    render(<LinkButton href="/work">See work</LinkButton>);
    const link = screen.getByRole("link", { name: "See work" });
    expect(link).toHaveAttribute("href", "/work");
  });

  it("applies the requested variant's classes", () => {
    render(
      <LinkButton href="/about" variant="secondary-inverse">
        About
      </LinkButton>
    );
    const link = screen.getByRole("link", { name: "About" });
    expect(link.className).toContain("text-paper");
  });

  it("applies the invert variant's classes", () => {
    render(
      <LinkButton href="/start-a-project" variant="invert">
        Start a Project
      </LinkButton>
    );
    const link = screen.getByRole("link", { name: "Start a Project" });
    expect(link.className).toContain("bg-paper");
    expect(link.className).toContain("text-oxblood");
  });

  it("defaults to the coral primary and never rounds corners", () => {
    render(<LinkButton href="/start-a-project">Talk to us</LinkButton>);
    const link = screen.getByRole("link", { name: "Talk to us" });
    expect(link.className).toContain("bg-coral");
    expect(link.className).toContain("min-h-12");
    expect(link.className).not.toContain("rounded");
  });
});

describe("Button", () => {
  it("renders a submit button by default type override", () => {
    render(<Button type="submit">Send Enquiry</Button>);
    const button = screen.getByRole("button", { name: "Send Enquiry" });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("defaults to type=button", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button", { name: "Click" })).toHaveAttribute("type", "button");
  });
});
