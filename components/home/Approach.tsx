import { SectionLabel } from "@/components/ui/SectionLabel";

const STEPS = [
  {
    name: "Understand",
    body: "We learn how your business works, what you're trying to achieve and where the problems are.",
  },
  {
    name: "Identify",
    body: "We uncover bottlenecks, unnecessary manual work and opportunities for improvement.",
  },
  {
    name: "Design",
    body: "We map out a practical solution that fits your business, team and budget.",
  },
  {
    name: "Implement",
    body: "We build, configure and integrate the technology needed to make it work.",
  },
  {
    name: "Improve",
    body: "We help you monitor, maintain and optimise your systems as your business evolves.",
  },
] as const;

export function Approach() {
  return (
    <section aria-labelledby="approach-heading" className="bg-oxblood text-paper">
      <div className="page-container py-20 md:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-7">
            <SectionLabel>Our approach</SectionLabel>
            <h2 id="approach-heading" className="mt-5 font-display text-h2 font-semibold text-balance">
              We don&apos;t start with technology. We start with your business.
            </h2>
          </div>
          <div className="flex max-w-[52ch] flex-col gap-4 text-body text-pretty lg:col-span-4 lg:col-start-9">
            <p>
              Every business has its own processes, challenges and priorities. That&apos;s why we
              don&apos;t believe in forcing every problem into the same software or automation tool.
            </p>
            <p className="font-semibold">Our approach is simple:</p>
          </div>
        </div>

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {STEPS.map((step, i) => (
            <li key={step.name} className="relative flex flex-col gap-3 border-t-2 border-paper pt-8">
              <span
                aria-hidden="true"
                className="absolute -top-[7px] left-0 size-3 rounded-full bg-paper"
              />
              <span className="font-display text-h2 font-semibold tabular-nums" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="font-heading text-h3 font-semibold">{step.name}</h3>
              <p className="text-body text-pretty">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
