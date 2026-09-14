"use client";

import { useState, type FormEvent, type ReactNode } from "react";

export type EnquiryFormValues = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  timeline: string;
  budget: string;
};

const INTEREST_OPTIONS = [
  "Website",
  "Ecommerce",
  "Digital Product",
  "SaaS MVP",
  "Automation",
  "Internal System",
  "I'm not sure yet",
];

const TIMELINE_OPTIONS = ["As soon as possible", "Within a month", "1–3 months", "Just exploring"];

const EMPTY_VALUES: EnquiryFormValues = {
  name: "",
  email: "",
  company: "",
  interest: "",
  message: "",
  timeline: "",
  budget: "",
};

type FormErrors = Partial<Record<keyof EnquiryFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEnquiry(values: EnquiryFormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Tell us your name.";
  if (!values.email.trim()) {
    errors.email = "Tell us your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "That email address doesn't look right.";
  }
  if (!values.interest) errors.interest = "Let us know what you're interested in.";
  if (!values.message.trim()) errors.message = "Tell us a little about what you're trying to achieve.";
  if (!values.timeline) errors.timeline = "Let us know your timeline.";
  return errors;
}

export async function submitEnquiry(values: EnquiryFormValues): Promise<void> {
  // No delivery backend is wired up yet. Replace this with a real request
  // (an API route, or a form-delivery provider) once one is chosen.
  await Promise.resolve(values);
}

export function StartProjectForm() {
  const [values, setValues] = useState<EnquiryFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle");

  function updateField<K extends keyof EnquiryFormValues>(field: K, value: EnquiryFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    await submitEnquiry(values);
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <div role="status" className="max-w-xl">
        <h2 className="font-display text-3xl font-semibold text-ink">We&apos;ve got it.</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          Thanks for reaching out to Kuvah. We&apos;ll take a look at what you&apos;ve shared and
          get back to you with the next step.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          In the meantime, you can explore some of the things we&apos;ve been working on.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="grid max-w-xl gap-6">
      <Field label="Your name" error={errors.name} id="field-name">
        <input
          id="field-name"
          type="text"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="w-full rounded-md border border-ink/20 bg-paper px-4 py-3 text-ink"
        />
      </Field>

      <Field label="Email address" error={errors.email} id="field-email">
        <input
          id="field-email"
          type="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="w-full rounded-md border border-ink/20 bg-paper px-4 py-3 text-ink"
        />
      </Field>

      <Field label="Business or company name" error={errors.company} id="field-company">
        <input
          id="field-company"
          type="text"
          value={values.company}
          onChange={(event) => updateField("company", event.target.value)}
          className="w-full rounded-md border border-ink/20 bg-paper px-4 py-3 text-ink"
        />
      </Field>

      <Field label="What are you interested in?" error={errors.interest} id="field-interest">
        <select
          id="field-interest"
          value={values.interest}
          onChange={(event) => updateField("interest", event.target.value)}
          className="w-full rounded-md border border-ink/20 bg-paper px-4 py-3 text-ink"
        >
          <option value="" disabled>
            Select an option
          </option>
          {INTEREST_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="What are you trying to achieve?"
        error={errors.message}
        hint="Tell us a little about your business, idea or current challenge."
        id="field-message"
      >
        <textarea
          id="field-message"
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          rows={5}
          className="w-full rounded-md border border-ink/20 bg-paper px-4 py-3 text-ink"
        />
      </Field>

      <Field label="What is your timeline?" error={errors.timeline} id="field-timeline">
        <select
          id="field-timeline"
          value={values.timeline}
          onChange={(event) => updateField("timeline", event.target.value)}
          className="w-full rounded-md border border-ink/20 bg-paper px-4 py-3 text-ink"
        >
          <option value="" disabled>
            Select an option
          </option>
          {TIMELINE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field label="What is your approximate budget?" error={errors.budget} id="field-budget">
        <input
          id="field-budget"
          type="text"
          value={values.budget}
          onChange={(event) => updateField("budget", event.target.value)}
          className="w-full rounded-md border border-ink/20 bg-paper px-4 py-3 text-ink"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-topaz hover:text-ink disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  children,
  id,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <div className="grid gap-2">
      <div className="text-sm font-medium text-ink">
        <label htmlFor={id}>{label}</label>
        {hint && <div className="text-sm font-normal text-ink-muted">{hint}</div>}
      </div>
      <div>
        {children}
        {error && <span className="text-sm font-normal text-red-600">{error}</span>}
      </div>
    </div>
  );
}
