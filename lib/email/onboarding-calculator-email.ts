// Delivery email for the Onboarding Cost Calculator. Hand-written,
// table-based HTML with inline styles so it renders in Gmail and Outlook.
// Brand colours (§06); Arial because email clients can't load Fraunces or
// Inter (same choice as the brand email signature, §13).

export const ONBOARDING_EMAIL_SUBJECT = "Your onboarding cost spreadsheet";
export const ONBOARDING_EMAIL_PREHEADER = "Open it, click File, then Make a copy.";

const OXBLOOD = "#2B0B13";
const PAPER = "#F7F4EF";
const CORAL = "#F4623F";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const PARAGRAPHS_AFTER_LINK = [
  "It opens a copy that belongs to you, so your numbers stay private.",
  "Fill in the yellow cells and the green cells calculate by themselves. Use your last 5 clients for the admin hours and the days to kickoff, because that is where most people guess wrong.",
  "If you want a second opinion, reply to this email with your monthly total and I'll tell you whether it is worth fixing or whether a checklist is enough.",
  "One rule from the video: don't automate onboarding until it works by hand. Automation makes a working process faster, it doesn't repair a broken one.",
];

export function buildOnboardingEmail({
  firstName,
  copyUrl,
  logoUrl,
}: {
  firstName: string;
  copyUrl: string;
  logoUrl?: string;
}) {
  const name = escapeHtml(firstName);
  const href = escapeHtml(copyUrl);
  const p = (inner: string) =>
    `<p style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:24px;color:${OXBLOOD};">${inner}</p>`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(ONBOARDING_EMAIL_SUBJECT)}</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${PAPER};">${escapeHtml(ONBOARDING_EMAIL_PREHEADER)}&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};">
<tr><td align="center" style="padding:32px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
${
  logoUrl
    ? `<tr><td style="padding:0 0 28px;"><img src="${escapeHtml(logoUrl)}" width="104" alt="Kuvah" style="display:block;width:104px;height:auto;border:0;"></td></tr>`
    : ""
}
<tr><td style="border-top:2px solid ${OXBLOOD};padding-top:28px;">
${p(`Hi ${name},`)}
${p(`Here's the spreadsheet: <a href="${href}" style="color:${OXBLOOD};font-weight:bold;text-decoration:underline;text-decoration-color:${CORAL};">Onboarding Cost Calculator</a>`)}
${PARAGRAPHS_AFTER_LINK.map((text) => p(escapeHtml(text))).join("\n")}
${p("Favour")}
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    `Hi ${firstName},`,
    `Here's the spreadsheet: ${copyUrl}`,
    ...PARAGRAPHS_AFTER_LINK,
    "Favour",
  ].join("\n\n");

  return {
    subject: ONBOARDING_EMAIL_SUBJECT,
    html,
    text,
  };
}
