import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            What clients have said.
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-8 sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal as="li" key={index}>
              <figure className="h-full border border-ink/15 bg-paper p-8">
                <blockquote className="text-lg leading-relaxed text-ink">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm font-semibold text-ink-muted">
                  {testimonial.name} — {testimonial.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
