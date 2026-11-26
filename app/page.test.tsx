import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the hero headline and the six narrative sections in order", () => {
    render(<HomePage />);
    const text = screen
      .getAllByRole("heading", { level: 1 })
      .concat(screen.getAllByRole("heading", { level: 2 }))
      .map((h) => h.textContent);
    expect(text).toEqual([
      "Your business deserves better systems.",
      "Growing your business shouldn't make running it harder.",
      "We turn operational problems into working solutions.",
      "We don't start with technology. We start with your business.",
      "Built around the realities of service businesses.",
      "Not another tool. A better way to work.",
      "What's slowing your business down?",
    ]);
  });

  it("lists the four services and five approach steps", () => {
    render(<HomePage />);
    const h3s = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(h3s).toEqual([
      "Business Workflow Automation",
      "Business Management Systems",
      "Custom Software Development",
      "Business Intelligence and Reporting",
      "Understand",
      "Identify",
      "Design",
      "Implement",
      "Improve",
    ]);
  });

  it("links both calls to action to the enquiry form and the explore link to services", () => {
    render(<HomePage />);
    expect(screen.getByRole("link", { name: "Let's solve a business problem" })).toHaveAttribute(
      "href",
      "/start-a-project"
    );
    expect(screen.getByRole("link", { name: "Let's talk about your business" })).toHaveAttribute(
      "href",
      "/start-a-project"
    );
    expect(screen.getByRole("link", { name: /Explore what we do/ })).toHaveAttribute(
      "href",
      "#what-we-do"
    );
    expect(document.getElementById("what-we-do")).not.toBeNull();
  });
});
