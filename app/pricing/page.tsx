import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { pricingTiers } from "@/lib/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "What working with Kuvah can look like.",
};

export default function PricingPage() {
  return (
    <section className="bg-ink py-20 text-paper sm:py-28">
      <Container>
        <h1 className="font-display text-4xl font-semibold sm:text-6xl">
          What working with us can look like.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-paper/70">
          Every project is different, so pricing depends on scope. Here&apos;s a general sense of
          how engagements are structured.
        </p>
      </Container>

      <Container className="mt-16 grid gap-8 sm:grid-cols-3">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className="flex h-full flex-col border border-paper/15 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-topaz hover:shadow-[0_16px_40px_-12px_rgba(255,203,119,0.25)]"
          >
            <h2 className="font-display text-2xl font-semibold">{tier.name}</h2>
            <p className="mt-2 font-display text-3xl font-bold text-topaz">{tier.price}</p>
            <p className="mt-4 text-base leading-relaxed text-paper/70">{tier.description}</p>
            <ul className="mt-6 space-y-2 text-sm text-paper/70">
              {tier.features.map((feature, index) => (
                <li key={index} className="border-t border-paper/10 pt-2 first:border-t-0 first:pt-0">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <Container className="mt-16">
        <LinkButton href="/start-a-project" variant="invert">
          Start a Project
        </LinkButton>
      </Container>
    </section>
  );
}
