import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SignatureRays } from "@/components/graphics/SignatureRays";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pb-24 pt-16 sm:pb-32 sm:pt-24">
      <SignatureRays
        className="pointer-events-none absolute -right-16 -top-10 h-[360px] w-[360px] text-topaz/40 sm:h-[420px] sm:w-[420px]"
      />
      <Container className="relative">
        <Reveal>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Technology is easy to build. Building the right thing is harder.
          </h1>
        </Reveal>
        <Reveal className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-muted">
          <p>
            Kuvah helps businesses and founders create digital experiences, products and systems
            that are built around what they actually need.
          </p>
          <p>
            Whether you&apos;re trying to improve how your business shows up online, launch a new
            product or fix a process that isn&apos;t working, we help you figure out what to build
            and bring it to life.
          </p>
        </Reveal>
        <Reveal className="mt-10 flex flex-wrap gap-4">
          <LinkButton href="/start-a-project">Start a Project</LinkButton>
          <LinkButton href="/work" variant="secondary">
            View Our Work
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}
