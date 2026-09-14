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
