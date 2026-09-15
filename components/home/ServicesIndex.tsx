import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/data/services";

export function ServicesIndex() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            What can we help you build?
          </h2>
          <p className="mt-4 text-lg text-ink-muted">We work across three areas.</p>
        </Reveal>

        <div className="mt-16 divide-y divide-ink/10 border-t border-ink/10">
          {services.map((service) => (
            <Reveal key={service.slug} className="grid gap-6 py-12 sm:grid-cols-[100px_1fr] sm:gap-10">
              <span
                className={`font-display text-2xl font-semibold ${
                  service.slug === "systems-automation" ? "text-sky" : "text-ink-muted"
                }`}
              >
                {service.number}
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {service.name}
                </h3>
                <div className="mt-4 max-w-2xl space-y-3 text-base leading-relaxed text-ink-muted">
                  {service.homeIntro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <p className="mt-6 text-sm font-semibold text-ink-muted">What we do</p>
                <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-base text-ink">
                  {service.homeCapabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
                <Link
                  href={`/services#${service.slug}`}
                  className="mt-6 inline-block text-sm font-semibold text-ink underline decoration-topaz decoration-2 underline-offset-4"
                >
                  {service.homeCtaLabel}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
