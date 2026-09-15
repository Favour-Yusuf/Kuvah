import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Stats } from "./Stats";

vi.mock("@/lib/data/stats", () => ({
  stats: [
    { value: "XX", label: "Projects delivered (placeholder — replace with a real count)" },
    { value: "XX", label: "Years active (placeholder — replace with a real count)" },
  ],
}));

describe("Stats", () => {
  it("renders the section heading and every stat's value and label", () => {
    render(<Stats />);
    expect(
      screen.getByRole("heading", { level: 2, name: "A few numbers behind the work." })
    ).toBeInTheDocument();
    expect(screen.getAllByText("XX")).toHaveLength(2);
    expect(screen.getAllByText("Projects delivered (placeholder — replace with a real count)").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Years active (placeholder — replace with a real count)").length).toBeGreaterThan(0);
  });
});

describe("Stats with no data", () => {
  it("renders nothing when the stats array is empty", async () => {
    vi.doMock("@/lib/data/stats", () => ({ stats: [] }));
    vi.resetModules();
    const { Stats: EmptyStats } = await import("./Stats");
    const { container } = render(<EmptyStats />);
    expect(container).toBeEmptyDOMElement();
  });
});
