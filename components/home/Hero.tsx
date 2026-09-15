import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SignatureRays } from "@/components/graphics/SignatureRays";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pb-24 pt-20 sm:pb-40 sm:pt-28">
      <Reveal className="delay-0">
        <SignatureRays
          className="pointer-events-none absolute -right-24 top-8 h-[380px] w-[380px] text-topaz sm:-right-16 sm:top-4 sm:h-[560px] sm:w-[560px] lg:h-[640px] lg:w-[640px]"
        />
      </Reveal>
      <Container className="relative">
        <Reveal className="delay-150">
          <h1 className="max-w-4xl font-display text-[clamp(2.75rem,9vw,7.5rem)] font-bold leading-[0.98] tracking-tight text-ink">
            Technology is{" "}
            <br />
            easy to build.{" "}
            <br />
            <span className="relative inline-block">
              Building the{" "}
              <br />
              right thing is{" "}
              <br />
              harder.
            </span>
          </h1>
        </Reveal>
        <Reveal className="relative z-10 mt-10 max-w-xl space-y-4 text-lg leading-relaxed text-ink-muted delay-300 sm:mt-14">
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
        <Reveal className="relative z-10 mt-10 flex flex-wrap gap-4 delay-450">
          <LinkButton href="/start-a-project">Start a Project</LinkButton>
          <LinkButton href="/work" variant="secondary">
            View Our Work
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}
