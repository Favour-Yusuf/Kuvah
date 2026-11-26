// Minimal Resend REST client (https://resend.com/docs/api-reference).
// Plain fetch keeps the dependency list short; the two calls we need are
// "send an email" and "create a contact". Server-only: never import this
// from a client component (RESEND_API_KEY has no NEXT_PUBLIC_ prefix, so
// it would be undefined there anyway).

const API = "https://api.resend.com";

export class ResendError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body: string
  ) {
    super(message);
  }
}

function apiKey() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return key;
}

async function post<T>(path: string, body: unknown, headers: Record<string, string> = {}): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const text = await response.text();
  if (!response.ok) {
    throw new ResendError(`Resend ${path} failed with ${response.status}`, response.status, text);
  }
  return JSON.parse(text) as T;
}

export type SendEmailInput = {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  tags?: { name: string; value: string }[];
  // Resend drops a repeat request with the same key for 24 hours, so a
  // double submit can't send the email twice.
  idempotencyKey?: string;
};

export function sendEmail(input: SendEmailInput) {
  return post<{ id: string }>(
    "/emails",
    {
      from: input.from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      ...(input.tags ? { tags: input.tags } : {}),
    },
    input.idempotencyKey ? { "Idempotency-Key": input.idempotencyKey } : {}
  );
}

export type CreateContactInput = {
  email: string;
  firstName?: string;
  segmentIds?: string[];
  topicIds?: string[];
};

export function createContact(input: CreateContactInput) {
  return post<{ id: string }>("/contacts", {
    email: input.email,
    ...(input.firstName ? { first_name: input.firstName } : {}),
    unsubscribed: false,
    ...(input.segmentIds?.length ? { segments: input.segmentIds.map((id) => ({ id })) } : {}),
    ...(input.topicIds?.length
      ? { topics: input.topicIds.map((id) => ({ id, subscription: "opt_in" })) }
      : {}),
  });
}
