import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function AboutTeaser() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-2/5 bg-topaz-deep [clip-path:polygon(40%_0,100%_0,100%_100%,0_100%)] sm:h-72 lg:h-96" />
      <Container width="narrow" className="relative">
        <Reveal>
          <h2 className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl">
            We didn&apos;t start Kuvah because the world needed another technology company.
          </h2>
          <div className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-paper/70">
            <p>Technology is everywhere.</p>
            <p>But useful technology is still difficult to build.</p>
            <p>
              It takes more than knowing how to write code. It requires understanding people,
              asking better questions and caring about what happens after something goes live.
            </p>
            <p>That&apos;s what we&apos;re building Kuvah around.</p>
            <p>A company that takes the work seriously.</p>
            <p>A company that stays curious.</p>
            <p>A company that understands before assuming.</p>
            <p>
              And a company that believes the things we build should leave people and businesses
              better than we found them.
            </p>
          </div>
          <LinkButton href="/about" variant="secondary-inverse" className="mt-8">
            More About Kuvah
          </LinkButton>
        </Reveal>
      </Container>
    </section>
  );
}
