import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StartAProjectPage from "./page";

describe("StartAProjectPage", () => {
  it("renders the page heading and the form's submit button", () => {
    render(<StartAProjectPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Tell us what's going on." })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send Enquiry" })).toBeInTheDocument();
  });
});
