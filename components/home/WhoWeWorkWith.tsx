import { DotList } from "@/components/ui/DotList";
import { SectionLabel } from "@/components/ui/SectionLabel";

const CLIENT_TYPES = [
  "Agencies and creative studios",
  "Consulting and professional service firms",
  "Recruitment and talent companies",
  "Technology and software companies",
  "Other businesses built around delivering services",
];

export function WhoWeWorkWith() {
  return (
    <section aria-labelledby="who-heading" className="bg-paper">
      <div className="page-container grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <SectionLabel>Who we work with</SectionLabel>
          <h2 id="who-heading" className="font-display text-h2 font-semibold text-balance">
            Built around the realities of service businesses.
          </h2>
          <p className="max-w-[48ch] text-body text-pretty">
            We work with service-based businesses that want to spend less time managing operational
            complexity and more time delivering value to their customers.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
          <div>
            <p className="text-label font-semibold uppercase">This includes</p>
            <DotList
              items={CLIENT_TYPES}
              className="mt-4 border-t-2 border-oxblood"
              itemClassName="border-b border-stone py-5 font-heading text-h3 font-semibold"
            />
          </div>
          <p className="max-w-[56ch] text-lead text-pretty">
            Whether you&apos;re trying to improve an existing process or build an entirely new system,
            we&apos;re interested in understanding the problem.
          </p>
        </div>
      </div>
    </section>
  );
}
