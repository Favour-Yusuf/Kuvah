import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital experiences, digital products, and systems & automation — see where Kuvah can help move your business forward.",
};

const BAND_STYLES = {
  "digital-experiences": { bg: "bg-paper", text: "text-ink", muted: "text-ink-muted", watermark: "text-ink/5", button: "primary" as const },
  "digital-products": { bg: "bg-mist", text: "text-ink", muted: "text-ink-muted", watermark: "text-ink/5", button: "primary" as const },
  "systems-automation": { bg: "bg-sky-deep", text: "text-paper", muted: "text-paper/70", watermark: "text-paper/10", button: "invert" as const },
} as const;

export default function ServicesPage() {
  return (
    <>
      <section className="bg-paper py-20 sm:py-28">
        <Container width="narrow">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-6xl">
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

      {services.map((service, index) => {
        const style = BAND_STYLES[service.slug];
        const prev = index > 0 ? BAND_STYLES[services[index - 1].slug].bg : "bg-paper";
        return (
          <div key={service.slug}>
            {index > 0 && <SectionDivider from={prev} to={style.bg} flip={index % 2 === 0} />}
            <section id={service.slug} className={`relative overflow-hidden py-20 sm:py-28 ${style.bg}`}>
              <span aria-hidden="true" className={`numeral-watermark pointer-events-none absolute -right-4 -top-6 select-none font-display font-bold ${style.watermark} sm:-right-8`}>
                {service.number}
              </span>
              <Container className="relative">
                <p className={`text-sm font-semibold ${style.muted}`}>{service.number}</p>
                <h2 className={`mt-3 max-w-2xl font-display text-3xl font-semibold sm:text-5xl ${style.text}`}>
                  {service.pageHeadline}
                </h2>
                <div className={`mt-6 max-w-2xl space-y-4 text-lg leading-relaxed ${style.muted}`}>
                  {service.pageIntro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-12 grid gap-8 sm:grid-cols-2">
                  {service.pageCapabilities.map((capability) => (
                    <div key={capability.name}>
                      <h3 className={`font-display text-xl font-semibold ${style.text}`}>{capability.name}</h3>
                      {capability.description && (
                        <p className={`mt-2 text-base leading-relaxed ${style.muted}`}>{capability.description}</p>
                      )}
                    </div>
                  ))}
                </div>

                <LinkButton href="/start-a-project" variant={style.button} className="mt-12">
                  {service.pageCtaLabel}
                </LinkButton>
              </Container>
            </section>
          </div>
        );
      })}
    </>
  );
}
