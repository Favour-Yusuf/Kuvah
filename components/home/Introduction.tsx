import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Introduction() {
  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start lg:gap-16">
          <Reveal>
            <div className="bg-topaz p-8 sm:p-10">
              <p className="font-display text-3xl font-bold leading-[1.05] text-ink sm:text-4xl">
                It&apos;s about whether it solves the right problem.
              </p>
            </div>
          </Reveal>
          <Reveal className="lg:pt-4">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Before we build, we listen.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
              <p>Every project starts somewhere different.</p>
              <p>
                Sometimes a business knows exactly what it needs but doesn&apos;t have the right
                team to build it. Sometimes a founder has an idea but needs help deciding where to
                start. Sometimes a business is doing too much manually and knows there has to be a
                better way.
              </p>
              <p>That&apos;s where we come in.</p>
              <p>
                We take the time to understand what you&apos;re trying to achieve, where the
                problem is and what would actually make a difference before we start building.
              </p>
              <p>Because a good solution isn&apos;t just about what it can do.</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
