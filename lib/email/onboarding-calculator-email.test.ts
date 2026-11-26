import { describe, expect, it } from "vitest";
import { buildOnboardingEmail, ONBOARDING_EMAIL_PREHEADER } from "./onboarding-calculator-email";

const copyUrl = "https://docs.google.com/spreadsheets/d/abc/copy";

describe("buildOnboardingEmail", () => {
  it("uses the approved subject, preheader, link and sign-off", () => {
    const email = buildOnboardingEmail({ firstName: "Ada", copyUrl });
    expect(email.subject).toBe("Your onboarding cost spreadsheet");
    expect(email.html).toContain(ONBOARDING_EMAIL_PREHEADER);
    expect(email.html).toContain(`href="${copyUrl}"`);
    expect(email.html).toContain("Hi Ada,");
    expect(email.text.startsWith(`Hi Ada,\n\nHere's the spreadsheet: ${copyUrl}`)).toBe(true);
    expect(email.text.endsWith("Favour")).toBe(true);
  });

  it("escapes the name so form input can't inject HTML", () => {
    const email = buildOnboardingEmail({ firstName: '<img src=x onerror="alert(1)">', copyUrl });
    expect(email.html).not.toContain("<img src=x");
    expect(email.html).toContain("Hi &lt;img src=x onerror=&quot;alert(1)&quot;&gt;,");
  });

  it("only shows the logo when a site URL is configured", () => {
    expect(buildOnboardingEmail({ firstName: "A", copyUrl }).html).not.toContain("<img");
    expect(
      buildOnboardingEmail({ firstName: "A", copyUrl, logoUrl: "https://kuvah.example/logo.png" }).html
    ).toContain('<img src="https://kuvah.example/logo.png"');
  });
});
