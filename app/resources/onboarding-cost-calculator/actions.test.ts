import { beforeEach, describe, expect, it, vi } from "vitest";

const cookieSet = vi.fn();
vi.mock("next/headers", () => ({ cookies: async () => ({ set: cookieSet }) }));

class RedirectSignal extends Error {
  constructor(readonly url: string) {
    super(`redirect:${url}`);
  }
}
vi.mock("next/navigation", () => ({
  redirect: (url: string) => {
    throw new RedirectSignal(url);
  },
}));

const sendEmail = vi.fn();
const createContact = vi.fn();
vi.mock("@/lib/server/resend", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/server/resend")>()),
  sendEmail: (...args: unknown[]) => sendEmail(...args),
  createContact: (...args: unknown[]) => createContact(...args),
}));

const { requestOnboardingCalculator } = await import("./actions");

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

async function submit(fields: Record<string, string>) {
  try {
    return { state: await requestOnboardingCalculator({ status: "idle" }, form(fields)) };
  } catch (error) {
    if (error instanceof RedirectSignal) return { redirect: error.url };
    throw error;
  }
}

describe("requestOnboardingCalculator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
    process.env.RESEND_API_KEY = "re_test";
    process.env.EMAIL_FROM = "Favour <favour@mail.example.com>";
    process.env.EMAIL_REPLY_TO = "favour@example.com";
    process.env.ONBOARDING_CALCULATOR_COPY_URL = "https://docs.google.com/spreadsheets/d/abc/copy";
    process.env.RESEND_SEGMENT_ID = "seg_1";
    process.env.RESEND_TOPIC_ID = "topic_1";
    sendEmail.mockResolvedValue({ id: "email_1" });
    createContact.mockResolvedValue({ id: "contact_1" });
  });

  it("returns field errors without calling Resend", async () => {
    const result = await submit({ firstName: "", email: "nope" });
    expect(result.state?.fieldErrors).toEqual({
      firstName: "Enter your first name.",
      email: "Enter an email address like name@company.com.",
    });
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("sends the email, adds the contact, sets the cookie and redirects", async () => {
    const result = await submit({ firstName: "Ada", email: "Ada@Example.com " });

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "ada@example.com",
        from: "Favour <favour@mail.example.com>",
        replyTo: "favour@example.com",
        subject: "Your onboarding cost spreadsheet",
        idempotencyKey: expect.stringMatching(/^onboarding-calculator\/[0-9a-f]{64}\/\d+$/),
      })
    );
    expect(sendEmail.mock.calls[0][0].html).toContain("https://docs.google.com/spreadsheets/d/abc/copy");
    expect(createContact).toHaveBeenCalledWith({
      email: "ada@example.com",
      firstName: "Ada",
      segmentIds: ["seg_1"],
      topicIds: ["topic_1"],
    });
    expect(cookieSet).toHaveBeenCalledWith(
      "kuvah_onboarding_calculator",
      JSON.stringify({ firstName: "Ada", email: "ada@example.com" }),
      expect.objectContaining({ httpOnly: true, path: "/resources/onboarding-cost-calculator" })
    );
    expect(result.redirect).toBe("/resources/onboarding-cost-calculator/thanks");
  });

  it("still redirects when adding the contact fails", async () => {
    createContact.mockRejectedValue(new Error("already exists"));
    const result = await submit({ firstName: "Ada", email: "ada@example.com" });
    expect(result.redirect).toBe("/resources/onboarding-cost-calculator/thanks");
  });

  it("shows an error and keeps the values when the email fails", async () => {
    sendEmail.mockRejectedValue(new Error("down"));
    const result = await submit({ firstName: "Ada", email: "ada@example.com" });
    expect(result.state?.status).toBe("error");
    expect(result.state?.values).toEqual({ firstName: "Ada", email: "ada@example.com" });
    expect(createContact).not.toHaveBeenCalled();
    expect(cookieSet).not.toHaveBeenCalled();
  });

  it("refuses to send when configuration is missing", async () => {
    delete process.env.ONBOARDING_CALCULATOR_COPY_URL;
    const result = await submit({ firstName: "Ada", email: "ada@example.com" });
    expect(result.state?.status).toBe("error");
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("gives bots the thank-you page without sending anything", async () => {
    const result = await submit({ firstName: "Bot", email: "bot@example.com", website: "spam.biz" });
    expect(sendEmail).not.toHaveBeenCalled();
    expect(createContact).not.toHaveBeenCalled();
    expect(result.redirect).toBe("/resources/onboarding-cost-calculator/thanks");
  });
});
