import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Insights",
  description: "Thinking from Kuvah on building useful technology. More to come soon.",
};

export default function InsightsPage() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container width="prose">
        <div className="border-l-4 border-topaz bg-paper p-8 sm:p-10">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-6xl">Insights</h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>
              This is where we&apos;ll share what we&apos;re learning about building useful
              technology, working with businesses and founders, and the questions worth asking
              before writing any code.
            </p>
            <p>We&apos;re still putting our first pieces together — check back soon.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
