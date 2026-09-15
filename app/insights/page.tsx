import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Insights",
  description: "Thinking from Kuvah on building useful technology. More to come soon.",
};

export default function InsightsPage() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container width="prose">
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">Insights</h1>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
          <p>
            This is where we&apos;ll share what we&apos;re learning about building useful
            technology, working with businesses and founders, and the questions worth asking
            before writing any code.
          </p>
          <p>We&apos;re still putting our first pieces together — check back soon.</p>
        </div>
      </Container>
    </section>
  );
}
