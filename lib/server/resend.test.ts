import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createContact, ResendError, sendEmail } from "./resend";

const fetchMock = vi.fn();

beforeEach(() => {
  process.env.RESEND_API_KEY = "re_test";
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockImplementation(async () => new Response(JSON.stringify({ id: "x" }), { status: 200 }));
});
afterEach(() => vi.unstubAllGlobals());

describe("sendEmail", () => {
  it("posts Resend's field names with auth and idempotency headers", async () => {
    await sendEmail({
      from: "F <f@x.com>",
      to: "a@b.com",
      subject: "S",
      html: "<p>h</p>",
      text: "t",
      replyTo: "r@x.com",
      idempotencyKey: "key-1",
    });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers).toMatchObject({ Authorization: "Bearer re_test", "Idempotency-Key": "key-1" });
    expect(JSON.parse(init.body)).toEqual({
      from: "F <f@x.com>",
      to: "a@b.com",
      subject: "S",
      html: "<p>h</p>",
      text: "t",
      reply_to: "r@x.com",
    });
  });

  it("throws a ResendError carrying the status and body", async () => {
    fetchMock.mockImplementation(async () => new Response('{"message":"bad from"}', { status: 422 }));
    await expect(
      sendEmail({ from: "f", to: "a@b.com", subject: "s", html: "h", text: "t" })
    ).rejects.toMatchObject({ status: 422, body: '{"message":"bad from"}' });
    await expect(
      sendEmail({ from: "f", to: "a@b.com", subject: "s", html: "h", text: "t" })
    ).rejects.toBeInstanceOf(ResendError);
  });
});

describe("createContact", () => {
  it("creates a global contact opted in to the topic and added to the segment", async () => {
    await createContact({ email: "a@b.com", firstName: "Ada", segmentIds: ["s1"], topicIds: ["t1"] });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/contacts");
    expect(JSON.parse(init.body)).toEqual({
      email: "a@b.com",
      first_name: "Ada",
      unsubscribed: false,
      segments: [{ id: "s1" }],
      topics: [{ id: "t1", subscription: "opt_in" }],
    });
  });
});
