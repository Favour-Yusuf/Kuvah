import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Testimonials } from "./Testimonials";

vi.mock("@/lib/data/testimonials", () => ({
  testimonials: [
    { quote: "Great to work with.", name: "Client Name", role: "Role, Company Name" },
    { quote: "Delivered on time.", name: "Client Name", role: "Role, Company Name" },
  ],
}));

describe("Testimonials", () => {
  it("renders the section heading and every quote with its attribution", () => {
    render(<Testimonials />);
    expect(
      screen.getByRole("heading", { level: 2, name: "What clients have said." })
    ).toBeInTheDocument();
    expect(screen.getByText(/Great to work with\./)).toBeInTheDocument();
    expect(screen.getByText(/Delivered on time\./)).toBeInTheDocument();
    expect(screen.getAllByText("Client Name — Role, Company Name")).toHaveLength(2);
  });

  it("never renders a numeric star rating", () => {
    render(<Testimonials />);
    expect(screen.queryByText(/★|stars?|\d\.\d\s*\/\s*5/i)).not.toBeInTheDocument();
  });
});

describe("Testimonials with no data", () => {
  it("renders nothing when the testimonials array is empty", async () => {
    vi.doMock("@/lib/data/testimonials", () => ({ testimonials: [] }));
    vi.resetModules();
    const { Testimonials: EmptyTestimonials } = await import("./Testimonials");
    const { container } = render(<EmptyTestimonials />);
    expect(container).toBeEmptyDOMElement();
  });
});
