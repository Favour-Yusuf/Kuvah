import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SignatureRays } from "@/components/graphics/SignatureRays";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-16 sm:pb-28 sm:pt-24">
      <Reveal className="delay-0">
        <div className="pointer-events-none absolute -right-24 top-0 h-[300px] w-[300px] sm:-right-16 sm:h-[440px] sm:w-[440px] lg:h-[520px] lg:w-[520px]">
          <div className="animate-pulse-glow absolute inset-0 rounded-full bg-topaz/30 blur-3xl" />
          <SignatureRays className="animate-spin-slow relative h-full w-full text-topaz/60" />
        </div>
      </Reveal>
      <Container className="relative">
        <Reveal className="delay-150">
          <h1 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.15] tracking-tight text-paper">
            Technology is easy to build.{" "}
            <span className="relative inline">
              Building the right thing is <span className="text-topaz">harder.</span>
            </span>
          </h1>
        </Reveal>
        <Reveal className="relative z-10 mt-8 max-w-xl delay-300 sm:mt-10">
          <p className="text-lg leading-relaxed text-paper/70">
            We help businesses and founders build digital experiences, products and systems
            around what they actually need.
          </p>
        </Reveal>
        <Reveal className="relative z-10 mt-10 flex flex-wrap gap-4 delay-450">
          <LinkButton href="/start-a-project" variant="invert">
            Start a Project
          </LinkButton>
          <LinkButton href="/work" variant="secondary-inverse">
            View Our Work
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}
