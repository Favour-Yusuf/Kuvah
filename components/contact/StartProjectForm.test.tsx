import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StartProjectForm, validateEnquiry } from "./StartProjectForm";

describe("validateEnquiry", () => {
  const valid = {
    name: "Ada",
    email: "ada@example.com",
    company: "",
    interest: "Website",
    message: "We need a new site.",
    timeline: "Within a month",
    budget: "",
  };

  it("passes with only the required fields filled in", () => {
    expect(validateEnquiry(valid)).toEqual({});
  });

  it("flags every required field when empty", () => {
    const errors = validateEnquiry({ ...valid, name: "", email: "", interest: "", message: "", timeline: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "interest", "message", "name", "timeline"]);
  });

  it("flags a malformed email", () => {
    const errors = validateEnquiry({ ...valid, email: "not-an-email" });
    expect(errors.email).toBeDefined();
  });
});

describe("StartProjectForm", () => {
  it("shows validation errors instead of the success state when submitted empty", async () => {
    const user = userEvent.setup();
    render(<StartProjectForm />);
    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));
    expect(screen.getByText("Tell us your name.")).toBeInTheDocument();
    expect(screen.queryByText("We've got it.")).not.toBeInTheDocument();
  });

  it("shows the success state after a valid submission", async () => {
    const user = userEvent.setup();
    render(<StartProjectForm />);

    await user.type(screen.getByLabelText("Your name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email address"), "ada@example.com");
    await user.selectOptions(screen.getByLabelText("What are you interested in?"), "Website");
    await user.type(
      screen.getByLabelText("What are you trying to achieve?"),
      "We need a new site."
    );
    await user.selectOptions(screen.getByLabelText("What is your timeline?"), "Within a month");

    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));

    expect(await screen.findByText("We've got it.")).toBeInTheDocument();
  });
});
