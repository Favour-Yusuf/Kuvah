import { DotList } from "@/components/ui/DotList";
import { SectionLabel } from "@/components/ui/SectionLabel";

const SERVICES = [
  {
    number: "01",
    name: "Business Workflow Automation",
    summary: "Reduce repetitive work and make everyday processes run more efficiently.",
    items: [
      "Lead capture and follow-ups",
      "Client onboarding",
      "Notifications and task routing",
      "Automated reminders and administrative workflows",
    ],
  },
  {
    number: "02",
    name: "Business Management Systems",
    summary: "Give your team better ways to manage clients, projects and internal operations.",
    items: [
      "CRM and client management systems",
      "Internal business dashboards",
      "Client portals",
      "Project and approval management",
    ],
  },
  {
    number: "03",
    name: "Custom Software Development",
    summary:
      "When off-the-shelf tools cannot meet your needs, we build software around the way your business works.",
    items: [
      "Custom web applications",
      "Business management platforms",
      "SaaS products and MVPs",
      "API development and integrations",
    ],
  },
  {
    number: "04",
    name: "Business Intelligence and Reporting",
    summary: "Turn scattered business information into useful insights for better decisions.",
    items: [
      "Operational dashboards",
      "Automated reports",
      "Performance tracking",
      "Revenue and project visibility",
    ],
  },
] as const;

export function WhatWeDo() {
  return (
    <section id="what-we-do" aria-labelledby="what-we-do-heading" className="scroll-mt-[72px] bg-paper">
      <div className="page-container pb-20 md:pb-28">
        <div className="grid gap-8 border-t-8 border-oxblood pt-16 md:pt-24 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-6">
            <SectionLabel>What we do</SectionLabel>
            <h2 id="what-we-do-heading" className="mt-5 font-display text-h2 font-semibold text-balance">
              We turn operational problems into working solutions.
            </h2>
          </div>
          <div className="flex max-w-[56ch] flex-col gap-4 text-body text-pretty lg:col-span-5 lg:col-start-8">
            <p>
              We look beyond the technology itself to understand how your business operates, where
              things break down and what needs to change.
            </p>
            <p>
              Then we design and implement practical technology solutions that make your business
              work better.
            </p>
          </div>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-2">
          {SERVICES.map((service) => (
            <li key={service.number} className="flex flex-col gap-6 bg-sand p-7 md:p-10">
              <span className="text-label font-semibold uppercase" aria-hidden="true">
                {service.number}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="font-heading text-h3 font-semibold">{service.name}</h3>
                <p className="text-body text-pretty">{service.summary}</p>
              </div>
              <DotList
                items={service.items}
                className="mt-auto border-t-2 border-oxblood"
                itemClassName="border-b border-stone py-3 text-[15px] leading-normal"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
