import { SectionLabel } from "@/components/ui/SectionLabel";

const MORE = ["More clients.", "More projects.", "More employees.", "More moving parts."];

export function Problem() {
  return (
    <section aria-labelledby="problem-heading" className="bg-paper">
      <div className="page-container grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[120px]">
            <SectionLabel>The problem</SectionLabel>
            <h2 id="problem-heading" className="mt-5 font-display text-h2 font-semibold text-balance">
              Growing your business shouldn&apos;t make running it harder.
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-12 lg:col-span-6 lg:col-start-7">
          <p className="border-t-2 border-oxblood">
            {MORE.map((line) => (
              <span
                key={line}
                className="block border-b border-stone py-4 font-heading text-h3 font-semibold"
              >
                {line}
              </span>
            ))}
          </p>

          <div className="flex max-w-[62ch] flex-col gap-5 text-body text-pretty">
            <p>What once worked when your business was small can become a bottleneck as you grow.</p>
            <p>
              Perhaps your team spends hours doing things that should happen automatically. Maybe
              important information is scattered across multiple platforms. Perhaps you&apos;re still
              relying on spreadsheets, endless messages and manual processes to keep work moving.
            </p>
            <p>
              These aren&apos;t just inconveniences. They affect your team&apos;s productivity, your
              customer experience and ultimately your profitability.
            </p>
          </div>

          <p className="border-t-2 border-oxblood pt-6 font-heading text-h3 font-semibold text-balance">
            You don&apos;t necessarily need more people or more tools. You need{" "}
            <span className="underline decoration-coral decoration-[3px] underline-offset-[6px]">
              better systems.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
