import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Nav } from "./Nav";

describe("Nav", () => {
  it("renders the Kuvah logo lockup and the four primary links and Start a Project CTA", () => {
    render(<Nav />);
    expect(screen.getByAltText("Kuvah")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Work" })[0]).toHaveAttribute("href", "/work");
    expect(screen.getAllByRole("link", { name: "Services" })[0]).toHaveAttribute("href", "/services");
    expect(screen.getAllByRole("link", { name: "About" })[0]).toHaveAttribute("href", "/about");
    expect(screen.getAllByRole("link", { name: "Insights" })[0]).toHaveAttribute("href", "/insights");
    expect(screen.getAllByRole("link", { name: "Start a Project" })[0]).toHaveAttribute(
      "href",
      "/start-a-project"
    );
  });

  it("mobile menu is closed by default and opens on toggle click", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation", { name: "Primary mobile" })).not.toBeInTheDocument();

    await user.click(toggle);

    expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "Primary mobile" })).toBeInTheDocument();
  });

  it("closes the mobile menu on Escape", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("navigation", { name: "Primary mobile" })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: "Primary mobile" })).not.toBeInTheDocument();
  });
});
