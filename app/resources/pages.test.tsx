import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const cookieValue = vi.fn<() => string | undefined>();
vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: () => {
      const value = cookieValue();
      return value === undefined ? undefined : { value };
    },
  }),
}));
vi.mock("./onboarding-cost-calculator/actions", () => ({
  requestOnboardingCalculator: vi.fn(),
}));

const { default: ResourcesPage } = await import("./page");
const { default: CalculatorPage } = await import("./onboarding-cost-calculator/page");
const { default: ThanksPage } = await import("./onboarding-cost-calculator/thanks/page");

describe("Resources index", () => {
  it("links to the calculator landing page", () => {
    render(<ResourcesPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Free resources" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Onboarding Cost Calculator/ })).toHaveAttribute(
      "href",
      "/resources/onboarding-cost-calculator"
    );
  });
});

describe("Onboarding calculator landing page", () => {
  it("shows the headline, proof line, form fields and button", () => {
    render(<CalculatorPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Find out what slow onboarding costs you in 1 minute" })
    ).toBeInTheDocument();
    expect(screen.getByText("$1,600 in staff time")).toBeInTheDocument();
    expect(screen.getByLabelText("First name")).toHaveAttribute("autocomplete", "given-name");
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByRole("button", { name: "Send me the spreadsheet" })).toBeInTheDocument();
    expect(screen.getByText(/a checklist will do/)).toBeInTheDocument();
  });
});

describe("Onboarding calculator thank-you page", () => {
  it("greets the person by name and shows their email", async () => {
    cookieValue.mockReturnValue(JSON.stringify({ firstName: "Ada", email: "ada@example.com" }));
    render(await ThanksPage());
    expect(screen.getByRole("heading", { level: 1, name: "Check your inbox, Ada" })).toBeInTheDocument();
    expect(screen.getByText("ada@example.com")).toBeInTheDocument();
  });

  it("falls back gracefully without the cookie", async () => {
    cookieValue.mockReturnValue(undefined);
    render(await ThanksPage());
    expect(screen.getByRole("heading", { level: 1, name: "Check your inbox" })).toBeInTheDocument();
    expect(screen.getByText(/on its way to your inbox/)).toBeInTheDocument();
  });
});
