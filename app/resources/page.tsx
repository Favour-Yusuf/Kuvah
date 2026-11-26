import type { Metadata } from "next";
import Link from "next/link";
import { resources } from "@/lib/data/resources";

export const metadata: Metadata = {
  title: "Free resources",
  description: "Free tools and templates for fixing operational problems in service businesses.",
};

export default function ResourcesPage() {
  return (
    <>
      <section aria-labelledby="resources-heading" className="bg-oxblood text-paper">
        <div className="page-container flex flex-col gap-6 pb-16 pt-14 md:pb-20 md:pt-20">
          <h1 id="resources-heading" className="font-display text-h1 font-semibold">
            Free resources
          </h1>
          <p className="max-w-[52ch] text-lead text-pretty">
            Free tools and templates for fixing operational problems in service businesses.
          </p>
        </div>
      </section>

      <section aria-label="All resources" className="bg-paper">
        <div className="page-container py-16 md:py-24">
          <ul className="border-t-2 border-oxblood">
            {resources.map((resource) => (
              <li key={resource.slug} className="border-b border-stone">
                <Link
                  href={resource.href}
                  className="group grid gap-3 py-8 md:grid-cols-12 md:gap-6 md:py-10"
                >
                  <span className="text-label font-semibold uppercase md:col-span-2 md:pt-2">
                    {resource.format}
                  </span>
                  <span className="flex flex-col gap-3 md:col-span-7">
                    <span className="font-display text-h2 font-semibold">{resource.title}</span>
                    <span className="max-w-[56ch] text-body text-pretty">{resource.summary}</span>
                  </span>
                  <span className="text-[15px] font-semibold underline decoration-coral decoration-2 underline-offset-[5px] group-hover:decoration-oxblood md:col-span-3 md:justify-self-end md:pt-3">
                    {resource.cta}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
