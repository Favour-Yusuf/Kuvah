import { SectionLabel } from "@/components/ui/SectionLabel";

const SOMETIMES = [
  "Sometimes you need to connect what you already use.",
  "Sometimes you need to rethink a process.",
  "And sometimes you need something built specifically for your business.",
];

export function Differentiation() {
  return (
    <section aria-labelledby="differentiation-heading" className="bg-sand">
      <div className="page-container py-20 md:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-7">
            <SectionLabel>Why Kuvah</SectionLabel>
            <h2
              id="differentiation-heading"
              className="mt-5 font-display text-h2 font-semibold text-balance"
            >
              Not another tool. A better way to work.
            </h2>
          </div>
          <p className="max-w-[50ch] text-body text-pretty lg:col-span-4 lg:col-start-9">
            There is no shortage of software available today. But having more tools doesn&apos;t
            automatically make a business more efficient.
          </p>
        </div>

        <ul className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {SOMETIMES.map((line) => (
            <li key={line} className="border-t-2 border-oxblood pt-5 font-heading text-h3 font-semibold text-balance">
              {line}
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-8 border-t-8 border-oxblood pt-10 lg:grid-cols-12 lg:gap-6">
          <p className="font-display text-h2 font-semibold text-balance lg:col-span-6">
            We help you figure out the difference.
          </p>
          <div className="flex max-w-[54ch] flex-col gap-4 lg:col-span-5 lg:col-start-8">
            <p className="text-body text-pretty">
              We care about solutions that are useful, maintainable and aligned with the way your
              business actually operates.
            </p>
            <p className="text-lead font-medium text-pretty">
              The goal isn&apos;t to introduce more technology. It&apos;s to make technology work
              harder for your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
