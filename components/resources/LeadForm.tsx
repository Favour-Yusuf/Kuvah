"use client";

import { useActionState, useId } from "react";
import { HONEYPOT_FIELD, type LeadFormState } from "@/lib/resources/lead";

type Action = (state: LeadFormState, formData: FormData) => Promise<LeadFormState>;

const INPUT_CLASSES =
  "min-h-12 w-full border border-mute bg-paper px-4 text-body text-oxblood placeholder:text-mute aria-invalid:border-2 aria-invalid:border-oxblood";

export function LeadForm({
  action,
  submitLabel,
  pendingLabel = "Sending…",
  finePrint,
}: {
  action: Action;
  submitLabel: string;
  pendingLabel?: string;
  finePrint: string;
}) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" });
  const id = useId();
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-first-name`} className="text-[15px] font-semibold">
          First name
        </label>
        <input
          id={`${id}-first-name`}
          name="firstName"
          type="text"
          autoComplete="given-name"
          required
          maxLength={80}
          defaultValue={state.values?.firstName}
          aria-invalid={errors.firstName ? true : undefined}
          aria-describedby={errors.firstName ? `${id}-first-name-error` : undefined}
          className={INPUT_CLASSES}
        />
        {errors.firstName && (
          <p id={`${id}-first-name-error`} className="text-caption font-semibold">
            {errors.firstName}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-email`} className="text-[15px] font-semibold">
          Email
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={320}
          defaultValue={state.values?.email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
          className={INPUT_CLASSES}
        />
        {errors.email && (
          <p id={`${id}-email-error`} className="text-caption font-semibold">
            {errors.email}
          </p>
        )}
      </div>

      {/* Spam trap: hidden from people and screen readers; bots fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-${HONEYPOT_FIELD}`}>Leave this empty</label>
        <input
          id={`${id}-${HONEYPOT_FIELD}`}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.message && (
        <p role="alert" className="border-l-[6px] border-oxblood bg-sand px-4 py-3 text-[15px]">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center bg-coral px-[22px] text-[16px] font-semibold text-oxblood transition-colors duration-150 hover:bg-oxblood hover:text-paper disabled:cursor-wait disabled:bg-oxblood disabled:text-paper"
      >
        {pending ? pendingLabel : submitLabel}
      </button>

      <p className="text-caption text-mute">{finePrint}</p>
    </form>
  );
}
