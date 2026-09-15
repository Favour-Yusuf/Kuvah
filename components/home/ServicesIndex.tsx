import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/data/services";

const BAND_STYLES = {
  "digital-experiences": { bg: "bg-paper", text: "text-ink", muted: "text-ink-muted", watermark: "text-ink/5", underline: "hover:border-topaz focus-within:border-topaz" },
  "digital-products": { bg: "bg-mist", text: "text-ink", muted: "text-ink-muted", watermark: "text-ink/5", underline: "hover:border-topaz focus-within:border-topaz" },
  "systems-automation": { bg: "bg-sky-deep", text: "text-paper", muted: "text-paper/70", watermark: "text-paper/10", underline: "hover:border-paper focus-within:border-paper" },
} as const;

export function ServicesIndex() {
  return (
    <section className="bg-paper pt-20 sm:pt-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            What can we help you build?
          </h2>
          <p className="mt-4 text-lg text-ink-muted">We work across three areas.</p>
        </Reveal>
      </Container>

      <div className="mt-16">
        {services.map((service) => {
          const style = BAND_STYLES[service.slug];
          return (
            <Reveal key={service.slug} className={`relative overflow-hidden ${style.bg} py-16 sm:py-24`}>
              <span aria-hidden="true" className={`numeral-watermark pointer-events-none absolute -right-4 -top-6 select-none font-display font-bold ${style.watermark} sm:-right-8`}>
                {service.number}
              </span>
              <Container className="relative">
                <span className={`text-sm font-semibold ${style.muted}`}>{service.number}</span>
                <h3 className={`mt-3 font-display text-3xl font-semibold sm:text-5xl ${style.text}`}>
                  {service.name}
                </h3>
                <div className={`mt-6 max-w-xl space-y-3 text-base leading-relaxed sm:text-lg ${style.muted}`}>
                  {service.homeIntro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <p className={`mt-8 text-sm font-semibold ${style.muted}`}>What we do</p>
                <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
                  {service.homeCapabilities.map((capability) => (
                    <li key={capability}>
                      <span className={`inline-block border-b-2 border-transparent py-1 text-lg font-medium transition-colors ${style.text} ${style.underline}`}>
                        {capability}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services#${service.slug}`}
                  className={`mt-8 inline-block text-sm font-semibold underline decoration-2 underline-offset-4 ${style.text} ${service.slug === "systems-automation" ? "decoration-paper" : "decoration-topaz"}`}
                >
                  {service.homeCtaLabel}
                </Link>
              </Container>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
