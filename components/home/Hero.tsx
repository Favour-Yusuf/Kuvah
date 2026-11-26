import { LinkButton } from "@/components/ui/Button";
import { SystemsDiagram } from "@/components/graphics/SystemsDiagram";
import { CONTACT_HREF } from "@/lib/data/site";

const CAPABILITIES = ["Custom software", "Business automation", "Systems integration"];

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="bg-oxblood text-paper">
      <div className="page-container grid gap-16 pb-20 pt-14 md:pb-28 md:pt-20 lg:grid-cols-12 lg:items-center lg:gap-6">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <h1
            id="hero-heading"
            className="max-w-[13ch] font-display text-h1 font-semibold text-balance"
          >
            Your business deserves better systems.
          </h1>

          <div className="flex max-w-[58ch] flex-col gap-4">
            <p className="text-lead text-pretty">
              Running a service business shouldn&apos;t mean constantly chasing updates, managing
              repetitive tasks, switching between disconnected tools or holding everything together
              manually.
            </p>
            <p className="text-body text-pretty">
              Kuvah helps service-based businesses simplify operations, eliminate inefficiencies and
              build better ways of working through technology.
            </p>
          </div>

          <ul aria-label="Capabilities" className="flex flex-wrap gap-2">
            {CAPABILITIES.map((label) => (
              <li
                key={label}
                className="border border-paper px-3 py-2 text-label font-semibold uppercase"
              >
                {label}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-5 pt-2">
            <LinkButton href={CONTACT_HREF} variant="primary-inverse">
              Let&apos;s solve a business problem
            </LinkButton>
            <a
              href="#what-we-do"
              className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold underline decoration-coral decoration-2 underline-offset-[5px] transition-colors duration-150 hover:decoration-paper"
            >
              Explore what we do <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="hidden lg:col-span-5 lg:block">
          <SystemsDiagram className="w-full" />
        </div>
      </div>
    </section>
  );
}
