import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LinkButton } from "@/components/ui/Button";
import { ONBOARDING_CALCULATOR_COOKIE } from "@/lib/data/resources";

export const metadata: Metadata = {
  title: "Check your inbox",
  robots: { index: false, follow: false },
};

function readSubscriber(raw: string | undefined) {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as { firstName?: unknown; email?: unknown };
    return {
      firstName: typeof value.firstName === "string" ? value.firstName : "",
      email: typeof value.email === "string" ? value.email : "",
    };
  } catch {
    return null;
  }
}

export default async function OnboardingCalculatorThanksPage() {
  const store = await cookies();
  const subscriber = readSubscriber(store.get(ONBOARDING_CALCULATOR_COOKIE)?.value);
  const firstName = subscriber?.firstName;
  const email = subscriber?.email;

  return (
    <section aria-labelledby="thanks-heading" className="bg-paper">
      <div className="page-container grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <h1 id="thanks-heading" className="font-display text-h1 font-semibold text-balance">
            {firstName ? `Check your inbox, ${firstName}` : "Check your inbox"}
          </h1>
          <p className="max-w-[60ch] text-lead text-pretty">
            The spreadsheet is on its way to{" "}
            {email ? <strong className="font-semibold">{email}</strong> : "your inbox"}. It should
            arrive in a few minutes. If you can&apos;t find it, check spam or promotions and search for
            &ldquo;Onboarding Cost Calculator&rdquo;.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-5 lg:self-end">
          <div className="flex flex-col gap-4 bg-sand p-7 text-body text-pretty md:p-9">
            <p>
              To get the most out of it, pull up your last 5 clients first. Count the admin hours
              each one took and the days between the yes and the first day of work.
            </p>
            <p className="font-semibold">Those two numbers are the ones most people guess wrong.</p>
          </div>
          <LinkButton href="/resources" variant="ghost">
            More free resources
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
