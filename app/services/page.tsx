import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital experiences, digital products, and systems & automation — see where Kuvah can help move your business forward.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-paper py-20 sm:py-28">
        <Container width="narrow">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
            What are you trying to move forward?
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>Technology can take many forms.</p>
            <p>A website. A product. A better internal process. An automated workflow.</p>
            <p>The right answer depends on what you&apos;re trying to achieve.</p>
            <p>Here&apos;s where we can help.</p>
          </div>
        </Container>
      </section>

      {services.map((service, index) => (
        <section
          key={service.slug}
          id={service.slug}
          className={`py-20 sm:py-28 ${index % 2 === 1 ? "bg-mist" : "bg-paper"}`}
        >
          <Container>
            <p
              className={`text-sm font-semibold ${
                service.slug === "systems-automation" ? "text-sky" : "text-ink-muted"
              }`}
            >
              {service.number}
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-ink sm:text-4xl">
              {service.pageHeadline}
            </h2>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-muted">
              {service.pageIntro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {service.pageCapabilities.map((capability) => (
                <div key={capability.name}>
                  <h3 className="font-display text-xl font-semibold text-ink">{capability.name}</h3>
                  {capability.description && (
                    <p className="mt-2 text-base leading-relaxed text-ink-muted">
                      {capability.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <LinkButton href="/start-a-project" className="mt-12">
              {service.pageCtaLabel}
            </LinkButton>
          </Container>
        </section>
      ))}
    </>
  );
}
