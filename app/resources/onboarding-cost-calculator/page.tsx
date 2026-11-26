import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/resources/LeadForm";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { requestOnboardingCalculator } from "./actions";

const SUBHEAD =
  "A free spreadsheet for service business owners. Enter 5 numbers and see what onboarding costs you each month in staff time and delayed revenue.";

export const metadata: Metadata = {
  title: "Onboarding Cost Calculator",
  description: SUBHEAD,
};

const WHAT_YOU_GET = [
  "5 inputs: clients per month, admin hours per client, cost of an hour, days from yes to kickoff, revenue per client",
  "Shows your staff cost per month and per year, and the revenue you are waiting on",
  "Compares the total to what a fix would cost, so you know if it is worth fixing",
];

export default function OnboardingCalculatorPage() {
  return (
    <>
      <section aria-labelledby="calculator-heading" className="bg-oxblood text-paper">
        <div className="page-container grid gap-12 pb-20 pt-10 md:pb-24 md:pt-14 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-7 lg:col-span-6">
            <Link
              href="/resources"
              className="w-fit text-label font-semibold uppercase underline decoration-coral decoration-2 underline-offset-[5px] hover:decoration-paper"
            >
              Free resources
            </Link>
            <h1
              id="calculator-heading"
              className="font-display text-h1 font-semibold text-balance"
            >
              Find out what slow onboarding costs you in 1 minute
            </h1>
            <p className="max-w-[52ch] text-lead text-pretty">{SUBHEAD}</p>
            <p className="max-w-[52ch] border-t-2 border-paper pt-5 text-body text-pretty">
              In the example from the video, 8 new clients a month comes to{" "}
              <strong className="font-semibold text-yellow">$1,600 in staff time</strong> and{" "}
              <strong className="font-semibold text-yellow">$4,800 in revenue pushed back</strong>.
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="bg-paper p-7 text-oxblood md:p-9">
              <h2 className="mb-6 font-heading text-h3 font-semibold">Get the spreadsheet</h2>
              <LeadForm
                action={requestOnboardingCalculator}
                submitLabel="Send me the spreadsheet"
                finePrint="It lands in your inbox in a few minutes. I'll also email you when I publish new videos on fixing onboarding. Unsubscribe any time."
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="whats-in-it-heading" className="bg-paper">
        <div className="page-container py-20 md:py-24">
          <SectionLabel>What&apos;s in it</SectionLabel>
          <h2 id="whats-in-it-heading" className="sr-only">
            What&apos;s in the spreadsheet
          </h2>
          <ul className="mt-6 grid gap-8 md:grid-cols-3 md:gap-6">
            {WHAT_YOU_GET.map((item) => (
              <li key={item} className="border-t-2 border-oxblood pt-5 text-lead text-pretty">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-16 grid gap-6 lg:grid-cols-12">
            <p className="bg-sand p-7 font-heading text-h3 font-semibold text-balance md:p-9 lg:col-span-7">
              If you onboard 1 or 2 clients a year, a checklist will do and you don&apos;t need this.
            </p>
            <p className="self-end text-body text-pretty lg:col-span-4 lg:col-start-9">
              I&apos;m Favour. I make videos on fixing operational problems in service businesses.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
