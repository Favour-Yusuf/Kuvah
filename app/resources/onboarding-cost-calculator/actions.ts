"use server";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { buildOnboardingEmail } from "@/lib/email/onboarding-calculator-email";
import { ONBOARDING_CALCULATOR_COOKIE, ONBOARDING_CALCULATOR_PATH } from "@/lib/data/resources";
import { parseLeadForm, type LeadFormState } from "@/lib/resources/lead";
import { createContact, ResendError, sendEmail } from "@/lib/server/resend";

const SEND_FAILED =
  "We couldn't send the spreadsheet just now. Please try again in a minute.";

function readConfig() {
  const from = process.env.EMAIL_FROM;
  const copyUrl = process.env.ONBOARDING_CALCULATOR_COPY_URL;
  if (!process.env.RESEND_API_KEY || !from || !copyUrl?.startsWith("https://")) return null;
  const siteUrl = process.env.SITE_URL?.replace(/\/$/, "");
  return {
    from,
    copyUrl,
    replyTo: process.env.EMAIL_REPLY_TO || undefined,
    segmentId: process.env.RESEND_SEGMENT_ID || undefined,
    topicId: process.env.RESEND_TOPIC_ID || undefined,
    logoUrl: siteUrl ? `${siteUrl}/logos/PNG/kuvah-logo-primary.png` : undefined,
  };
}

// Logs never include the subscriber's name or email address.
function logFailure(step: string, error: unknown) {
  if (error instanceof ResendError) {
    console.error(`[onboarding-calculator] ${step}: ${error.status} ${error.body}`);
  } else {
    console.error(`[onboarding-calculator] ${step}:`, error instanceof Error ? error.message : error);
  }
}

export async function requestOnboardingCalculator(
  _previous: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const parsed = parseLeadForm(formData);
  if (!parsed.ok) return parsed.state;
  const { firstName, email } = parsed.data;

  // Bots that fill the hidden field get the normal thank-you page, but
  // nothing is sent and no contact is created.
  if (!parsed.isBot) {
    const config = readConfig();
    if (!config) {
      logFailure("config", "RESEND_API_KEY, EMAIL_FROM or ONBOARDING_CALCULATOR_COPY_URL missing");
      return { status: "error", message: SEND_FAILED, values: { firstName, email } };
    }

    // 1. The spreadsheet. This is the promise on the page, so it must work.
    try {
      const message = buildOnboardingEmail({ firstName, copyUrl: config.copyUrl, logoUrl: config.logoUrl });
      const tenMinuteSlot = Math.floor(Date.now() / (10 * 60 * 1000));
      await sendEmail({
        from: config.from,
        to: email,
        replyTo: config.replyTo,
        ...message,
        tags: [{ name: "resource", value: "onboarding_cost_calculator" }],
        idempotencyKey: `onboarding-calculator/${createHash("sha256").update(email).digest("hex")}/${tenMinuteSlot}`,
      });
    } catch (error) {
      logFailure("send email", error);
      return { status: "error", message: SEND_FAILED, values: { firstName, email } };
    }

    // 2. The mailing list for new videos. Best effort: a failure here must
    //    not stop someone getting what they asked for.
    try {
      await createContact({
        email,
        firstName,
        segmentIds: config.segmentId ? [config.segmentId] : undefined,
        topicIds: config.topicId ? [config.topicId] : undefined,
      });
    } catch (error) {
      logFailure("create contact", error);
    }
  }

  // Hand the name and email to the thank-you page without putting them
  // in the URL (where they'd leak into analytics and server logs).
  const store = await cookies();
  store.set(ONBOARDING_CALCULATOR_COOKIE, JSON.stringify({ firstName, email }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10,
    path: ONBOARDING_CALCULATOR_PATH,
  });

  redirect(`${ONBOARDING_CALCULATOR_PATH}/thanks`);
}
