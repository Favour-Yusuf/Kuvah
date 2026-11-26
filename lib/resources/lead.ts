// Validation for resource sign-up forms. Kept out of the "use server"
// action file so it can be unit-tested and reused by other resources.

export type LeadFields = { firstName: string; email: string };

export type LeadFormState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof LeadFields, string>>;
  values?: Partial<LeadFields>;
};

export const HONEYPOT_FIELD = "website";

// Deliberately loose: the real check is whether Resend can deliver.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseLeadForm(
  formData: FormData
): { ok: true; data: LeadFields; isBot: boolean } | { ok: false; state: LeadFormState } {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const isBot = String(formData.get(HONEYPOT_FIELD) ?? "") !== "";

  const fieldErrors: LeadFormState["fieldErrors"] = {};
  if (!firstName) fieldErrors.firstName = "Enter your first name.";
  else if (firstName.length > 80) fieldErrors.firstName = "Keep your first name under 80 characters.";

  if (!email) fieldErrors.email = "Enter your email address.";
  else if (email.length > 320 || !EMAIL_PATTERN.test(email))
    fieldErrors.email = "Enter an email address like name@company.com.";

  if (fieldErrors.firstName || fieldErrors.email) {
    return { ok: false, state: { status: "error", fieldErrors, values: { firstName, email } } };
  }
  return { ok: true, data: { firstName, email }, isBot };
}
