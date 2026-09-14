import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudy } from "./CaseStudy";
import { getProjectBySlug } from "@/lib/data/projects";

describe("CaseStudy", () => {
  it("renders every narrative section OnPoint has, in order", () => {
    render(<CaseStudy project={getProjectBySlug("onpoint-clothing")!} />);
    const headings = screen.getAllByRole("heading", { level: 2 }).map((el) => el.textContent);
    expect(headings).toEqual(["The challenge", "The approach", "What we built", "Focus areas"]);
  });

  it("omits sections a project doesn't have (Dillon Gas has no approach or outcome)", () => {
    render(<CaseStudy project={getProjectBySlug("dillon-gas")!} />);
    const headings = screen.getAllByRole("heading", { level: 2 }).map((el) => el.textContent);
    expect(headings).toEqual(["The challenge", "What we built", "Focus areas"]);
    expect(screen.queryByRole("heading", { name: "The approach" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "The outcome" })).not.toBeInTheDocument();
  });

  it("shows the client name and headline, and links back to /work", () => {
    render(<CaseStudy project={getProjectBySlug("whatsapp-automation-platform")!} />);
    expect(screen.getByText("WhatsApp Automation Platform")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Helping businesses manage conversations beyond one phone.",
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See all work" })).toHaveAttribute("href", "/work");
  });
});
