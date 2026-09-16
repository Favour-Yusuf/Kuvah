import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";

export function FinalCTA() {
  return (
    <>
      <SectionDivider from="bg-ink" to="bg-topaz" flip />
      <section className="bg-topaz py-28 sm:py-40">
        <Container width="narrow">
          <Reveal className="border-l-4 border-ink pl-8">
            <h2 className="font-display text-4xl font-bold leading-[1.02] text-ink sm:text-7xl">
              Let&apos;s start with what you need.
            </h2>
            <div className="mt-8 max-w-xl space-y-4 text-lg leading-relaxed text-ink/80">
              <p>
                You don&apos;t need a perfect brief, or every answer, before reaching out. Tell us
                what you&apos;re working on, where you&apos;re stuck or what you&apos;re hoping to
                build.
              </p>
              <p className="text-xl font-medium text-ink">We&apos;ll start there.</p>
            </div>
            <LinkButton href="/start-a-project" variant="invert" className="mt-10">
              Start a Project
            </LinkButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
