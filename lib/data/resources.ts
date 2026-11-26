export type Resource = {
  slug: string;
  href: string;
  format: string;
  title: string;
  summary: string;
  cta: string;
};

export const ONBOARDING_CALCULATOR_PATH = "/resources/onboarding-cost-calculator";
export const ONBOARDING_CALCULATOR_COOKIE = "kuvah_onboarding_calculator";

// Newest first. Each resource gets its own landing page under /resources.
export const resources: Resource[] = [
  {
    slug: "onboarding-cost-calculator",
    href: ONBOARDING_CALCULATOR_PATH,
    format: "Free spreadsheet",
    title: "Onboarding Cost Calculator",
    summary:
      "Enter 5 numbers and see what onboarding costs you each month in staff time and delayed revenue.",
    cta: "Get the spreadsheet",
  },
];
