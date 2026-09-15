import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section className="bg-mist py-24 sm:py-32">
      <Container width="narrow">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Let&apos;s start with what you need.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
            <p>You don&apos;t need a perfect brief.</p>
            <p>You don&apos;t need to know exactly what technology to use.</p>
            <p>And you don&apos;t need to have every answer before reaching out.</p>
            <p>
              Tell us what you&apos;re working on, where you&apos;re stuck or what you&apos;re
              hoping to build.
            </p>
            <p className="font-medium text-ink">We&apos;ll start there.</p>
          </div>
          <LinkButton href="/start-a-project" className="mt-8">
            Start a Project
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}
