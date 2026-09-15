import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/data/services";

export function ServicesIndex() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            What can we help you build?
          </h2>
          <p className="mt-4 text-lg text-ink-muted">We work across three areas.</p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {services.map((service) => (
            <Reveal
              key={service.slug}
              className="group flex h-full flex-col border border-ink/10 bg-paper p-8 transition-colors hover:border-topaz hover:border-t-4 hover:border-t-topaz"
            >
              <span className="font-display text-3xl font-bold text-topaz">{service.number}</span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-ink">{service.name}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">{service.homeIntro[0]}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {service.homeCapabilities.map((capability) => (
                  <li
                    key={capability}
                    className="rounded-full border border-ink/15 px-3 py-1 text-sm text-ink-muted"
                  >
                    {capability}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Link
                  href={`/services#${service.slug}`}
                  className="text-sm font-semibold text-ink underline decoration-topaz decoration-2 underline-offset-4"
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
